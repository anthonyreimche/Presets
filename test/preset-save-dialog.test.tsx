// The Save dialogue lists what core's preset fields offer and saves the checked
// ones: changed global fields pre-checked, per-image fields only under "Show
// all", and a display transform's settings carried with its field (a setting
// the photo never moved saved as its default, so the preset resets a tuned
// photo).

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PresetSaveDialog, type PresetSaveResult } from "../src/PresetSaveDialog";
import { React, initRuntime } from "../src/rt";
import type { DevelopParams, ParamBag, PresetField } from "../src/safelight";
import { fakeApi, normalizeParams, scalarFields } from "./support/fake-api";

afterEach(cleanup);

/** core's transformPresetField for a picked "test.tuned" transform with one
 *  `gain` setting (default 1). */
function tunedFields(params: DevelopParams, bag: ParamBag): PresetField[] {
  const gain = "test.tuned.gain";
  return [
    ...scalarFields(params),
    {
      id: "displayTransform",
      label: "Display transform",
      keys: ["displayTransform"],
      changed: params.displayTransform !== null || (bag[gain] !== undefined && bag[gain] !== 1),
      bagKeys: [gain],
      bagDefaults: { [gain]: 1 },
    },
    { id: "geometry", label: "Crop & geometry", keys: ["crop"], changed: true, scope: "per-image" },
    { id: "ext:test.warp", label: "Warp", keys: [], changed: true, scope: "per-image", extension: true, bagKeys: ["test.warp.amount"] },
  ];
}

function setup(
  params: Partial<DevelopParams>,
  paramBag: ParamBag,
  props: { initialName?: string; initialGroup?: string; saveLabel?: string; groups?: string[] } = {},
) {
  const rig = fakeApi({ fields: tunedFields });
  initRuntime(rig.api);
  const onSave = vi.fn<(result: PresetSaveResult) => void>();
  const onCancel = vi.fn<() => void>();
  render(
    <PresetSaveDialog
      params={normalizeParams({ crop: { x: 0.1 }, ...params })}
      paramBag={paramBag}
      groups={props.groups ?? []}
      initialName={props.initialName}
      initialGroup={props.initialGroup}
      saveLabel={props.saveLabel}
      onSave={onSave}
      onCancel={onCancel}
    />,
  );
  return { onSave, onCancel };
}

const nameBox = () => screen.getByRole<HTMLInputElement>("textbox", { name: "Preset name" });
const checkbox = (name: RegExp) => screen.getByRole<HTMLInputElement>("checkbox", { name });
const saveButton = (name = "Save preset") => screen.getByRole<HTMLButtonElement>("button", { name });

function save(name = "Tuned look", button = "Save preset") {
  fireEvent.change(nameBox(), { target: { value: name } });
  fireEvent.click(saveButton(button));
}

describe("a display transform with settings", () => {
  const BAG = { "test.tuned.gain": 2, "other.stage.x": 1 };

  it("saves the picked transform's settings with the pick", () => {
    const { onSave } = setup({ displayTransform: "test.tuned" }, BAG);
    save();
    expect(onSave.mock.calls[0][0].params).toEqual({ displayTransform: "test.tuned" });
    expect(onSave.mock.calls[0][0].paramBag).toEqual({ "test.tuned.gain": 2 });
  });

  it("saves a setting the photo never moved as its default, so the preset resets a tuned photo", () => {
    const { onSave } = setup({ displayTransform: "test.tuned" }, { "other.stage.x": 1 });
    save();
    const saved = JSON.parse(JSON.stringify(onSave.mock.calls[0][0].paramBag));
    expect(saved).toEqual({ "test.tuned.gain": 1 });
    expect({ "test.tuned.gain": 3, ...saved }).toEqual({ "test.tuned.gain": 1 });
  });

  it("pre-selects the field for a photo without a pick once a setting of the default transform moved", () => {
    const { onSave } = setup({}, BAG);
    expect(checkbox(/^Display transform/).checked).toBe(true);
    save();
    expect(onSave.mock.calls[0][0].params).toEqual({ displayTransform: null });
    expect(onSave.mock.calls[0][0].paramBag).toEqual({ "test.tuned.gain": 2 });
  });
});

describe("PresetSaveDialog", () => {
  it("lists and pre-checks only the changed global adjustments", () => {
    setup({ exposure: 0.5 }, {});
    expect(screen.getAllByRole("checkbox").map((c) => c.closest("label")?.textContent)).toEqual([
      "Show all",
      "exposure0.5",
    ]);
    expect(checkbox(/^exposure/).checked).toBe(true);
  });

  it("offers every field under Show all, per-image ones unchecked and tagged on extension stages", () => {
    setup({ exposure: 0.5 }, {});
    fireEvent.click(checkbox(/^Show all/));
    expect(checkbox(/^contrast/).checked).toBe(false);
    expect(checkbox(/^Crop & geometry/).checked).toBe(false);
    expect(checkbox(/^Crop & geometry/).closest("label")?.textContent).toBe("Crop & geometry");
    expect(checkbox(/^Warp/).checked).toBe(false);
    expect(checkbox(/^Warp/).closest("label")?.textContent).toBe("Warpper-image");
  });

  it("explains an unedited photo and how to save defaults", () => {
    setup({}, {});
    screen.getByText("No adjustments on this photo. Enable “Show all” to save defaults.");
  });

  it("saves only once named and with something checked", () => {
    const { onSave } = setup({ exposure: 0.5 }, {});
    expect(saveButton().disabled).toBe(true);
    fireEvent.change(nameBox(), { target: { value: "   " } });
    expect(saveButton().disabled).toBe(true);
    fireEvent.change(nameBox(), { target: { value: "Bright" } });
    expect(saveButton().disabled).toBe(false);
    fireEvent.click(checkbox(/^exposure/));
    expect(saveButton().disabled).toBe(true);
    fireEvent.click(saveButton());
    expect(onSave).not.toHaveBeenCalled();
  });

  it("saves the trimmed name and group with the checked adjustments, from the button or Enter", () => {
    const { onSave } = setup({ exposure: 0.5, contrast: 20 }, {}, { groups: ["Portraits"] });
    fireEvent.change(nameBox(), { target: { value: "  Bright  " } });
    const group = screen.getByRole<HTMLInputElement>("combobox", { name: "Preset group (optional)" });
    fireEvent.change(group, { target: { value: " Portraits " } });
    fireEvent.click(checkbox(/^contrast/));
    fireEvent.keyDown(group, { key: "Enter" });
    expect(onSave.mock.calls).toEqual([[{ name: "Bright", group: "Portraits", params: { exposure: 0.5 }, paramBag: {} }]]);
    expect([...document.querySelectorAll("#preset-groups option")].map((o) => o.getAttribute("value"))).toEqual([
      "Portraits",
    ]);
  });

  it("preloads a preset's name and group for Update, with its own button label", () => {
    const { onSave } = setup({ exposure: 0.5 }, {}, { initialName: "Bright", initialGroup: "Portraits", saveLabel: "Update preset" });
    expect(nameBox().value).toBe("Bright");
    fireEvent.click(saveButton("Update preset"));
    expect(onSave.mock.calls[0][0]).toMatchObject({ name: "Bright", group: "Portraits" });
  });

  it("focuses the name field when it opens", () => {
    setup({}, {});
    expect(document.activeElement).toBe(nameBox());
  });

  it("cancels from the button or a click on the backdrop, not inside the card", () => {
    const { onCancel } = setup({}, {});
    fireEvent.click(nameBox());
    expect(onCancel).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    const backdrop = nameBox().closest(".safelight-presets-backdrop");
    if (backdrop) fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(2);
  });
});
