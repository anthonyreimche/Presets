// PresetTooltip measures the hovered row via getBoundingClientRect — client
// (visual) px — but positions its <body> portal through CSS left/top, which
// the <body> UI-scale zoom renders in layout px. At scale ≠ 100% the two
// spaces differ by uiScale, and the error grows with the anchor's absolute x —
// so a right-docked info panel pushed the tooltip past the window's right edge
// (Safelight issue #105). jsdom has no layout engine, so the anchor rect and
// the tooltip's measured size are stubbed here.

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { PresetTooltip } from "../src/PresetTooltip";
import { React, initRuntime } from "../src/rt";
import { cls } from "../src/styles";
import { fakeApi, type Rig } from "./support/fake-api";

const size = { width: 192, height: 120 };

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", { configurable: true, get: () => size.width });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", { configurable: true, get: () => size.height });
});

afterEach(cleanup);

let rig: Rig;

function anchorAt(rect: { left: number; top: number; right: number; bottom: number }): HTMLElement {
  const el = document.createElement("div");
  const { left, top, right, bottom } = rect;
  el.getBoundingClientRect = () => new DOMRect(left, top, right - left, bottom - top);
  return el;
}

function renderTooltip(
  rect: { left: number; top: number; right: number; bottom: number },
  { uiScale = 1, diffs = [{ label: "Contrast", value: "+20" }] } = {},
): HTMLElement {
  rig = fakeApi();
  rig.settings.setState({ uiScale });
  initRuntime(rig.api);
  render(<PresetTooltip name="Novachrome" diffs={diffs} anchor={anchorAt(rect)} />);
  return screen.getByRole("tooltip");
}

// The jsdom viewport is 1024×768; the stubbed tooltip measures 192×120.
describe("PresetTooltip placement", () => {
  it("lists the preset name and its adjustments", () => {
    const tip = renderTooltip({ left: 100, top: 200, right: 300, bottom: 220 });
    expect(tip.textContent).toContain("Novachrome");
    expect(tip.textContent).toContain("Contrast");
    expect(tip.textContent).toContain("+20");
  });

  it("says so when the preset changes nothing", () => {
    const tip = renderTooltip({ left: 100, top: 200, right: 300, bottom: 220 }, { diffs: [] });
    expect(tip.textContent).toBe("NovachromeNo adjustments");
  });

  it("renders at the document level, outside the panel's clipping", () => {
    const tip = renderTooltip({ left: 100, top: 200, right: 300, bottom: 220 });
    expect(tip.parentElement).toBe(document.body);
    expect(tip.className).toBe(cls.tooltip);
    expect(tip.style.visibility).toBe("visible");
  });

  it("opens to the right of the hovered row when there is room", () => {
    const tip = renderTooltip({ left: 100, top: 200, right: 300, bottom: 220 });
    expect([tip.style.left, tip.style.top]).toEqual(["308px", "200px"]);
  });

  it("flips to the left of the row when the right side would overflow", () => {
    const tip = renderTooltip({ left: 700, top: 200, right: 1010, bottom: 220 });
    expect([tip.style.left, tip.style.top]).toEqual(["500px", "200px"]);
  });

  it("maps the anchor rect into layout px under the UI-scale zoom", () => {
    // Layout-px anchor is 400/1.25 → right 320; right side fits in 1024/1.25.
    const tip = renderTooltip({ left: 200, top: 250, right: 400, bottom: 270 }, { uiScale: 1.25 });
    expect([tip.style.left, tip.style.top]).toEqual(["328px", "200px"]);
  });

  it("stays inside the window for a right-docked panel under the zoom", () => {
    // Issue #105: layout viewport is 819.2 wide; the row spans 720–808 in
    // layout px, so the tooltip must flip left of it and stay fully on-screen.
    const tip = renderTooltip({ left: 900, top: 300, right: 1010, bottom: 320 }, { uiScale: 1.25 });
    expect([tip.style.left, tip.style.top]).toEqual(["520px", "240px"]);
  });

  it("clamps to the viewport edge when neither side fits", () => {
    const tip = renderTooltip({ left: 50, top: 200, right: 900, bottom: 220 });
    expect(tip.style.left).toBe("8px");
  });

  it("clamps to the bottom edge in layout px under the UI-scale zoom", () => {
    // Layout viewport at 200% is 512×384: top clamps to 384 − 120 − 8.
    const tip = renderTooltip({ left: 100, top: 700, right: 300, bottom: 720 }, { uiScale: 2 });
    expect([tip.style.left, tip.style.top]).toEqual(["158px", "256px"]);
  });

  it("treats an unset interface scale as 100%", () => {
    const tip = renderTooltip({ left: 100, top: 200, right: 300, bottom: 220 }, { uiScale: 0 });
    expect([tip.style.left, tip.style.top]).toEqual(["308px", "200px"]);
  });
});
