// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

// Pure helpers this extension keeps its own copy of, as core has them in
// presets-store.ts, catalog/types.ts, preset-summary.ts and ui/frame-point.ts.

import { api } from "./rt";
import type { DevelopParams, ParamBag, Preset, PresetField } from "./safelight";

/** Return `base` if no preset uses it, else the first free "`base` N" suffix.
 *  Comparison is case-insensitive, matching the panel's collision check. */
export function nextAvailableName(presets: readonly Preset[], base: string): string {
  const taken = new Set(presets.map((p) => p.name.toLowerCase()));
  if (!taken.has(base.toLowerCase())) return base;
  for (let n = 2; ; n++) {
    const candidate = `${base} ${n}`;
    if (!taken.has(candidate.toLowerCase())) return candidate;
  }
}

/** A partial edit (preset, pasted settings) never carries a process version:
 *  applying one keeps the target's. */
export function withoutProcessVersion(p: Partial<DevelopParams>): Partial<DevelopParams> {
  const out = { ...p };
  delete out.processVersion;
  return out;
}

/** The selected fields' DevelopParams keys, copied from `params`. */
export function buildPartialParams(
  params: DevelopParams,
  fields: readonly PresetField[],
  selectedIds: ReadonlySet<string>,
): Partial<DevelopParams> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (!selectedIds.has(f.id)) continue;
    for (const k of f.keys) out[k] = structuredClone(params[k]);
  }
  return out;
}

/** The selected fields' paramBag keys, copied from `bag`. A key the bag holds
 *  no value for takes the field's default when it has one. */
export function buildPartialBag(
  bag: ParamBag,
  fields: readonly PresetField[],
  selectedIds: ReadonlySet<string>,
): ParamBag {
  const out: ParamBag = {};
  for (const f of fields) {
    if (!f.bagKeys || !selectedIds.has(f.id)) continue;
    for (const k of f.bagKeys) {
      const fallback = f.bagDefaults?.[k];
      if (bag[k] === undefined && fallback !== undefined) out[k] = structuredClone(fallback);
      else if (k in bag) out[k] = structuredClone(bag[k]);
    }
  }
  return out;
}

/** The cumulative visual→layout zoom factor: <body> is the only zoomed
 *  ancestor, so this is exactly the Interface-scale setting. Divide client-px
 *  measurements by it before using them as CSS px on a <body> portal. */
export function uiZoom(): number {
  return api.stores.useSettings.getState().uiScale || 1;
}
