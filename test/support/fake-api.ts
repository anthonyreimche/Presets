// A stand-in Safelight API over real React, React DOM and zustand. The develop
// and presets stores behave as core's do (previews and applied presets keep the
// open photo's process version, preset edits keep id and position), the preset
// services mirror core's preset-io and preset-summary closely enough for the
// panel's outcomes, and every call the panel makes into the host is recorded.

import * as React from "react";
import { createPortal } from "react-dom";
import { create } from "zustand";
import type {
  CatalogStoreState,
  ContextMenuProps,
  DevelopParams,
  DevelopStoreState,
  ParamBag,
  PanelContribution,
  PanelProps,
  Preset,
  PresetDiff,
  PresetField,
  PresetImportOutcome,
  PresetImporter,
  PresetsStoreState,
  SafelightAPI,
  SettingsState,
  StoreApi,
  StylesheetContribution,
  UiTokens,
} from "../../src/safelight";

export const TOKENS: UiTokens = {
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  surface4: "var(--color-surface-4)",
  border: "var(--color-border)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
  accent: "var(--color-accent)",
  sliderFill: "var(--color-slider-fill)",
  labelRed: "var(--color-label-red)",
  white: "var(--color-white)",
};

export const LEGACY_PROCESS_VERSION = 1;
export const CURRENT_PROCESS_VERSION = 2;

/** The core adjustments the fake knows, at their defaults. An edit without a
 *  process version reads as the legacy one, as core's normalizeParams does. */
export const DEFAULT_PARAMS: DevelopParams = {
  exposure: 0,
  contrast: 0,
  clarity: 0,
  displayTransform: null,
  processVersion: LEGACY_PROCESS_VERSION,
};

export function normalizeParams(p: Partial<DevelopParams> | undefined): DevelopParams {
  return { ...DEFAULT_PARAMS, ...p };
}

const SCALARS = ["exposure", "contrast", "clarity"] as const;

/** Core's summarizePreset, cut down: one line per scalar off its default. */
function summarize(params: Partial<DevelopParams>): PresetDiff[] {
  return SCALARS.flatMap((key) => {
    const value = params[key];
    return typeof value === "number" && value !== DEFAULT_PARAMS[key] ? [{ label: key, value: String(value) }] : [];
  });
}

/** One savable field per scalar, as core's presetFields lists them. */
export function scalarFields(params: DevelopParams): PresetField[] {
  return SCALARS.map((key) => ({
    id: key,
    label: key,
    keys: [key],
    changed: params[key] !== DEFAULT_PARAMS[key],
    value: String(params[key]),
  }));
}

/** A bag key's stage is everything before its last dot. */
const stageOf = (key: string) => key.slice(0, key.lastIndexOf("."));

/** Core's describePresetBag: the stages a bag carries, named by stage id. */
function describeBag(bag: ParamBag | undefined): string[] {
  return [...new Set(Object.keys(bag ?? {}).map(stageOf))];
}

type ImporterParse = (file: File) => Promise<{ name: string; params: Partial<DevelopParams> } | null>;

const FOREIGN_PRESET_EXTENSIONS = [".xmp", ".lrtemplate"];

export interface ExportCall {
  name: string;
  params: Partial<DevelopParams>;
  group?: string;
  paramBag?: ParamBag;
}

export interface Rig {
  api: SafelightAPI;
  develop: StoreApi<DevelopStoreState & { previewParamBag: ParamBag | null }>;
  presets: StoreApi<PresetsStoreState>;
  catalog: StoreApi<CatalogStoreState>;
  settings: StoreApi<SettingsState>;
  panels: PanelContribution[];
  stylesheets: StylesheetContribution[];
  /** The props core's Panel was rendered with, latest last. */
  panelProps: Omit<PanelProps, "children">[];
  /** Every applyPreset call, with the params exactly as the panel passed them. */
  applied: { params: DevelopParams; paramBag?: ParamBag }[];
  /** Every setPreviewParams call, as passed. */
  previews: { params: Partial<DevelopParams> | null; paramBag?: ParamBag | null }[];
  exports: ExportCall[];
  /** The `accept` string of every file picker the panel opened. */
  pickerAccepts: string[];
  /** Store categories the Extensions window was opened on. */
  storeOpened: (string | undefined)[];
  /** The file the next picker returns (null: the person cancels). */
  choose(file: File | null): void;
  installImporter(id: string, extensions: string[], parse: ImporterParse): void;
}

export interface RigOptions {
  /** What the Save dialog lists; defaults to one field per scalar. */
  fields?: (params: DevelopParams, paramBag: ParamBag) => PresetField[];
}

export function fakeApi({ fields = scalarFields }: RigOptions = {}): Rig {
  const panels: PanelContribution[] = [];
  const stylesheets: StylesheetContribution[] = [];
  const panelProps: Omit<PanelProps, "children">[] = [];
  const applied: Rig["applied"] = [];
  const previews: Rig["previews"] = [];
  const exports: ExportCall[] = [];
  const pickerAccepts: string[] = [];
  const storeOpened: (string | undefined)[] = [];
  const parsers = new Map<string, ImporterParse>();
  let nextFile: File | null = null;
  let nextId = 1;

  const develop = create<DevelopStoreState & { previewParamBag: ParamBag | null }>()((set) => ({
    photoId: "photo-1",
    params: normalizeParams({ processVersion: CURRENT_PROCESS_VERSION }),
    paramBag: {},
    previewParams: null,
    previewParamBag: null,
    applyPreset: async (params, paramBag) => {
      applied.push({ params, paramBag });
      set((s) => ({
        previewParams: null,
        previewParamBag: null,
        params: normalizeParams({ ...params, processVersion: s.params.processVersion }),
        paramBag: paramBag ? { ...s.paramBag, ...paramBag } : s.paramBag,
      }));
    },
    setPreviewParams: (params, paramBag) => {
      previews.push({ params, paramBag });
      set((s) => ({
        previewParams: params ? normalizeParams({ ...params, processVersion: s.params.processVersion }) : null,
        previewParamBag: params && paramBag ? { ...s.paramBag, ...paramBag } : null,
      }));
    },
  }));

  const groupOf = (group?: string) => group?.trim() || undefined;
  const withBag = (bag?: ParamBag) => (bag && Object.keys(bag).length > 0 ? { paramBag: structuredClone(bag) } : {});
  const presets = create<PresetsStoreState>()((set) => ({
    presets: [],
    add: (name, params, group, paramBag) =>
      set((s) => ({
        presets: [
          ...s.presets,
          { id: `preset-${nextId++}`, name, group: groupOf(group), params: structuredClone(params), ...withBag(paramBag) },
        ],
      })),
    update: (id, params, group, paramBag) =>
      set((s) => ({
        presets: s.presets.map((p): Preset =>
          p.id === id
            ? { id: p.id, name: p.name, group: groupOf(group), params: structuredClone(params), ...withBag(paramBag) }
            : p,
        ),
      })),
    rename: (id, name) =>
      set((s) =>
        name.trim() ? { presets: s.presets.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)) } : {},
      ),
    setGroup: (id, group) =>
      set((s) => ({ presets: s.presets.map((p) => (p.id === id ? { ...p, group: groupOf(group) } : p)) })),
    remove: (id) => set((s) => ({ presets: s.presets.filter((p) => p.id !== id) })),
  }));

  const catalog = create<CatalogStoreState>()(() => ({
    photos: [{ id: "photo-1", filename: "DSCF0042.RAF" }],
  }));
  const settings = create<SettingsState>()(() => ({ uiScale: 1 }));
  const importers = create<{ list: PresetImporter[] }>()(() => ({ list: [] }));

  async function importFile(file: File, list: readonly PresetImporter[]): Promise<PresetImportOutcome> {
    const lower = file.name.toLowerCase();
    if (lower.endsWith(".json")) {
      try {
        const parsed: { format?: unknown; name?: string; params?: Partial<DevelopParams> } = JSON.parse(await file.text());
        if (parsed.format === "safelight-preset" && parsed.name && parsed.params) {
          return { status: "imported", preset: { name: parsed.name, params: parsed.params } };
        }
      } catch {
        return { status: "unreadable" };
      }
    }
    const importer = list.find((i) => i.extensions.some((e) => lower.endsWith(e)));
    if (!importer) {
      const extension = lower.match(/\.[^.]+$/)?.[0] ?? "";
      return extension === ".json" ? { status: "unreadable" } : { status: "no-importer", extension };
    }
    let result: Awaited<ReturnType<ImporterParse>> | undefined;
    try {
      result = await parsers.get(importer.id)?.(file);
    } catch (e) {
      return { status: "failed", reason: e instanceof Error ? e.message : String(e) };
    }
    if (!result || Object.keys(result.params).length === 0) return { status: "no-settings" };
    return { status: "imported", preset: { name: result.name, params: result.params } };
  }

  function FakePanel({ children, ...props }: PanelProps) {
    panelProps.push(props);
    return React.createElement("section", { "aria-label": props.title }, children);
  }

  function FakeContextMenu({ x, y, items, onClose }: ContextMenuProps) {
    return React.createElement(
      "div",
      { role: "menu", "data-x": x, "data-y": y },
      items.map((item, i) =>
        item === "separator"
          ? React.createElement("div", { key: i, role: "separator" })
          : React.createElement(
              "button",
              {
                key: item.label,
                role: "menuitem",
                "data-danger": item.danger ? "" : undefined,
                onClick: () => {
                  item.onClick();
                  onClose();
                },
              },
              item.label,
            ),
      ),
    );
  }

  const api: SafelightAPI = {
    version: 1,
    extensionId: "safelight.presets",
    react: React,
    registerPanel: (c) => void panels.push(c),
    registerStylesheet: (c) => void stylesheets.push(c),
    ui: { tokens: TOKENS },
    components: { Panel: FakePanel, ContextMenu: FakeContextMenu },
    reactDom: { createPortal },
    stores: { useDevelopStore: develop, useCatalogStore: catalog, useSettings: settings, usePresetsStore: presets },
    develop: { normalizeParams },
    presets: {
      useImporters: () => importers((s) => s.list),
      describeBag,
      summarize,
      fields,
      exportFile: (name, params, group, paramBag) => void exports.push({ name, params, group, paramBag }),
      importFile,
      pickFile: async (accept) => {
        pickerAccepts.push(accept);
        const file = nextFile;
        nextFile = null;
        return file;
      },
      pickerAccept: (list) => [...new Set([".json", ...FOREIGN_PRESET_EXTENSIONS, ...list.flatMap((i) => i.extensions)])].join(","),
    },
    extensions: { openStore: (category) => void storeOpened.push(category) },
  };

  return {
    api,
    develop,
    presets,
    catalog,
    settings,
    panels,
    stylesheets,
    panelProps,
    applied,
    previews,
    exports,
    pickerAccepts,
    storeOpened,
    choose: (file) => {
      nextFile = file;
    },
    installImporter: (id, extensions, parse) => {
      parsers.set(id, parse);
      importers.setState((s) => ({
        list: [...s.list, { id, label: id, extensions, extensionId: "test.importer" }],
      }));
    },
  };
}
