//#region src/rt.ts
var e, t;
function n(n) {
	t = n, e = n.react;
}
//#endregion
//#region src/styles.ts
var r = "safelight-presets", i = {
	toolbar: `${r}-toolbar`,
	save: `${r}-save`,
	tool: `${r}-tool`,
	notice: `${r}-notice`,
	noticeBody: `${r}-notice-body`,
	noticeLink: `${r}-notice-link`,
	dismiss: `${r}-dismiss`,
	empty: `${r}-empty`,
	sections: `${r}-sections`,
	rows: `${r}-rows`,
	groupHeader: `${r}-group-header`,
	caret: `${r}-caret`,
	groupName: `${r}-group-name`,
	count: `${r}-count`,
	row: `${r}-row`,
	apply: `${r}-apply`,
	delete: `${r}-delete`,
	backdrop: `${r}-backdrop`,
	card: `${r}-card`,
	cardPadded: `${r}-card-padded`,
	cardSave: `${r}-card-save`,
	message: `${r}-message`,
	fields: `${r}-fields`,
	fieldsDivided: `${r}-fields-divided`,
	dialogHeading: `${r}-dialog-heading`,
	input: `${r}-input`,
	error: `${r}-error`,
	actions: `${r}-actions`,
	actionsBar: `${r}-actions-bar`,
	button: `${r}-button`,
	primary: `${r}-primary`,
	danger: `${r}-danger`,
	secondary: `${r}-secondary`,
	secondaryLift: `${r}-secondary-lift`,
	include: `${r}-include`,
	showAll: `${r}-show-all`,
	fieldList: `${r}-field-list`,
	fieldEmpty: `${r}-field-empty`,
	field: `${r}-field`,
	fieldLabel: `${r}-field-label`,
	fieldTag: `${r}-field-tag`,
	fieldValue: `${r}-field-value`,
	tooltip: `${r}-tooltip`,
	tipName: `${r}-tip-name`,
	tipRule: `${r}-tip-rule`,
	tipList: `${r}-tip-list`,
	tipRow: `${r}-tip-row`,
	tipLabel: `${r}-tip-label`,
	tipValue: `${r}-tip-value`
}, a = "0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a", o = "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;", s = [
	i.tool,
	i.notice,
	i.empty,
	i.groupHeader,
	i.dialogHeading,
	i.error,
	i.include,
	i.fieldTag
], c = [
	i.save,
	i.row,
	i.button,
	i.fieldEmpty,
	i.field,
	i.tooltip
], l = [
	i.groupHeader,
	i.dialogHeading,
	i.include
], u = (e) => e.map((e) => `html.sl-larger-text .${e}`).join(", ");
function d(e) {
	return `
:where(.${i.toolbar}) { margin-bottom: 0.5rem; display: flex; gap: 0.25rem; }
:where(.${i.save}) { flex: 1; border-radius: 0.25rem; background-color: ${e.surface3}; padding: 0.25rem 0.5rem; font-size: 11px; color: ${e.textSecondary}; }
:where(.${i.tool}) { flex: 1; border-radius: 0.25rem; background-color: ${e.surface2}; padding: 0.25rem 0.5rem; font-size: 10px; color: ${e.textSecondary}; }
:where(.${i.notice}) { margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.375rem; border-radius: 0.25rem; background-color: ${e.surface2}; padding: 0.375rem 0.5rem; font-size: 10px; line-height: 1.375; color: ${e.textSecondary}; }
:where(.${i.noticeBody}) { min-width: 0; flex: 1; }
:where(.${i.noticeLink}) { margin-top: 0.25rem; color: ${e.sliderFill}; }
:where(.${i.dismiss}) { color: ${e.textMuted}; }
:where(.${i.empty}) { font-size: 10px; color: ${e.textMuted}; }
:where(.${i.sections} > :not(:last-child)) { margin-block: 0 0.25rem; }
:where(.${i.rows} > :not(:last-child)) { margin-block: 0 0.125rem; }
:where(.${i.groupHeader}) { display: flex; width: 100%; align-items: center; gap: 0.25rem; padding: 0.125rem 0.25rem; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.025em; color: ${e.textMuted}; }
:where(.${i.caret}) { display: inline-block; width: 0.75rem; }
:where(.${i.groupName}) { ${o} }
:where(.${i.count}) { margin-left: auto; font-variant-numeric: tabular-nums; opacity: 0.6; }
:where(.${i.row}) { position: relative; display: flex; align-items: center; justify-content: space-between; border-radius: 0.25rem; padding: 0.25rem 0.5rem; font-size: 11px; color: ${e.textSecondary}; }
:where(.${i.apply}) { min-width: 0; flex: 1; ${o} text-align: left; }
:where(.${i.delete}) { margin-left: 0.25rem; color: ${e.textMuted}; opacity: 0; }

:where(.${i.backdrop}) { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; background-color: #00000080; }
:where(.${i.card}) { width: 320px; border-radius: 0.5rem; border: 1px solid ${e.border}; background-color: ${e.surface1}; box-shadow: ${a}; }
:where(.${i.cardPadded}) { padding: 1rem; }
:where(.${i.cardSave}) { display: flex; max-height: 80vh; width: 360px; flex-direction: column; }
:where(.${i.message}) { margin-bottom: 1rem; font-size: 12px; color: inherit; }
:where(.${i.fields}) { padding: 0.75rem; }
:where(.${i.fields} > :not(:last-child)) { margin-block: 0 0.5rem; }
:where(.${i.fieldsDivided}) { border-bottom: 1px solid ${e.border}; }
:where(.${i.dialogHeading}) { font-size: 10px; text-transform: uppercase; letter-spacing: 0.025em; color: inherit; }
:where(.${i.input}) { width: 100%; border-radius: 0.25rem; background-color: ${e.surface2}; padding: 0.25rem 0.5rem; font-size: 12px; color: inherit; }
:where(.${i.input})::placeholder { color: inherit; }
:where(.${i.input}:focus) { outline-style: none; }
:where(.${i.error}) { font-size: 10px; color: ${e.labelRed}; }
:where(.${i.actions}) { display: flex; justify-content: flex-end; gap: 0.5rem; }
:where(.${i.actionsBar}) { border-top: 1px solid ${e.border}; padding: 0.75rem; }
:where(.${i.button}) { border-radius: 0.25rem; padding: 0.25rem 0.75rem; font-size: 11px; }
:where(.${i.primary}) { background-color: ${e.accent}; font-weight: 500; color: ${e.white}; }
:where(.${i.danger}) { background-color: ${e.labelRed}; font-weight: 500; color: ${e.white}; }
:where(.${i.secondary}) { background-color: ${e.surface2}; color: ${e.textSecondary}; }
:where(.${i.include}) { display: flex; align-items: center; justify-content: space-between; padding: 0.375rem 0.75rem; font-size: 10px; text-transform: uppercase; letter-spacing: 0.025em; color: inherit; }
:where(.${i.showAll}) { display: flex; cursor: pointer; align-items: center; gap: 0.25rem; text-transform: none; }
:where(.${i.fieldList}) { min-height: 0; flex: 1; overflow-y: auto; padding: 0 0.5rem 0.5rem; }
:where(.${i.fieldEmpty}) { padding: 0.5rem 0.25rem; font-size: 11px; color: inherit; }
:where(.${i.field}) { display: flex; cursor: pointer; align-items: center; gap: 0.5rem; border-radius: 0.25rem; padding: 0.25rem; font-size: 11px; color: ${e.textSecondary}; }
:where(.${i.fieldLabel}) { min-width: 0; flex: 1; ${o} }
:where(.${i.fieldTag}) { flex-shrink: 0; font-size: 10px; color: inherit; }
:where(.${i.fieldValue}) { flex-shrink: 0; font-variant-numeric: tabular-nums; color: inherit; }

:where(.${i.tooltip}) { pointer-events: none; position: fixed; z-index: 1000; width: 12rem; border-radius: 0.25rem; border: 1px solid ${e.border}; background-color: ${e.surface1}; padding: 0.5rem; font-size: 11px; box-shadow: ${a}; }
:where(.${i.tipName}) { margin-bottom: 0.25rem; ${o} font-weight: 600; color: inherit; }
:where(.${i.tipRule}) { margin-bottom: 0.25rem; border-top: 1px solid ${e.border}; }
:where(.${i.tipList}) { display: flex; flex-direction: column; gap: 0.125rem; }
:where(.${i.tipRow}) { display: flex; justify-content: space-between; gap: 0.5rem; }
:where(.${i.tipLabel}) { ${o} color: ${e.textSecondary}; }
:where(.${i.tipValue}) { flex-shrink: 0; font-variant-numeric: tabular-nums; color: inherit; }

@media (hover: hover) {
  :where(.${i.save}:hover) { background-color: ${e.surface4}; color: ${e.textPrimary}; }
  :where(.${i.tool}:hover) { background-color: ${e.surface3}; color: ${e.textPrimary}; }
  :where(.${i.noticeLink}:hover) { text-decoration-line: underline; }
  :where(.${i.dismiss}:hover) { color: ${e.textPrimary}; }
  :where(.${i.groupHeader}:hover) { color: ${e.textSecondary}; }
  :where(.${i.row}:hover) { background-color: ${e.surface2}; }
  :where(.${i.apply}:hover) { color: ${e.textPrimary}; }
  :where(.${i.delete}:hover) { color: ${e.labelRed}; }
  :where(.${i.row}:hover .${i.delete}) { opacity: 1; }
  :where(.${i.primary}:hover, .${i.danger}:hover) { opacity: 0.9; }
  :where(.${i.secondary}:hover) { background-color: ${e.surface3}; }
  :where(.${i.secondaryLift}:hover) { color: inherit; }
  :where(.${i.field}:hover) { background-color: ${e.surface2}; }
}
:where(.${i.primary}:disabled) { cursor: not-allowed; opacity: 0.4; }

${u(s)} { font-size: 12px !important; }
${u(c)} { font-size: 13px !important; line-height: 1.45 !important; }
${u(l)} { text-transform: none !important; }
${l.map((e) => `html.sl-title-headings .${e}`).join(", ")} { text-transform: capitalize !important; }
`;
}
//#endregion
//#region src/PresetDeleteDialog.tsx
function f({ name: t, onDelete: n, onCancel: r }) {
	return e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r]), /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && r();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: `${i.card} ${i.cardPadded}` }, /* @__PURE__ */ e.createElement("p", { className: i.message }, "Delete the preset “", t, "”? This can’t be undone."), /* @__PURE__ */ e.createElement("div", { className: i.actions }, /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.danger}`,
		onClick: n
	}, "Delete"), /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.secondary}`,
		onClick: r
	}, "Cancel"))));
}
//#endregion
//#region src/PresetMoveDialog.tsx
function p({ initialGroup: t, groups: n, onMove: r, onCancel: a }) {
	let [o, s] = e.useState(t ?? ""), c = e.useRef(null);
	e.useEffect(() => c.current?.select(), []);
	let l = () => r(o.trim());
	return /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && a();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: i.card }, /* @__PURE__ */ e.createElement("div", { className: i.fields }, /* @__PURE__ */ e.createElement("div", { className: i.dialogHeading }, "Move to group"), /* @__PURE__ */ e.createElement("input", {
		ref: c,
		type: "text",
		value: o,
		placeholder: "Group (leave empty for ungrouped)",
		"aria-label": "Preset group",
		list: "preset-move-groups",
		onChange: (e) => s(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && l(), e.key === "Escape" && a();
		},
		className: i.input
	}), /* @__PURE__ */ e.createElement("datalist", { id: "preset-move-groups" }, n.map((t) => /* @__PURE__ */ e.createElement("option", {
		key: t,
		value: t
	})))), /* @__PURE__ */ e.createElement("div", { className: `${i.actions} ${i.actionsBar}` }, /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.secondary}`,
		onClick: a
	}, "Cancel"), /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.primary}`,
		onClick: l
	}, "Move"))));
}
//#endregion
//#region src/PresetOverwriteDialog.tsx
function m({ name: t, onOverwrite: n, onSaveAsNew: r, onCancel: a }) {
	return e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && a();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [a]), /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && a();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: `${i.card} ${i.cardPadded}` }, /* @__PURE__ */ e.createElement("p", { className: i.message }, "A preset named “", t, "” already exists."), /* @__PURE__ */ e.createElement("div", { className: i.actions }, /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.primary}`,
		onClick: n
	}, "Overwrite"), /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.secondary} ${i.secondaryLift}`,
		onClick: r
	}, "Save as new"), /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.secondary}`,
		onClick: a
	}, "Cancel"))));
}
//#endregion
//#region src/PresetRenameDialog.tsx
function h({ initialName: t, validate: n, onRename: r, onCancel: a }) {
	let [o, s] = e.useState(t), c = e.useRef(null);
	e.useEffect(() => c.current?.select(), []);
	let l = o.trim(), u = n?.(l) ?? null, d = l.length > 0 && !u, f = () => {
		d && r(l);
	};
	return /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && a();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: i.card }, /* @__PURE__ */ e.createElement("div", { className: i.fields }, /* @__PURE__ */ e.createElement("div", { className: i.dialogHeading }, "Rename preset"), /* @__PURE__ */ e.createElement("input", {
		ref: c,
		type: "text",
		value: o,
		placeholder: "Preset name",
		"aria-label": "Preset name",
		onChange: (e) => s(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && f(), e.key === "Escape" && a();
		},
		className: i.input
	}), u && /* @__PURE__ */ e.createElement("div", { className: i.error }, u)), /* @__PURE__ */ e.createElement("div", { className: `${i.actions} ${i.actionsBar}` }, /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.secondary}`,
		onClick: a
	}, "Cancel"), /* @__PURE__ */ e.createElement("button", {
		disabled: !d,
		className: `${i.button} ${i.primary}`,
		onClick: f
	}, "Rename"))));
}
//#endregion
//#region src/preset-helpers.ts
function g(e, t) {
	let n = new Set(e.map((e) => e.name.toLowerCase()));
	if (!n.has(t.toLowerCase())) return t;
	for (let e = 2;; e++) {
		let r = `${t} ${e}`;
		if (!n.has(r.toLowerCase())) return r;
	}
}
function _(e) {
	let t = { ...e };
	return delete t.processVersion, t;
}
function v(e, t, n) {
	let r = {};
	for (let i of t) if (n.has(i.id)) for (let t of i.keys) r[t] = structuredClone(e[t]);
	return r;
}
function y(e, t, n) {
	let r = {};
	for (let i of t) if (i.bagKeys && n.has(i.id)) for (let t of i.bagKeys) {
		let n = i.bagDefaults?.[t];
		e[t] === void 0 && n !== void 0 ? r[t] = structuredClone(n) : t in e && (r[t] = structuredClone(e[t]));
	}
	return r;
}
function b() {
	return t.stores.useSettings.getState().uiScale || 1;
}
//#endregion
//#region src/PresetSaveDialog.tsx
function x({ params: n, paramBag: r, groups: a, initialName: o, initialGroup: s, saveLabel: c = "Save preset", onSave: l, onCancel: u }) {
	let d = e.useMemo(() => t.presets.fields(n, r), [n, r]), [f, p] = e.useState(o ?? ""), [m, h] = e.useState(s ?? ""), [g, _] = e.useState(!1), [b, x] = e.useState(() => new Set(d.filter((e) => e.scope !== "per-image" && e.changed).map((e) => e.id))), S = e.useRef(null);
	e.useEffect(() => S.current?.focus(), []);
	let C = g ? d : d.filter((e) => e.scope !== "per-image" && e.changed), w = (e) => x((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), T = f.trim().length > 0 && b.size > 0, E = () => {
		T && l({
			name: f.trim(),
			group: m.trim(),
			params: v(n, d, b),
			paramBag: y(r, d, b)
		});
	};
	return /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && u();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: `${i.card} ${i.cardSave}` }, /* @__PURE__ */ e.createElement("div", { className: `${i.fields} ${i.fieldsDivided}` }, /* @__PURE__ */ e.createElement("input", {
		ref: S,
		type: "text",
		value: f,
		placeholder: "Preset name",
		"aria-label": "Preset name",
		onChange: (e) => p(e.target.value),
		onKeyDown: (e) => e.key === "Enter" && E(),
		className: i.input
	}), /* @__PURE__ */ e.createElement("input", {
		type: "text",
		value: m,
		placeholder: "Group (optional)",
		"aria-label": "Preset group (optional)",
		list: "preset-groups",
		onChange: (e) => h(e.target.value),
		onKeyDown: (e) => e.key === "Enter" && E(),
		className: i.input
	}), /* @__PURE__ */ e.createElement("datalist", { id: "preset-groups" }, a.map((t) => /* @__PURE__ */ e.createElement("option", {
		key: t,
		value: t
	})))), /* @__PURE__ */ e.createElement("div", { className: i.include }, /* @__PURE__ */ e.createElement("span", null, "Include"), /* @__PURE__ */ e.createElement("label", { className: i.showAll }, /* @__PURE__ */ e.createElement("input", {
		type: "checkbox",
		checked: g,
		onChange: (e) => _(e.target.checked)
	}), "Show all")), /* @__PURE__ */ e.createElement("div", { className: i.fieldList }, C.length === 0 ? /* @__PURE__ */ e.createElement("div", { className: i.fieldEmpty }, "No adjustments on this photo. Enable “Show all” to save defaults.") : C.map((t) => /* @__PURE__ */ e.createElement("label", {
		key: t.id,
		className: i.field
	}, /* @__PURE__ */ e.createElement("input", {
		type: "checkbox",
		checked: b.has(t.id),
		onChange: () => w(t.id)
	}), /* @__PURE__ */ e.createElement("span", { className: i.fieldLabel }, t.label), t.extension && t.scope === "per-image" && /* @__PURE__ */ e.createElement("span", { className: i.fieldTag }, "per-image"), t.value && /* @__PURE__ */ e.createElement("span", { className: i.fieldValue }, t.value)))), /* @__PURE__ */ e.createElement("div", { className: `${i.actions} ${i.actionsBar}` }, /* @__PURE__ */ e.createElement("button", {
		className: `${i.button} ${i.secondary}`,
		onClick: u
	}, "Cancel"), /* @__PURE__ */ e.createElement("button", {
		disabled: !T,
		className: `${i.button} ${i.primary}`,
		onClick: E
	}, c))));
}
//#endregion
//#region src/PresetTooltip.tsx
var S = 8, C = 8;
function w({ name: n, diffs: r, anchor: a }) {
	let o = e.useRef(null), [s, c] = e.useState(null);
	return e.useLayoutEffect(() => {
		let e = o.current;
		if (!e) return;
		let t = () => {
			let t = b(), n = a.getBoundingClientRect(), r = window.innerWidth / t, i = window.innerHeight / t, o = e.offsetWidth, s = e.offsetHeight, l = n.right / t + S + o + C <= r, u = Math.max(C, l ? n.right / t + S : n.left / t - S - o), d = Math.max(C, Math.min(n.top / t, i - s - C));
			c({
				top: d,
				left: u
			});
		};
		return t(), window.addEventListener("scroll", t, !0), window.addEventListener("resize", t), () => {
			window.removeEventListener("scroll", t, !0), window.removeEventListener("resize", t);
		};
	}, [
		a,
		n,
		r
	]), t.reactDom.createPortal(/* @__PURE__ */ e.createElement("div", {
		ref: o,
		role: "tooltip",
		className: i.tooltip,
		style: {
			top: s?.top ?? 0,
			left: s?.left ?? 0,
			visibility: s ? "visible" : "hidden"
		}
	}, /* @__PURE__ */ e.createElement("div", { className: i.tipName }, n), /* @__PURE__ */ e.createElement("div", { className: i.tipRule }), r.length === 0 ? /* @__PURE__ */ e.createElement("div", null, "No adjustments") : /* @__PURE__ */ e.createElement("div", { className: i.tipList }, r.map((t) => /* @__PURE__ */ e.createElement("div", {
		key: t.label,
		className: i.tipRow
	}, /* @__PURE__ */ e.createElement("span", { className: i.tipLabel }, t.label), /* @__PURE__ */ e.createElement("span", { className: i.tipValue }, t.value))))), document.body);
}
//#endregion
//#region src/PresetsPanel.tsx
function T(e, t) {
	switch (e.status) {
		case "no-importer": return {
			text: e.extension ? `No installed extension can import ${e.extension} presets.` : `No installed extension can import “${t}”.`,
			offerStore: !0
		};
		case "no-settings": return {
			text: `Couldn't find any develop settings in “${t}”.`,
			offerStore: !1
		};
		case "unreadable": return {
			text: `“${t}” isn't a Safelight preset this version can read.`,
			offerStore: !1
		};
	}
}
function E(n) {
	let r = t.stores.useDevelopStore((e) => e.params), i = t.stores.useDevelopStore((e) => e.paramBag);
	return /* @__PURE__ */ e.createElement(x, {
		...n,
		params: r,
		paramBag: i
	});
}
function D() {
	let { Panel: n, ContextMenu: r } = t.components, { useDevelopStore: a, useCatalogStore: o, usePresetsStore: s } = t.stores, [c, l] = e.useState(null), [u, d] = e.useState(!1), [v, y] = e.useState(null), [b, x] = e.useState(null), [S, C] = e.useState(null), [D, O] = e.useState(null), [k, A] = e.useState(null), [j, M] = e.useState(null), [N, P] = e.useState(/* @__PURE__ */ new Set()), [F, I] = e.useState(null), L = a((e) => e.photoId), R = o((e) => e.photos.find((e) => e.id === L)?.filename), z = a((e) => e.applyPreset), B = a((e) => e.setPreviewParams), V = s((e) => e.presets), H = s((e) => e.add), U = s((e) => e.update), W = s((e) => e.rename), G = s((e) => e.setGroup), K = s((e) => e.remove), q = t.presets.useImporters();
	e.useEffect(() => () => B(null), [B]);
	let J = (e) => t.develop.normalizeParams({
		...a.getState().params,
		..._(e)
	}), Y = R?.replace(/\.[^.]+$/, "") || "preset", ee = () => {
		let { params: e, paramBag: n } = a.getState();
		t.presets.exportFile(Y, e, void 0, n);
	}, X = e.useMemo(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of V) t.group && e.add(t.group);
		return [...e];
	}, [V]), Z = e.useMemo(() => ({
		ungrouped: V.filter((e) => !e.group),
		named: X.map((e) => ({
			group: e,
			items: V.filter((t) => t.group === e)
		}))
	}), [V, X]), te = (e) => {
		B(null), K(e);
	}, Q = (e) => {
		let t = V.find((t) => t.name.toLowerCase() === e.name.toLowerCase());
		t ? M({
			existingId: t.id,
			pending: e
		}) : H(e.name, e.params, e.group, e.paramBag);
	}, ne = async () => {
		let e = await t.presets.pickFile(t.presets.pickerAccept(q));
		if (!e) return;
		I(null);
		let n = await t.presets.importFile(e, q);
		if (n.status !== "imported") {
			I(T(n, e.name));
			return;
		}
		let { preset: r } = n;
		Q({
			name: r.name,
			group: r.group ?? "",
			params: r.params,
			paramBag: r.paramBag
		}), z(J(r.params), r.paramBag);
	}, re = () => {
		I(null), t.extensions.openStore("preset");
	}, $ = (n) => /* @__PURE__ */ e.createElement("div", {
		key: n.id,
		className: i.row,
		onMouseEnter: (e) => {
			l({
				id: n.id,
				anchor: e.currentTarget
			}), B(J(n.params), n.paramBag);
		},
		onMouseLeave: () => {
			l((e) => e?.id === n.id ? null : e), B(null);
		},
		onContextMenu: (e) => {
			e.preventDefault(), B(null), l(null), O({
				preset: n,
				x: e.clientX,
				y: e.clientY
			});
		}
	}, /* @__PURE__ */ e.createElement("button", {
		onClick: () => {
			B(null), z(J(n.params), n.paramBag);
		},
		className: i.apply
	}, n.name), /* @__PURE__ */ e.createElement("button", {
		onClick: () => A(n),
		className: i.delete,
		title: "Delete preset"
	}, "✕"), c?.id === n.id && /* @__PURE__ */ e.createElement(w, {
		name: n.name,
		diffs: [...t.presets.summarize(n.params), ...t.presets.describeBag(n.paramBag).map((e) => ({
			label: e,
			value: "adjusted"
		}))],
		anchor: c.anchor
	}));
	return /* @__PURE__ */ e.createElement(n, {
		title: "Presets",
		defaultOpen: !1
	}, /* @__PURE__ */ e.createElement("div", { className: i.toolbar }, /* @__PURE__ */ e.createElement("button", {
		onClick: () => d(!0),
		className: i.save
	}, "Save preset…"), /* @__PURE__ */ e.createElement("button", {
		onClick: ne,
		className: i.tool
	}, "Import"), /* @__PURE__ */ e.createElement("button", {
		onClick: ee,
		className: i.tool
	}, "Export")), /* @__PURE__ */ e.createElement("div", {
		role: "status",
		"aria-live": "polite"
	}, F && /* @__PURE__ */ e.createElement("div", { className: i.notice }, /* @__PURE__ */ e.createElement("div", { className: i.noticeBody }, /* @__PURE__ */ e.createElement("p", null, F.text), F.offerStore && /* @__PURE__ */ e.createElement("button", {
		onClick: re,
		className: i.noticeLink
	}, "Browse importers")), /* @__PURE__ */ e.createElement("button", {
		onClick: () => I(null),
		title: "Dismiss",
		"aria-label": "Dismiss",
		className: i.dismiss
	}, "✕"))), V.length === 0 ? /* @__PURE__ */ e.createElement("p", { className: i.empty }, "No saved presets") : /* @__PURE__ */ e.createElement("div", { className: i.sections }, Z.ungrouped.length > 0 && /* @__PURE__ */ e.createElement("div", { className: i.rows }, Z.ungrouped.map($)), Z.named.map(({ group: t, items: n }) => {
		let r = N.has(t);
		return /* @__PURE__ */ e.createElement("div", { key: t }, /* @__PURE__ */ e.createElement("button", {
			onClick: () => P((e) => {
				let n = new Set(e);
				return n.has(t) ? n.delete(t) : n.add(t), n;
			}),
			className: i.groupHeader
		}, /* @__PURE__ */ e.createElement("span", { className: i.caret }, r ? "▸" : "▾"), /* @__PURE__ */ e.createElement("span", { className: i.groupName }, t), /* @__PURE__ */ e.createElement("span", { className: i.count }, n.length)), !r && /* @__PURE__ */ e.createElement("div", { className: i.rows }, n.map($)));
	})), D && /* @__PURE__ */ e.createElement(r, {
		x: D.x,
		y: D.y,
		items: [
			{
				label: "Rename…",
				onClick: () => x(D.preset)
			},
			{
				label: "Move to group…",
				onClick: () => C(D.preset)
			},
			{
				label: "Update with current settings",
				onClick: () => y(D.preset)
			},
			{
				label: "Export…",
				onClick: () => t.presets.exportFile(D.preset.name, D.preset.params, D.preset.group, D.preset.paramBag)
			},
			"separator",
			{
				label: "Delete",
				danger: !0,
				onClick: () => A(D.preset)
			}
		],
		onClose: () => O(null)
	}), u && /* @__PURE__ */ e.createElement(E, {
		groups: X,
		onSave: (e) => {
			d(!1), Q(e);
		},
		onCancel: () => d(!1)
	}), v && /* @__PURE__ */ e.createElement(E, {
		groups: X,
		initialName: v.name,
		initialGroup: v.group,
		saveLabel: "Update preset",
		onSave: (e) => {
			U(v.id, e.params, e.group, e.paramBag), V.some((t) => t.id !== v.id && t.name.toLowerCase() === e.name.toLowerCase()) || W(v.id, e.name), y(null);
		},
		onCancel: () => y(null)
	}), b && /* @__PURE__ */ e.createElement(h, {
		initialName: b.name,
		validate: (e) => V.some((t) => t.id !== b.id && t.name.toLowerCase() === e.toLowerCase()) ? "A preset with this name already exists." : null,
		onRename: (e) => {
			W(b.id, e), x(null);
		},
		onCancel: () => x(null)
	}), S && /* @__PURE__ */ e.createElement(p, {
		initialGroup: S.group,
		groups: X,
		onMove: (e) => {
			G(S.id, e), C(null);
		},
		onCancel: () => C(null)
	}), k && /* @__PURE__ */ e.createElement(f, {
		name: k.name,
		onDelete: () => {
			te(k.id), A(null);
		},
		onCancel: () => A(null)
	}), j && /* @__PURE__ */ e.createElement(m, {
		name: j.pending.name,
		onOverwrite: () => {
			U(j.existingId, j.pending.params, j.pending.group, j.pending.paramBag), M(null);
		},
		onSaveAsNew: () => {
			H(g(V, j.pending.name), j.pending.params, j.pending.group, j.pending.paramBag), M(null);
		},
		onCancel: () => M(null)
	}));
}
//#endregion
//#region src/index.tsx
var O = "core.presets", k = "safelight.presets.styles";
function A(e) {
	n(e), e.registerStylesheet({
		id: k,
		css: d(e.ui.tokens)
	}), e.registerPanel({
		id: O,
		title: "Presets",
		component: D,
		defaultDock: {
			module: "develop",
			direction: "left",
			order: 2,
			width: 240,
			height: 200
		}
	});
}
//#endregion
export { O as PANEL_ID, k as STYLESHEET_ID, A as activate };

//# sourceMappingURL=index.js.map