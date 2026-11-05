// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

// The slice of Safelight's extension API this extension touches, mirrored from
// the app's src/extensions/types.ts, src/extensions/ui-kit.tsx,
// src/state/develop-store.ts, src/state/presets-store.ts,
// src/modules/develop/preset-io.ts and preset-summary.ts. Extensions are
// standalone bundles, so the host's source is not on the type path; React
// types come from @types/react (dev only).

import type { ComponentType, ReactNode, ReactPortal } from "react";

export interface StoreApi<T> {
  (): T;
  <U>(selector: (state: T) => U): U;
  getState(): T;
  setState(partial: Partial<T> | ((s: T) => Partial<T>)): void;
  subscribe(listener: (state: T, prev: T) => void): () => void;
}

/** Core's develop params. This extension reads only the two keys named here;
 *  every other adjustment passes through it untouched. */
export interface DevelopParams {
  /** The processing the edit renders with. A preset never carries one:
   *  applying it keeps the photo's. */
  processVersion: number;
  /** The picked display transform's id, null for the default. */
  displayTransform: string | null;
  readonly [key: string]: unknown;
}

export type ParamBag = Record<string, unknown>;

export interface DevelopStoreState {
  /** The open photo's catalogue id, null with none open. */
  photoId: string | null;
  params: DevelopParams;
  /** Extension-stage params, keyed by qualified key. */
  paramBag: ParamBag;
  /** Render-only params the canvas shows instead of `params`. */
  previewParams: DevelopParams | null;
  /** Replace the live edit with full params merged with a bag, as one undoable
   *  edit. The photo keeps its own process version. */
  applyPreset(params: DevelopParams, paramBag?: ParamBag): Promise<void>;
  /** Set (or clear with null) the render-only preview. */
  setPreviewParams(params: Partial<DevelopParams> | null, paramBag?: ParamBag | null): void;
}

export interface CatalogPhoto {
  id: string;
  filename: string;
}

export interface CatalogStoreState {
  photos: readonly CatalogPhoto[];
}

export interface SettingsState {
  /** Preferences ▸ Interface scale, the <body> zoom (1 = 100%). */
  uiScale: number;
}

export interface Preset {
  id: string;
  name: string;
  /** Presets without a group render ungrouped. */
  group?: string;
  /** Only the adjustments this preset carries. */
  params: Partial<DevelopParams>;
  paramBag?: ParamBag;
}

export interface PresetsStoreState {
  presets: Preset[];
  add(name: string, params: Partial<DevelopParams>, group?: string, paramBag?: ParamBag): void;
  /** Replace a preset's params and group in place (keeps id, name, position). */
  update(id: string, params: Partial<DevelopParams>, group?: string, paramBag?: ParamBag): void;
  /** Trims, and ignores an empty name. */
  rename(id: string, name: string): void;
  /** Empty or undefined moves the preset to the ungrouped section. */
  setGroup(id: string, group?: string): void;
  remove(id: string): void;
}

export interface PresetImporter {
  id: string;
  label: string;
  /** Lowercase with leading dot, e.g. ".xmp". */
  extensions: string[];
  extensionId: string;
}

export interface ImportedPreset {
  name: string;
  group?: string;
  params: Partial<DevelopParams>;
  paramBag?: ParamBag;
}

export type PresetImportOutcome =
  | { status: "imported"; preset: ImportedPreset }
  /** No installed importer claims this file type. */
  | { status: "no-importer"; extension: string }
  /** An importer claimed the file but found no develop settings in it. */
  | { status: "no-settings" }
  /** An importer claimed the file but threw or ran out of time reading it. */
  | { status: "failed"; reason: string }
  /** A .json file that isn't a Safelight preset this build can read. */
  | { status: "unreadable" };

/** One line of a preset's tooltip. */
export interface PresetDiff {
  label: string;
  value: string;
}

/** One adjustment the Save dialogue offers. */
export interface PresetField {
  id: string;
  label: string;
  /** DevelopParams keys copied when checked. */
  keys: string[];
  changed: boolean;
  /** Short current value, shown beside scalar fields. */
  value?: string;
  /** Qualified paramBag keys copied when checked. */
  bagKeys?: string[];
  /** Copied in place of a `bagKeys` key the bag holds no value for. */
  bagDefaults?: ParamBag;
  /** "per-image" fields show only under "Show all" and are never pre-checked. */
  scope?: "global" | "per-image";
  /** Set on extension-contributed stage fields. */
  extension?: boolean;
}

export interface PanelDockDefault {
  module: "library" | "develop";
  direction: "left" | "right" | "bottom";
  order?: number;
  width?: number;
  height?: number;
}

export interface PanelContribution {
  /** Globally unique, e.g. "core.histogram" or "my-ext.fancy-curves". */
  id: string;
  title: string;
  component: ComponentType;
  defaultDock?: PanelDockDefault;
}

/** A stylesheet applied to every app window after the core styles. Extension
 *  rules are unlayered, so they win over Tailwind utility classes at equal or
 *  lower specificity; disabling the extension removes the sheet. */
export interface StylesheetContribution {
  id: string;
  css: string;
}

/** The theme's CSS variables as `var(--color-…)` strings. */
export interface UiTokens {
  readonly surface1: string;
  readonly surface2: string;
  readonly surface3: string;
  readonly surface4: string;
  readonly border: string;
  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly textMuted: string;
  readonly accent: string;
  readonly sliderFill: string;
  readonly labelRed: string;
  readonly white: string;
}

export interface PanelProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
  /** Render in the red danger colour. */
  danger?: boolean;
  disabled?: boolean;
}

/** "separator" draws a divider between groups of items. */
export type ContextMenuEntry = ContextMenuItem | "separator";

export interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuEntry[];
  onClose: () => void;
}

export interface SafelightAPI {
  version: 1;
  extensionId: string;
  react: typeof import("react");
  registerPanel(c: PanelContribution): void;
  registerStylesheet(c: StylesheetContribution): void;
  ui: { tokens: UiTokens };
  components: {
    /** Core's collapsible section; inside a dock panel of the same title it
     *  renders the content alone. */
    Panel: ComponentType<PanelProps>;
    /** The right-click menu, placed at client `x`/`y` and kept in the
     *  viewport. Closes on an outside click, Escape, scroll, or a choice. */
    ContextMenu: ComponentType<ContextMenuProps>;
  };
  reactDom: { createPortal(children: ReactNode, container: Element | DocumentFragment): ReactPortal };
  stores: {
    useDevelopStore: StoreApi<DevelopStoreState>;
    useCatalogStore: StoreApi<CatalogStoreState>;
    useSettings: StoreApi<SettingsState>;
    usePresetsStore: StoreApi<PresetsStoreState>;
  };
  develop: {
    /** Complete partial develop params with the defaults and clamp each value. */
    normalizeParams(p: Partial<DevelopParams> | undefined): DevelopParams;
  };
  presets: {
    /** The registered preset importers. React hook. */
    useImporters(): PresetImporter[];
    /** The labels of the extension stages a preset's paramBag carries. */
    describeBag(bag: ParamBag | undefined): string[];
    /** What a preset changes, for its tooltip. */
    summarize(params: Partial<DevelopParams>): PresetDiff[];
    /** The adjustments a preset can be saved with from these params and bag. */
    fields(params: DevelopParams, paramBag: ParamBag): PresetField[];
    /** Download a preset as a Safelight JSON preset file. */
    exportFile(name: string, params: Partial<DevelopParams>, group?: string, paramBag?: ParamBag): void;
    /** Read a Safelight JSON preset, or another app's through the importers. */
    importFile(file: File, importers: readonly PresetImporter[]): Promise<PresetImportOutcome>;
    /** Open the file picker for one file; null when cancelled. */
    pickFile(accept: string): Promise<File | null>;
    /** The picker's `accept` string for these importers. */
    pickerAccept(importers: readonly PresetImporter[]): string;
  };
  extensions: {
    /** Open the Extensions window, on a store category's list when given one. */
    openStore(category?: string): void;
  };
}

export interface ExtensionModule {
  activate(api: SafelightAPI): void;
  deactivate?(): void;
}
