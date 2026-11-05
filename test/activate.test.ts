// What activate() registers: the Presets panel under core's old panel id, title
// and dock spot (so saved layouts keep it), and the stylesheet that gives the
// panel, its dialogues and its tooltip core's look.

import { describe, expect, it } from "vitest";
import { PresetsPanel } from "../src/PresetsPanel";
import { PANEL_ID, STYLESHEET_ID, activate } from "../src/index";
import { cls } from "../src/styles";
import { fakeApi } from "./support/fake-api";

const sheet = () => {
  const rig = fakeApi();
  activate(rig.api);
  return rig.stylesheets[0].css;
};

describe("activate", () => {
  it("registers exactly the Presets panel, as core's core.presets did", () => {
    const rig = fakeApi();
    activate(rig.api);
    expect(rig.panels).toEqual([
      {
        id: "core.presets",
        title: "Presets",
        component: PresetsPanel,
        defaultDock: { module: "develop", direction: "left", order: 2, width: 240, height: 200 },
      },
    ]);
    expect(PANEL_ID).toBe("core.presets");
  });

  it("registers one stylesheet, coloured from the theme tokens", () => {
    const rig = fakeApi();
    activate(rig.api);
    expect(rig.stylesheets.map((s) => s.id)).toEqual([STYLESHEET_ID]);
    const css = rig.stylesheets[0].css;
    expect(css).toContain(`:where(.${cls.save}) { flex: 1; border-radius: 0.25rem; background-color: var(--color-surface-3);`);
    expect(css).toContain(`:where(.${cls.save}:hover) { background-color: var(--color-surface-4); color: var(--color-text-primary); }`);
    expect(css).toContain(`:where(.${cls.row}:hover .${cls.delete}) { opacity: 1; }`);
    expect(css).toContain(`:where(.${cls.delete}:hover) { color: var(--color-label-red); }`);
    expect(css).toContain(`:where(.${cls.card}) { width: 320px; border-radius: 0.5rem; border: 1px solid var(--color-border); background-color: var(--color-surface-1);`);
    expect(css).toContain(`:where(.${cls.primary}:disabled) { cursor: not-allowed; opacity: 0.4; }`);
  });

  it("puts the disabled rule after the hover rules, so a hovered disabled button stays dimmed", () => {
    const css = sheet();
    expect(css.indexOf(`.${cls.primary}:disabled`)).toBeGreaterThan(css.indexOf(`.${cls.primary}:hover`));
  });

  it("keeps every class rule at zero specificity, below any stylesheet that restyles buttons or inputs", () => {
    const plain = sheet()
      .split("\n")
      .filter((line) => line.includes(".safelight-presets-"))
      .filter((line) => !line.trimStart().startsWith(":where(") && !line.startsWith("html.sl-"));
    expect(plain).toEqual([]);
  });

  it("repeats core's Larger text and Lowercase headings rules for the panel's small and uppercase text", () => {
    const css = sheet();
    const rule = (selectorStart: string) => css.split("\n").find((line) => line.startsWith(selectorStart)) ?? "";
    const tenPx = rule(`html.sl-larger-text .${cls.tool}`);
    expect(tenPx).toContain(`html.sl-larger-text .${cls.groupHeader}`);
    expect(tenPx).toContain("{ font-size: 12px !important; }");
    const elevenPx = rule(`html.sl-larger-text .${cls.save}`);
    expect(elevenPx).toContain(`html.sl-larger-text .${cls.row}`);
    expect(elevenPx).toContain(`html.sl-larger-text .${cls.tooltip}`);
    expect(elevenPx).toContain("{ font-size: 13px !important; line-height: 1.45 !important; }");
    expect(rule(`html.sl-larger-text .${cls.groupHeader}, `)).toContain("{ text-transform: none !important; }");
    expect(rule(`html.sl-title-headings .${cls.groupHeader}`)).toContain("{ text-transform: capitalize !important; }");
  });
});
