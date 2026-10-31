// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { uiZoom } from "./preset-helpers";
import { React, api } from "./rt";
import type { PresetDiff } from "./safelight";
import { cls } from "./styles";

interface Props {
  name: string;
  diffs: PresetDiff[];
  /** The hovered row the tooltip is anchored to. */
  anchor: HTMLElement;
}

const GAP = 8;
const MARGIN = 8;

/** Hover popover listing a preset's non-default adjustments. Rendered in a
 *  portal at the document level so it's never clipped by the panel's scroll
 *  region, and flips to whichever side of the panel has room in the viewport. */
export function PresetTooltip({ name, diffs, anchor }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const place = () => {
      // The anchor rect and window extents are visual px under the <body>
      // UI-scale zoom, while the fixed portal's CSS left/top are layout px —
      // divide all of them into layout px before comparing.
      // offsetWidth/offsetHeight already measure in layout px.
      const z = uiZoom();
      const a = anchor.getBoundingClientRect();
      const vw = window.innerWidth / z;
      const vh = window.innerHeight / z;
      const w = el.offsetWidth;
      const h = el.offsetHeight;

      // Prefer the right side; flip left if it would overflow the viewport,
      // never leaving the left edge (a row wide enough to fit neither side).
      const fitsRight = a.right / z + GAP + w + MARGIN <= vw;
      const left = Math.max(MARGIN, fitsRight ? a.right / z + GAP : a.left / z - GAP - w);

      // Align to the row's top, clamped within the viewport.
      const top = Math.max(MARGIN, Math.min(a.top / z, vh - h - MARGIN));
      setPos({ top, left });
    };

    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [anchor, name, diffs]);

  return api.reactDom.createPortal(
    <div
      ref={ref}
      role="tooltip"
      className={cls.tooltip}
      style={{
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        visibility: pos ? "visible" : "hidden",
      }}
    >
      <div className={cls.tipName}>{name}</div>
      <div className={cls.tipRule} />
      {diffs.length === 0 ? (
        <div>No adjustments</div>
      ) : (
        <div className={cls.tipList}>
          {diffs.map((d) => (
            <div key={d.label} className={cls.tipRow}>
              <span className={cls.tipLabel}>{d.label}</span>
              <span className={cls.tipValue}>{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
