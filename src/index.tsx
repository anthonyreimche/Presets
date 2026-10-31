// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

// Registers the Develop "Presets" panel (save, apply, import and export develop
// presets). It was core's built-in `core.presets` until Safelight 3.2.0 and
// keeps that panel id, so saved layouts keep it where it was.

import { PresetsPanel } from "./PresetsPanel";
import { initRuntime } from "./rt";
import type { SafelightAPI } from "./safelight";
import { presetsCss } from "./styles";

export const PANEL_ID = "core.presets";
export const STYLESHEET_ID = "safelight.presets.styles";

export function activate(host: SafelightAPI): void {
  initRuntime(host);
  host.registerStylesheet({ id: STYLESHEET_ID, css: presetsCss(host.ui.tokens) });
  host.registerPanel({
    id: PANEL_ID,
    title: "Presets",
    component: PresetsPanel,
    defaultDock: { module: "develop", direction: "left", order: 2, width: 240, height: 200 },
  });
}
