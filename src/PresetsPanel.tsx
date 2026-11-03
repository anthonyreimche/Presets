// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { PresetDeleteDialog } from "./PresetDeleteDialog";
import { PresetMoveDialog } from "./PresetMoveDialog";
import { PresetOverwriteDialog } from "./PresetOverwriteDialog";
import { PresetRenameDialog } from "./PresetRenameDialog";
import { PresetSaveDialog, type PresetSaveDialogProps } from "./PresetSaveDialog";
import { PresetTooltip } from "./PresetTooltip";
import { nextAvailableName, withoutProcessVersion } from "./preset-helpers";
import { React, api } from "./rt";
import type { DevelopParams, ParamBag, Preset, PresetImportOutcome } from "./safelight";
import { cls } from "./styles";

interface PendingSave {
  name: string;
  group: string;
  params: Partial<DevelopParams>;
  paramBag?: ParamBag;
}

interface ImportNotice {
  text: string;
  /** Offer the Extensions store, where an importer for this file can be found. */
  offerStore: boolean;
}

function importNoticeFor(
  outcome: Exclude<PresetImportOutcome, { status: "imported" }>,
  fileName: string,
): ImportNotice {
  switch (outcome.status) {
    case "no-importer":
      return {
        text: outcome.extension
          ? `No installed extension can import ${outcome.extension} presets.`
          : `No installed extension can import “${fileName}”.`,
        offerStore: true,
      };
    case "no-settings":
      return {
        text: `Couldn't find any develop settings in “${fileName}”.`,
        offerStore: false,
      };
    case "failed":
      return {
        text: `Couldn't read “${fileName}”: ${outcome.reason}`,
        offerStore: false,
      };
    case "unreadable":
      return {
        text: `“${fileName}” isn't a Safelight preset this version can read.`,
        offerStore: false,
      };
  }
}

// The Save and Update dialogs capture the live edit. Only this wrapper subscribes
// to it, and it is mounted only while a dialog is open.
function LivePresetSaveDialog(props: Omit<PresetSaveDialogProps, "params" | "paramBag">) {
  const params = api.stores.useDevelopStore((s) => s.params);
  const paramBag = api.stores.useDevelopStore((s) => s.paramBag);
  return <PresetSaveDialog {...props} params={params} paramBag={paramBag} />;
}

export function PresetsPanel() {
  const { Panel, ContextMenu } = api.components;
  const { useDevelopStore, useCatalogStore, usePresetsStore } = api.stores;
  const [hovered, setHovered] = React.useState<{ id: string; anchor: HTMLElement } | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [updating, setUpdating] = React.useState<Preset | null>(null);
  const [renaming, setRenaming] = React.useState<Preset | null>(null);
  const [moving, setMoving] = React.useState<Preset | null>(null);
  const [menu, setMenu] = React.useState<{ preset: Preset; x: number; y: number } | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<Preset | null>(null);
  const [collision, setCollision] = React.useState<{ existingId: string; pending: PendingSave } | null>(null);
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
  const [importNotice, setImportNotice] = React.useState<ImportNotice | null>(null);
  const photoId = useDevelopStore((s) => s.photoId);
  const photoName = useCatalogStore((s) => s.photos.find((p) => p.id === photoId)?.filename);
  const applyPreset = useDevelopStore((s) => s.applyPreset);
  const setPreviewParams = useDevelopStore((s) => s.setPreviewParams);
  const presets = usePresetsStore((s) => s.presets);
  const addPreset = usePresetsStore((s) => s.add);
  const updatePreset = usePresetsStore((s) => s.update);
  const renamePreset = usePresetsStore((s) => s.rename);
  const setPresetGroup = usePresetsStore((s) => s.setGroup);
  const removePreset = usePresetsStore((s) => s.remove);
  const importers = api.presets.useImporters();

  // Safety net: clear any lingering preview if the panel unmounts mid-hover.
  React.useEffect(() => () => setPreviewParams(null), [setPreviewParams]);

  // A preset carries only some adjustments; applying merges them over the
  // photo's current params (partial presets), so unselected settings are kept.
  // The live edit is read when a handler runs: the panel doesn't subscribe to
  // it, or every slider tick would re-render every preset row.
  const effective = (partial: Partial<DevelopParams>): DevelopParams =>
    api.develop.normalizeParams({
      ...useDevelopStore.getState().params,
      ...withoutProcessVersion(partial),
    });

  // The toolbar Export writes the live edit; name it after the open photo (sans
  // extension) so exports aren't all one collided file. No photo → generic name.
  const liveExportName = photoName?.replace(/\.[^.]+$/, "") || "preset";
  const exportLive = () => {
    const { params, paramBag } = useDevelopStore.getState();
    api.presets.exportFile(liveExportName, params, undefined, paramBag);
  };

  const groups = React.useMemo(() => {
    const names = new Set<string>();
    for (const p of presets) if (p.group) names.add(p.group);
    return [...names];
  }, [presets]);

  // Ungrouped first, then each named group (insertion order), each keeping the
  // presets' stored order.
  const sections = React.useMemo(() => {
    const ungrouped = presets.filter((p) => !p.group);
    const named = groups.map((g) => ({ group: g, items: presets.filter((p) => p.group === g) }));
    return { ungrouped, named };
  }, [presets, groups]);

  // Always clear any hover preview before removing, so the viewport doesn't
  // keep showing a deleted preset's preview (the row unmounts, so its
  // onMouseLeave never fires).
  const deletePreset = (id: string) => {
    setPreviewParams(null);
    removePreset(id);
  };

  const commitSave = (pending: PendingSave) => {
    const existing = presets.find((p) => p.name.toLowerCase() === pending.name.toLowerCase());
    if (existing) {
      setCollision({ existingId: existing.id, pending });
      return;
    }
    addPreset(pending.name, pending.params, pending.group, pending.paramBag);
  };

  const handleImport = async () => {
    const file = await api.presets.pickFile(api.presets.pickerAccept(importers));
    if (!file) return;
    setImportNotice(null);

    const outcome = await api.presets.importFile(file, importers);
    if (outcome.status !== "imported") {
      setImportNotice(importNoticeFor(outcome, file.name));
      return;
    }
    // Route through commitSave so a name clash offers Overwrite / Save-as-new.
    const { preset } = outcome;
    commitSave({
      name: preset.name,
      group: preset.group ?? "",
      params: preset.params,
      paramBag: preset.paramBag,
    });
    void applyPreset(effective(preset.params), preset.paramBag);
  };

  const browseImporters = () => {
    setImportNotice(null);
    api.extensions.openStore("preset");
  };

  const renderPreset = (preset: Preset) => (
    <div
      key={preset.id}
      className={cls.row}
      onMouseEnter={(e) => {
        setHovered({ id: preset.id, anchor: e.currentTarget });
        setPreviewParams(effective(preset.params), preset.paramBag);
      }}
      onMouseLeave={() => {
        setHovered((h) => (h?.id === preset.id ? null : h));
        setPreviewParams(null);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        // Drop the hover preview so the menu isn't shown over a previewed look.
        setPreviewParams(null);
        setHovered(null);
        setMenu({ preset, x: e.clientX, y: e.clientY });
      }}
    >
      <button
        onClick={() => {
          setPreviewParams(null);
          void applyPreset(effective(preset.params), preset.paramBag);
        }}
        className={cls.apply}
      >
        {preset.name}
      </button>
      <button onClick={() => setConfirmDelete(preset)} className={cls.delete} title="Delete preset">
        ✕
      </button>
      {hovered?.id === preset.id && (
        <PresetTooltip
          name={preset.name}
          diffs={[
            ...api.presets.summarize(preset.params),
            ...api.presets.describeBag(preset.paramBag).map((label) => ({ label, value: "adjusted" })),
          ]}
          anchor={hovered.anchor}
        />
      )}
    </div>
  );

  return (
    <Panel title="Presets" defaultOpen={false}>
      <div className={cls.toolbar}>
        <button onClick={() => setSaving(true)} className={cls.save}>
          Save preset…
        </button>
        <button onClick={handleImport} className={cls.tool}>
          Import
        </button>
        <button onClick={exportLive} className={cls.tool}>
          Export
        </button>
      </div>

      {/* Kept mounted so the live region announces the first notice too. */}
      <div role="status" aria-live="polite">
        {importNotice && (
          <div className={cls.notice}>
            <div className={cls.noticeBody}>
              <p>{importNotice.text}</p>
              {importNotice.offerStore && (
                <button onClick={browseImporters} className={cls.noticeLink}>
                  Browse importers
                </button>
              )}
            </div>
            <button
              onClick={() => setImportNotice(null)}
              title="Dismiss"
              aria-label="Dismiss"
              className={cls.dismiss}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {presets.length === 0 ? (
        <p className={cls.empty}>No saved presets</p>
      ) : (
        <div className={cls.sections}>
          {sections.ungrouped.length > 0 && <div className={cls.rows}>{sections.ungrouped.map(renderPreset)}</div>}
          {sections.named.map(({ group, items }) => {
            const isCollapsed = collapsed.has(group);
            return (
              <div key={group}>
                <button
                  onClick={() =>
                    setCollapsed((s) => {
                      const next = new Set(s);
                      if (next.has(group)) next.delete(group);
                      else next.add(group);
                      return next;
                    })
                  }
                  className={cls.groupHeader}
                >
                  <span className={cls.caret}>{isCollapsed ? "▸" : "▾"}</span>
                  <span className={cls.groupName}>{group}</span>
                  <span className={cls.count}>{items.length}</span>
                </button>
                {!isCollapsed && <div className={cls.rows}>{items.map(renderPreset)}</div>}
              </div>
            );
          })}
        </div>
      )}

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          items={[
            { label: "Rename…", onClick: () => setRenaming(menu.preset) },
            { label: "Move to group…", onClick: () => setMoving(menu.preset) },
            { label: "Update with current settings", onClick: () => setUpdating(menu.preset) },
            {
              label: "Export…",
              onClick: () =>
                api.presets.exportFile(menu.preset.name, menu.preset.params, menu.preset.group, menu.preset.paramBag),
            },
            "separator",
            { label: "Delete", danger: true, onClick: () => setConfirmDelete(menu.preset) },
          ]}
          onClose={() => setMenu(null)}
        />
      )}

      {saving && (
        <LivePresetSaveDialog
          groups={groups}
          onSave={(result) => {
            setSaving(false);
            // result already carries the selected extension-stage params.
            commitSave(result);
          }}
          onCancel={() => setSaving(false)}
        />
      )}

      {/* "Update with current settings": same dialog as Save, but preloaded with
          the preset's name/group as a confirmation, writing back to the same
          preset id (with the current live params). */}
      {updating && (
        <LivePresetSaveDialog
          groups={groups}
          initialName={updating.name}
          initialGroup={updating.group}
          saveLabel="Update preset"
          onSave={(result) => {
            updatePreset(updating.id, result.params, result.group, result.paramBag);
            // A rename in this dialog is honoured only when it doesn't collide
            // with a different preset; renamePreset trims and ignores empties.
            const collides = presets.some(
              (p) => p.id !== updating.id && p.name.toLowerCase() === result.name.toLowerCase(),
            );
            if (!collides) renamePreset(updating.id, result.name);
            setUpdating(null);
          }}
          onCancel={() => setUpdating(null)}
        />
      )}

      {renaming && (
        <PresetRenameDialog
          initialName={renaming.name}
          validate={(name) =>
            presets.some((p) => p.id !== renaming.id && p.name.toLowerCase() === name.toLowerCase())
              ? "A preset with this name already exists."
              : null
          }
          onRename={(name) => {
            renamePreset(renaming.id, name);
            setRenaming(null);
          }}
          onCancel={() => setRenaming(null)}
        />
      )}

      {moving && (
        <PresetMoveDialog
          initialGroup={moving.group}
          groups={groups}
          onMove={(group) => {
            setPresetGroup(moving.id, group);
            setMoving(null);
          }}
          onCancel={() => setMoving(null)}
        />
      )}

      {confirmDelete && (
        <PresetDeleteDialog
          name={confirmDelete.name}
          onDelete={() => {
            deletePreset(confirmDelete.id);
            setConfirmDelete(null);
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {collision && (
        <PresetOverwriteDialog
          name={collision.pending.name}
          onOverwrite={() => {
            updatePreset(
              collision.existingId,
              collision.pending.params,
              collision.pending.group,
              collision.pending.paramBag,
            );
            setCollision(null);
          }}
          onSaveAsNew={() => {
            addPreset(
              nextAvailableName(presets, collision.pending.name),
              collision.pending.params,
              collision.pending.group,
              collision.pending.paramBag,
            );
            setCollision(null);
          }}
          onCancel={() => setCollision(null)}
        />
      )}
    </Panel>
  );
}
