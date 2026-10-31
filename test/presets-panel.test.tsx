// The Presets panel against a fake API over real zustand stores: import
// feedback (a file nothing can read says why, a missing importer points at the
// Extensions store), presets previewed and applied at the open photo's process
// version, saving with name clashes, the row menu, groups, and export.

import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PresetsPanel } from "../src/PresetsPanel";
import { React, initRuntime } from "../src/rt";
import type { Preset } from "../src/safelight";
import { cls } from "../src/styles";
import { CURRENT_PROCESS_VERSION, LEGACY_PROCESS_VERSION, fakeApi, normalizeParams, type Rig } from "./support/fake-api";

afterEach(cleanup);

const NO_XMP_IMPORTER = "No installed extension can import .xmp presets.";

const xmp = (name = "Warm Matte.xmp") => new File(["<x:xmpmeta/>"], name, { type: "application/rdf+xml" });

function mount(presets: Preset[] = []): Rig {
  const rig = fakeApi();
  rig.presets.setState({ presets });
  initRuntime(rig.api);
  render(<PresetsPanel />);
  return rig;
}

const button = (name: string) => screen.getByRole<HTMLButtonElement>("button", { name });

async function importFile(rig: Rig, file: File) {
  rig.choose(file);
  fireEvent.click(button("Import"));
  await waitFor(() => expect(rig.pickerAccepts.length).toBeGreaterThan(0));
}

const preset = (id: string, name: string, extra: Partial<Preset> = {}): Preset => ({
  id,
  name,
  params: { exposure: 0.5 },
  ...extra,
});

function openMenu(name: string) {
  const row = button(name).parentElement;
  if (!row) throw new Error(`no row for ${name}`);
  fireEvent.contextMenu(row, { clientX: 40, clientY: 60 });
  return screen.getByRole("menu");
}

const menuItem = (label: string) => screen.getByRole("menuitem", { name: label });

describe("PresetsPanel", () => {
  it("renders inside core's Panel titled Presets, collapsed by default", () => {
    const rig = mount();
    expect(rig.panelProps.at(-1)).toEqual({ title: "Presets", defaultOpen: false });
    expect(screen.getByRole("region", { name: "Presets" })).toBeTruthy();
  });

  it("shows the toolbar and an empty-state line with no presets", () => {
    mount();
    expect([...document.querySelectorAll(`.${cls.toolbar} button`)].map((b) => b.textContent)).toEqual([
      "Save preset…",
      "Import",
      "Export",
    ]);
    expect(screen.getByText("No saved presets").className).toBe(cls.empty);
  });
});

describe("PresetsPanel import feedback", () => {
  it("explains a file type no extension imports and opens the store on Presets", async () => {
    const rig = mount();
    await importFile(rig, xmp());

    await screen.findByText(NO_XMP_IMPORTER);
    fireEvent.click(button("Browse importers"));
    expect(rig.storeOpened).toEqual(["preset"]);
    expect(screen.queryByText(NO_XMP_IMPORTER)).toBeNull();
  });

  it("opens the picker on Safelight's own presets and every importer's file types", async () => {
    const rig = mount();
    act(() => rig.installImporter("test.dng", [".dcp"], async () => null));
    fireEvent.click(button("Import"));
    await waitFor(() => expect(rig.pickerAccepts).toEqual([".json,.xmp,.lrtemplate,.dcp"]));
  });

  it("does nothing when the picker is cancelled", async () => {
    const rig = mount();
    rig.choose(null);
    fireEvent.click(button("Import"));
    await waitFor(() => expect(rig.pickerAccepts).toHaveLength(1));
    expect(screen.getByRole("status").textContent).toBe("");
    expect(rig.presets.getState().presets).toEqual([]);
  });

  it("says so when the importer finds no develop settings, saving nothing", async () => {
    const rig = mount();
    act(() => rig.installImporter("test.lightroom.xmp", [".xmp"], async () => null));
    await importFile(rig, xmp());

    await screen.findByText("Couldn't find any develop settings in “Warm Matte.xmp”.");
    expect(screen.queryByRole("button", { name: "Browse importers" })).toBeNull();
    expect(rig.presets.getState().presets).toEqual([]);
  });

  it("says so when a .json file isn't a Safelight preset", async () => {
    const rig = mount();
    await importFile(rig, new File(["{}"], "look.json", { type: "application/json" }));

    await screen.findByText("“look.json” isn't a Safelight preset this version can read.");
  });

  it("clears the message once an import succeeds, saving and applying the preset", async () => {
    const rig = mount();
    await importFile(rig, xmp());
    await screen.findByText(NO_XMP_IMPORTER);

    act(() => rig.installImporter("test.lightroom.xmp", [".xmp"], async () => ({ name: "Warm Matte", params: { exposure: 0.35 } })));
    rig.pickerAccepts.length = 0;
    await importFile(rig, xmp());

    await screen.findByRole("button", { name: "Warm Matte" });
    expect(screen.queryByText(NO_XMP_IMPORTER)).toBeNull();
    expect(rig.presets.getState().presets.map((p) => [p.name, p.params])).toEqual([["Warm Matte", { exposure: 0.35 }]]);
    expect(rig.develop.getState().params.exposure).toBe(0.35);
  });

  it("offers Overwrite or Save as new when an imported preset's name is taken", async () => {
    const rig = mount([preset("p1", "Warm Matte")]);
    const file = new File(
      [JSON.stringify({ format: "safelight-preset", name: "warm matte", params: { contrast: 10 } })],
      "warm.safelight.json",
    );
    await importFile(rig, file);

    await screen.findByText(/A preset named .warm matte. already exists\./);
    fireEvent.click(button("Save as new"));
    expect(rig.presets.getState().presets.map((p) => p.name)).toEqual(["Warm Matte", "warm matte 2"]);
  });

  it("dismisses the message", async () => {
    const rig = mount();
    await importFile(rig, xmp());

    fireEvent.click(await screen.findByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText(NO_XMP_IMPORTER)).toBeNull();
  });
});

describe("PresetsPanel process versions", () => {
  // Export and import drop a preset's version, but a hand-edited or
  // extension-written preset can still carry one; the open photo's must win.
  it.each([
    { open: LEGACY_PROCESS_VERSION, carried: CURRENT_PROCESS_VERSION },
    { open: CURRENT_PROCESS_VERSION, carried: LEGACY_PROCESS_VERSION },
  ])(
    "previews and applies a preset at the open photo's version ($open), not the preset's ($carried)",
    ({ open, carried }) => {
      const rig = fakeApi();
      rig.develop.setState({ params: normalizeParams({ processVersion: open }) });
      rig.presets.setState({ presets: [preset("p1", "Warm Matte", { params: { exposure: 0.5, processVersion: carried } })] });
      initRuntime(rig.api);
      render(<PresetsPanel />);
      const row = button("Warm Matte");

      fireEvent.mouseEnter(row.parentElement as HTMLElement);
      expect(rig.previews.at(-1)?.params?.processVersion).toBe(open);
      expect(rig.develop.getState().previewParams?.exposure).toBe(0.5);

      fireEvent.click(row);
      expect(rig.applied.at(-1)?.params.processVersion).toBe(open);
      expect(rig.develop.getState().params.exposure).toBe(0.5);
      expect(rig.develop.getState().params.processVersion).toBe(open);
    },
  );
});

describe("PresetsPanel hover and apply", () => {
  it("merges a preset over the live edit, keeping adjustments it doesn't carry", () => {
    const rig = mount([preset("p1", "Bright")]);
    act(() => rig.develop.setState({ params: normalizeParams({ processVersion: 2, contrast: 15 }), paramBag: { "a.b.c": 1 } }));
    fireEvent.click(button("Bright"));
    expect(rig.applied).toEqual([
      { params: normalizeParams({ processVersion: 2, contrast: 15, exposure: 0.5 }), paramBag: undefined },
    ]);
    expect(rig.develop.getState().paramBag).toEqual({ "a.b.c": 1 });
  });

  it("previews on hover with the preset's bag, tooltips its changes, and clears both on leave", () => {
    const rig = mount([preset("p1", "Glow", { paramBag: { "test.glow.amount": 0.4 } })]);
    const row = button("Glow").parentElement as HTMLElement;

    fireEvent.mouseEnter(row);
    expect(rig.previews.at(-1)).toEqual({
      params: normalizeParams({ processVersion: 2, exposure: 0.5 }),
      paramBag: { "test.glow.amount": 0.4 },
    });
    const tip = screen.getByRole("tooltip");
    expect([...tip.querySelectorAll(`.${cls.tipRow}`)].map((r) => r.textContent)).toEqual([
      "exposure0.5",
      "test.glowadjusted",
    ]);

    fireEvent.mouseLeave(row);
    expect(rig.previews.at(-1)).toEqual({ params: null, paramBag: undefined });
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("clears the preview before applying", () => {
    const rig = mount([preset("p1", "Bright")]);
    fireEvent.mouseEnter(button("Bright").parentElement as HTMLElement);
    fireEvent.click(button("Bright"));
    expect(rig.previews.at(-1)?.params).toBeNull();
    expect(rig.develop.getState().previewParams).toBeNull();
  });

  it("clears a lingering preview when the panel unmounts", () => {
    const rig = mount([preset("p1", "Bright")]);
    fireEvent.mouseEnter(button("Bright").parentElement as HTMLElement);
    cleanup();
    expect(rig.previews.at(-1)?.params).toBeNull();
  });
});

describe("PresetsPanel saving", () => {
  function saveAs(name: string, group = "") {
    fireEvent.click(button("Save preset…"));
    fireEvent.change(screen.getByRole("textbox", { name: "Preset name" }), { target: { value: name } });
    fireEvent.change(screen.getByRole("combobox", { name: "Preset group (optional)" }), { target: { value: group } });
    fireEvent.click(button("Save preset"));
  }

  function editLive(rig: Rig) {
    act(() => rig.develop.setState({ params: normalizeParams({ processVersion: 2, exposure: 1.2 }) }));
  }

  it("saves the live edit's checked adjustments as a new preset", () => {
    const rig = mount();
    editLive(rig);
    saveAs("Bright", "Daylight");
    expect(rig.presets.getState().presets).toEqual([
      { id: "preset-1", name: "Bright", group: "Daylight", params: { exposure: 1.2 } },
    ]);
    expect(screen.queryByRole("textbox", { name: "Preset name" })).toBeNull();
  });

  it("overwrites a preset of the same name in place when asked", () => {
    const rig = mount([preset("p1", "Bright", { group: "Old" }), preset("p2", "Other")]);
    editLive(rig);
    saveAs("BRIGHT");
    fireEvent.click(button("Overwrite"));
    expect(rig.presets.getState().presets).toEqual([
      { id: "p1", name: "Bright", group: undefined, params: { exposure: 1.2 } },
      preset("p2", "Other"),
    ]);
  });

  it("saves under the next free name when asked, or saves nothing on Cancel", () => {
    const rig = mount([preset("p1", "Bright"), preset("p2", "Bright 2")]);
    editLive(rig);
    saveAs("Bright");
    fireEvent.click(button("Cancel"));
    expect(rig.presets.getState().presets).toHaveLength(2);

    saveAs("Bright");
    fireEvent.click(button("Save as new"));
    expect(rig.presets.getState().presets.map((p) => p.name)).toEqual(["Bright", "Bright 2", "Bright 3"]);
  });

  it("closes the clash dialog on Escape", () => {
    const rig = mount([preset("p1", "Bright")]);
    editLive(rig);
    saveAs("Bright");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("button", { name: "Overwrite" })).toBeNull();
  });
});

describe("PresetsPanel row menu", () => {
  it("offers core's preset actions at the click point", () => {
    mount([preset("p1", "Bright")]);
    const menu = openMenu("Bright");
    expect([menu.dataset.x, menu.dataset.y]).toEqual(["40", "60"]);
    expect([...menu.children].map((c) => (c.getAttribute("role") === "separator" ? "—" : c.textContent))).toEqual([
      "Rename…",
      "Move to group…",
      "Update with current settings",
      "Export…",
      "—",
      "Delete",
    ]);
    expect(menuItem("Delete").dataset.danger).toBe("");
  });

  it("drops the hover preview and tooltip when the menu opens", () => {
    const rig = mount([preset("p1", "Bright")]);
    fireEvent.mouseEnter(button("Bright").parentElement as HTMLElement);
    openMenu("Bright");
    expect(rig.previews.at(-1)?.params).toBeNull();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("renames, refusing a name another preset has", () => {
    const rig = mount([preset("p1", "Bright"), preset("p2", "Moody")]);
    openMenu("Bright");
    fireEvent.click(menuItem("Rename…"));
    expect(screen.queryByRole("menu")).toBeNull();
    const box = screen.getByRole<HTMLInputElement>("textbox", { name: "Preset name" });
    expect(box.value).toBe("Bright");

    fireEvent.change(box, { target: { value: "moody" } });
    screen.getByText("A preset with this name already exists.");
    expect(button("Rename").disabled).toBe(true);

    fireEvent.change(box, { target: { value: "  Sunny  " } });
    fireEvent.keyDown(box, { key: "Enter" });
    expect(rig.presets.getState().presets.map((p) => p.name)).toEqual(["Sunny", "Moody"]);
  });

  it("moves a preset to a group, offering the existing ones", () => {
    const rig = mount([preset("p1", "Bright"), preset("p2", "Moody", { group: "Night" })]);
    openMenu("Bright");
    fireEvent.click(menuItem("Move to group…"));
    expect([...document.querySelectorAll("#preset-move-groups option")].map((o) => o.getAttribute("value"))).toEqual([
      "Night",
    ]);
    fireEvent.change(screen.getByRole("combobox", { name: "Preset group" }), { target: { value: " Night " } });
    fireEvent.click(button("Move"));
    expect(rig.presets.getState().presets.map((p) => p.group)).toEqual(["Night", "Night"]);
  });

  it("updates a preset with the live edit, renaming it unless the name is taken", () => {
    const rig = mount([preset("p1", "Bright", { group: "Day" }), preset("p2", "Moody")]);
    act(() => rig.develop.setState({ params: normalizeParams({ processVersion: 2, contrast: 30 }) }));
    openMenu("Bright");
    fireEvent.click(menuItem("Update with current settings"));
    const box = screen.getByRole<HTMLInputElement>("textbox", { name: "Preset name" });
    expect(box.value).toBe("Bright");
    fireEvent.change(box, { target: { value: "Moody" } });
    fireEvent.click(button("Update preset"));
    expect(rig.presets.getState().presets[0]).toEqual({ id: "p1", name: "Bright", group: "Day", params: { contrast: 30 } });

    openMenu("Bright");
    fireEvent.click(menuItem("Update with current settings"));
    fireEvent.change(screen.getByRole("textbox", { name: "Preset name" }), { target: { value: "Punchy" } });
    fireEvent.click(button("Update preset"));
    expect(rig.presets.getState().presets.map((p) => p.name)).toEqual(["Punchy", "Moody"]);
  });

  it("exports the preset itself", () => {
    const rig = mount([preset("p1", "Glow", { group: "FX", paramBag: { "a.b.c": 1 } })]);
    openMenu("Glow");
    fireEvent.click(menuItem("Export…"));
    expect(rig.exports).toEqual([{ name: "Glow", params: { exposure: 0.5 }, group: "FX", paramBag: { "a.b.c": 1 } }]);
  });

  it("deletes only after confirming, clearing any preview", () => {
    const rig = mount([preset("p1", "Bright")]);
    openMenu("Bright");
    fireEvent.click(menuItem("Delete"));
    screen.getByText("Delete the preset “Bright”? This can’t be undone.");
    fireEvent.click(button("Cancel"));
    expect(rig.presets.getState().presets).toHaveLength(1);

    fireEvent.click(screen.getByTitle("Delete preset"));
    fireEvent.click(button("Delete"));
    expect(rig.presets.getState().presets).toEqual([]);
    expect(rig.previews.at(-1)?.params).toBeNull();
    screen.getByText("No saved presets");
  });
});

describe("PresetsPanel groups", () => {
  it("lists ungrouped presets first, then each group with its count, collapsing on click", () => {
    mount([
      preset("p1", "A", { group: "Night" }),
      preset("p2", "B"),
      preset("p3", "C", { group: "Day" }),
      preset("p4", "D", { group: "Night" }),
    ]);
    const listed = () => [...document.querySelectorAll(`.${cls.apply}, .${cls.groupHeader}`)].map((e) => e.textContent);
    expect(listed()).toEqual(["B", "▾Night2", "A", "D", "▾Day1", "C"]);

    fireEvent.click(button("▾Night2"));
    expect(listed()).toEqual(["B", "▸Night2", "▾Day1", "C"]);
    fireEvent.click(button("▸Night2"));
    expect(listed()).toEqual(["B", "▾Night2", "A", "D", "▾Day1", "C"]);
  });

  it("follows preset changes made elsewhere", () => {
    const rig = mount();
    act(() => rig.presets.getState().add("Fresh", { clarity: 10 }));
    expect(within(screen.getByRole("region", { name: "Presets" })).getByRole("button", { name: "Fresh" })).toBeTruthy();
  });
});

describe("PresetsPanel export", () => {
  it("exports the live edit named after the open photo, without its file extension", () => {
    const rig = mount();
    act(() => rig.develop.setState({ params: normalizeParams({ processVersion: 2, exposure: 1 }), paramBag: { "a.b.c": 2 } }));
    fireEvent.click(button("Export"));
    expect(rig.exports).toEqual([
      { name: "DSCF0042", params: normalizeParams({ processVersion: 2, exposure: 1 }), group: undefined, paramBag: { "a.b.c": 2 } },
    ]);
  });

  it("falls back to a generic name with no photo open", () => {
    const rig = mount();
    act(() => rig.develop.setState({ photoId: null }));
    fireEvent.click(button("Export"));
    expect(rig.exports[0].name).toBe("preset");
  });
});
