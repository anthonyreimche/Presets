// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { buildPartialBag, buildPartialParams } from "./preset-helpers";
import { React, api } from "./rt";
import type { DevelopParams, ParamBag } from "./safelight";
import { cls } from "./styles";

export interface PresetSaveResult {
  name: string;
  group: string;
  params: Partial<DevelopParams>;
  paramBag: ParamBag;
}

export interface PresetSaveDialogProps {
  /** Live params the preset is captured from. */
  params: DevelopParams;
  /** Live extension-stage params, offered as savable fields alongside the core
   *  adjustments. */
  paramBag: ParamBag;
  /** Existing group names, offered as autocomplete. */
  groups: string[];
  initialName?: string;
  initialGroup?: string;
  /** Label for the confirm button (defaults to "Save preset"). */
  saveLabel?: string;
  onSave: (result: PresetSaveResult) => void;
  onCancel: () => void;
}

/** Save Preset dialog: name + group + a checklist of which adjustments to keep,
 *  so a preset can carry as little as a single slider. Changed global
 *  adjustments are pre-checked; per-image edits (crop, retouch, spatial
 *  extension tools) are offered only under "Show all". Modeled on the app's
 *  modal pattern. */
export function PresetSaveDialog({
  params,
  paramBag,
  groups,
  initialName,
  initialGroup,
  saveLabel = "Save preset",
  onSave,
  onCancel,
}: PresetSaveDialogProps) {
  const fields = React.useMemo(() => api.presets.fields(params, paramBag), [params, paramBag]);
  const [name, setName] = React.useState(initialName ?? "");
  const [group, setGroup] = React.useState(initialGroup ?? "");
  const [showAll, setShowAll] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(fields.filter((f) => f.scope !== "per-image" && f.changed).map((f) => f.id)),
  );
  const nameRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => nameRef.current?.focus(), []);

  // By default only changed global adjustments show; per-image edits appear
  // (unchecked) under "Show all".
  const visible = showAll ? fields : fields.filter((f) => f.scope !== "per-image" && f.changed);
  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const canSave = name.trim().length > 0 && selected.size > 0;
  const submit = () => {
    if (!canSave) return;
    onSave({
      name: name.trim(),
      group: group.trim(),
      params: buildPartialParams(params, fields, selected),
      paramBag: buildPartialBag(paramBag, fields, selected),
    });
  };

  return (
    <div
      className={cls.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={`${cls.card} ${cls.cardSave}`}>
        <div className={`${cls.fields} ${cls.fieldsDivided}`}>
          <input
            ref={nameRef}
            type="text"
            value={name}
            placeholder="Preset name"
            aria-label="Preset name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className={cls.input}
          />
          <input
            type="text"
            value={group}
            placeholder="Group (optional)"
            aria-label="Preset group (optional)"
            list="preset-groups"
            onChange={(e) => setGroup(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className={cls.input}
          />
          <datalist id="preset-groups">
            {groups.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
        </div>

        <div className={cls.include}>
          <span>Include</span>
          <label className={cls.showAll}>
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
            Show all
          </label>
        </div>

        <div className={cls.fieldList}>
          {visible.length === 0 ? (
            <div className={cls.fieldEmpty}>
              No adjustments on this photo. Enable “Show all” to save defaults.
            </div>
          ) : (
            visible.map((f) => (
              <label key={f.id} className={cls.field}>
                <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)} />
                <span className={cls.fieldLabel}>{f.label}</span>
                {f.extension && f.scope === "per-image" && <span className={cls.fieldTag}>per-image</span>}
                {f.value && <span className={cls.fieldValue}>{f.value}</span>}
              </label>
            ))
          )}
        </div>

        <div className={`${cls.actions} ${cls.actionsBar}`}>
          <button className={`${cls.button} ${cls.secondary}`} onClick={onCancel}>
            Cancel
          </button>
          <button disabled={!canSave} className={`${cls.button} ${cls.primary}`} onClick={submit}>
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
