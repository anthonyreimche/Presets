//#region src/rt.ts
var e, t;
function n(n) {
	t = n, e = n.react;
}
//#endregion
//#region src/styles.ts
var r = "safelight-presets", i = {
	toolbar: `${r}-toolbar`,
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
	i.notice,
	i.empty,
	i.groupHeader,
	i.dialogHeading,
	i.error,
	i.include,
	i.fieldTag
], c = [
	i.row,
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
  :where(.${i.noticeLink}:hover) { text-decoration-line: underline; }
  :where(.${i.dismiss}:hover) { color: ${e.textPrimary}; }
  :where(.${i.groupHeader}:hover) { color: ${e.textSecondary}; }
  :where(.${i.row}:hover) { background-color: ${e.surface2}; }
  :where(.${i.apply}:hover) { color: ${e.textPrimary}; }
  :where(.${i.delete}:hover) { color: ${e.labelRed}; }
  :where(.${i.row}:hover .${i.delete}) { opacity: 1; }
  :where(.${i.field}:hover) { background-color: ${e.surface2}; }
}

${u(s)} { font-size: 12px !important; }
${u(c)} { font-size: 13px !important; line-height: 1.45 !important; }
${u(l)} { text-transform: none !important; }
${l.map((e) => `html.sl-title-headings .${e}`).join(", ")} { text-transform: capitalize !important; }
`;
}
//#endregion
//#region src/PresetMoveDialog.tsx
function f({ initialGroup: n, groups: r, onMove: a, onCancel: o }) {
	let { Button: s } = t.ui, [c, l] = e.useState(n ?? ""), u = e.useRef(null);
	e.useEffect(() => u.current?.select(), []);
	let d = () => a(c.trim());
	return /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && o();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: i.card }, /* @__PURE__ */ e.createElement("div", { className: i.fields }, /* @__PURE__ */ e.createElement("div", { className: i.dialogHeading }, "Move to group"), /* @__PURE__ */ e.createElement("input", {
		ref: u,
		type: "text",
		value: c,
		placeholder: "Group (leave empty for ungrouped)",
		"aria-label": "Preset group",
		list: "preset-move-groups",
		onChange: (e) => l(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && d(), e.key === "Escape" && o();
		},
		className: i.input
	}), /* @__PURE__ */ e.createElement("datalist", { id: "preset-move-groups" }, r.map((t) => /* @__PURE__ */ e.createElement("option", {
		key: t,
		value: t
	})))), /* @__PURE__ */ e.createElement("div", { className: `${i.actions} ${i.actionsBar}` }, /* @__PURE__ */ e.createElement(s, {
		variant: "secondary",
		onClick: o
	}, "Cancel"), /* @__PURE__ */ e.createElement(s, {
		variant: "primary",
		onClick: d
	}, "Move"))));
}
//#endregion
//#region src/PresetOverwriteDialog.tsx
function p({ name: n, onOverwrite: r, onSaveAsNew: a, onCancel: o }) {
	let { Button: s } = t.ui;
	return e.useEffect(() => t.ui.onEscape(o), [o]), /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && o();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: `${i.card} ${i.cardPadded}` }, /* @__PURE__ */ e.createElement("p", { className: i.message }, "A preset named “", n, "” already exists."), /* @__PURE__ */ e.createElement("div", { className: i.actions }, /* @__PURE__ */ e.createElement(s, {
		variant: "primary",
		onClick: r
	}, "Overwrite"), /* @__PURE__ */ e.createElement(s, {
		variant: "secondary",
		onClick: a
	}, "Save as new"), /* @__PURE__ */ e.createElement(s, {
		variant: "secondary",
		onClick: o
	}, "Cancel"))));
}
//#endregion
//#region src/PresetRenameDialog.tsx
function m({ initialName: n, validate: r, onRename: a, onCancel: o }) {
	let { Button: s } = t.ui, [c, l] = e.useState(n), u = e.useRef(null);
	e.useEffect(() => u.current?.select(), []);
	let d = c.trim(), f = r?.(d) ?? null, p = d.length > 0 && !f, m = () => {
		p && a(d);
	};
	return /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && o();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: i.card }, /* @__PURE__ */ e.createElement("div", { className: i.fields }, /* @__PURE__ */ e.createElement("div", { className: i.dialogHeading }, "Rename preset"), /* @__PURE__ */ e.createElement("input", {
		ref: u,
		type: "text",
		value: c,
		placeholder: "Preset name",
		"aria-label": "Preset name",
		onChange: (e) => l(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && m(), e.key === "Escape" && o();
		},
		className: i.input
	}), f && /* @__PURE__ */ e.createElement("div", { className: i.error }, f)), /* @__PURE__ */ e.createElement("div", { className: `${i.actions} ${i.actionsBar}` }, /* @__PURE__ */ e.createElement(s, {
		variant: "secondary",
		onClick: o
	}, "Cancel"), /* @__PURE__ */ e.createElement(s, {
		variant: "primary",
		disabled: !p,
		onClick: m
	}, "Rename"))));
}
//#endregion
//#region src/preset-helpers.ts
function h(e, t) {
	let n = new Set(e.map((e) => e.name.toLowerCase()));
	if (!n.has(t.toLowerCase())) return t;
	for (let e = 2;; e++) {
		let r = `${t} ${e}`;
		if (!n.has(r.toLowerCase())) return r;
	}
}
function g(e) {
	let t = { ...e };
	return delete t.processVersion, t;
}
function _(e, t, n) {
	let r = {};
	for (let i of t) if (n.has(i.id)) for (let t of i.keys) r[t] = structuredClone(e[t]);
	return r;
}
function v(e, t, n) {
	let r = {};
	for (let i of t) if (i.bagKeys && n.has(i.id)) for (let t of i.bagKeys) {
		let n = i.bagDefaults?.[t];
		e[t] === void 0 && n !== void 0 ? r[t] = structuredClone(n) : t in e && (r[t] = structuredClone(e[t]));
	}
	return r;
}
function y() {
	return t.stores.useSettings.getState().uiScale || 1;
}
//#endregion
//#region src/PresetSaveDialog.tsx
function b({ params: n, paramBag: r, groups: a, initialName: o, initialGroup: s, saveLabel: c = "Save preset", onSave: l, onCancel: u }) {
	let { Button: d } = t.ui, f = e.useMemo(() => t.presets.fields(n, r), [n, r]), [p, m] = e.useState(o ?? ""), [h, g] = e.useState(s ?? ""), [y, b] = e.useState(!1), [x, S] = e.useState(() => new Set(f.filter((e) => e.scope !== "per-image" && e.changed).map((e) => e.id))), C = e.useRef(null);
	e.useEffect(() => C.current?.focus(), []);
	let w = y ? f : f.filter((e) => e.scope !== "per-image" && e.changed), T = (e) => S((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), E = p.trim().length > 0 && x.size > 0, D = () => {
		E && l({
			name: p.trim(),
			group: h.trim(),
			params: _(n, f, x),
			paramBag: v(r, f, x)
		});
	};
	return /* @__PURE__ */ e.createElement("div", {
		className: i.backdrop,
		onClick: (e) => {
			e.target === e.currentTarget && u();
		}
	}, /* @__PURE__ */ e.createElement("div", { className: `${i.card} ${i.cardSave}` }, /* @__PURE__ */ e.createElement("div", { className: `${i.fields} ${i.fieldsDivided}` }, /* @__PURE__ */ e.createElement("input", {
		ref: C,
		type: "text",
		value: p,
		placeholder: "Preset name",
		"aria-label": "Preset name",
		onChange: (e) => m(e.target.value),
		onKeyDown: (e) => e.key === "Enter" && D(),
		className: i.input
	}), /* @__PURE__ */ e.createElement("input", {
		type: "text",
		value: h,
		placeholder: "Group (optional)",
		"aria-label": "Preset group (optional)",
		list: "preset-groups",
		onChange: (e) => g(e.target.value),
		onKeyDown: (e) => e.key === "Enter" && D(),
		className: i.input
	}), /* @__PURE__ */ e.createElement("datalist", { id: "preset-groups" }, a.map((t) => /* @__PURE__ */ e.createElement("option", {
		key: t,
		value: t
	})))), /* @__PURE__ */ e.createElement("div", { className: i.include }, /* @__PURE__ */ e.createElement("span", null, "Include"), /* @__PURE__ */ e.createElement("label", { className: i.showAll }, /* @__PURE__ */ e.createElement("input", {
		type: "checkbox",
		checked: y,
		onChange: (e) => b(e.target.checked)
	}), "Show all")), /* @__PURE__ */ e.createElement("div", { className: i.fieldList }, w.length === 0 ? /* @__PURE__ */ e.createElement("div", { className: i.fieldEmpty }, "No adjustments on this photo. Enable “Show all” to save defaults.") : w.map((t) => /* @__PURE__ */ e.createElement("label", {
		key: t.id,
		className: i.field
	}, /* @__PURE__ */ e.createElement("input", {
		type: "checkbox",
		checked: x.has(t.id),
		onChange: () => T(t.id)
	}), /* @__PURE__ */ e.createElement("span", { className: i.fieldLabel }, t.label), t.extension && t.scope === "per-image" && /* @__PURE__ */ e.createElement("span", { className: i.fieldTag }, "per-image"), t.value && /* @__PURE__ */ e.createElement("span", { className: i.fieldValue }, t.value)))), /* @__PURE__ */ e.createElement("div", { className: `${i.actions} ${i.actionsBar}` }, /* @__PURE__ */ e.createElement(d, {
		variant: "secondary",
		onClick: u
	}, "Cancel"), /* @__PURE__ */ e.createElement(d, {
		variant: "primary",
		disabled: !E,
		onClick: D
	}, c))));
}
//#endregion
//#region src/PresetTooltip.tsx
var x = 8, S = 8;
function C({ name: n, diffs: r, anchor: a }) {
	let o = e.useRef(null), [s, c] = e.useState(null);
	return e.useLayoutEffect(() => {
		let e = o.current;
		if (!e) return;
		let t = () => {
			let t = y(), n = a.getBoundingClientRect(), r = window.innerWidth / t, i = window.innerHeight / t, o = e.offsetWidth, s = e.offsetHeight, l = n.right / t + x + o + S <= r, u = Math.max(S, l ? n.right / t + x : n.left / t - x - o), d = Math.max(S, Math.min(n.top / t, i - s - S));
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
var w = { flex: 1 };
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
		case "failed": return {
			text: `Couldn't read “${t}”: ${e.reason}`,
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
	return /* @__PURE__ */ e.createElement(b, {
		...n,
		params: r,
		paramBag: i
	});
}
function D() {
	let { Panel: n, ContextMenu: r } = t.components, { Button: a } = t.ui, { useDevelopStore: o, useCatalogStore: s, usePresetsStore: c } = t.stores, [l, u] = e.useState(null), [d, _] = e.useState(!1), [v, y] = e.useState(null), [b, x] = e.useState(null), [S, D] = e.useState(null), [O, k] = e.useState(null), [A, j] = e.useState(null), [M, N] = e.useState(/* @__PURE__ */ new Set()), [P, F] = e.useState(null), I = o((e) => e.photoId), ee = s((e) => e.photos.find((e) => e.id === I)?.filename), L = o((e) => e.applyPreset), R = o((e) => e.setPreviewParams), z = c((e) => e.presets), B = c((e) => e.add), V = c((e) => e.update), H = c((e) => e.rename), U = c((e) => e.setGroup), W = c((e) => e.remove), G = t.presets.useImporters();
	e.useEffect(() => () => R(null), [R]);
	let K = (e) => t.develop.normalizeParams({
		...o.getState().params,
		...g(e)
	}), q = ee?.replace(/\.[^.]+$/, "") || "preset", J = () => {
		let { params: e, paramBag: n } = o.getState();
		t.presets.exportFile(q, e, void 0, n);
	}, Y = e.useMemo(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of z) t.group && e.add(t.group);
		return [...e];
	}, [z]), X = e.useMemo(() => ({
		ungrouped: z.filter((e) => !e.group),
		named: Y.map((e) => ({
			group: e,
			items: z.filter((t) => t.group === e)
		}))
	}), [z, Y]), te = (e) => {
		R(null), W(e);
	}, Z = async (e) => {
		await t.ui.confirmDialog({
			title: "Delete preset",
			message: `Delete the preset “${e.name}”? This can’t be undone.`,
			confirmLabel: "Delete",
			variant: "danger"
		}) && te(e.id);
	}, Q = (e) => {
		let t = z.find((t) => t.name.toLowerCase() === e.name.toLowerCase());
		t ? j({
			existingId: t.id,
			pending: e
		}) : B(e.name, e.params, e.group, e.paramBag);
	}, ne = async () => {
		let e = await t.presets.pickFile(t.presets.pickerAccept(G));
		if (!e) return;
		F(null);
		let n = await t.presets.importFile(e, G);
		if (n.status !== "imported") {
			F(T(n, e.name));
			return;
		}
		let { preset: r } = n;
		Q({
			name: r.name,
			group: r.group ?? "",
			params: r.params,
			paramBag: r.paramBag
		}), L(K(r.params), r.paramBag);
	}, re = () => {
		F(null), t.extensions.openStore("preset");
	}, $ = (n) => /* @__PURE__ */ e.createElement("div", {
		key: n.id,
		className: i.row,
		onMouseEnter: (e) => {
			u({
				id: n.id,
				anchor: e.currentTarget
			}), R(K(n.params), n.paramBag);
		},
		onMouseLeave: () => {
			u((e) => e?.id === n.id ? null : e), R(null);
		},
		onContextMenu: (e) => {
			e.preventDefault(), R(null), u(null), k({
				preset: n,
				x: e.clientX,
				y: e.clientY
			});
		}
	}, /* @__PURE__ */ e.createElement("button", {
		onClick: () => {
			R(null), L(K(n.params), n.paramBag);
		},
		className: i.apply
	}, n.name), /* @__PURE__ */ e.createElement("button", {
		onClick: () => void Z(n),
		className: i.delete,
		title: "Delete preset"
	}, "✕"), l?.id === n.id && /* @__PURE__ */ e.createElement(C, {
		name: n.name,
		diffs: [...t.presets.summarize(n.params), ...t.presets.describeBag(n.paramBag).map((e) => ({
			label: e,
			value: "adjusted"
		}))],
		anchor: l.anchor
	}));
	return /* @__PURE__ */ e.createElement(n, {
		title: "Presets",
		defaultOpen: !1
	}, /* @__PURE__ */ e.createElement("div", { className: i.toolbar }, /* @__PURE__ */ e.createElement(a, {
		variant: "secondary",
		size: "sm",
		style: w,
		onClick: () => _(!0)
	}, "Save preset…"), /* @__PURE__ */ e.createElement(a, {
		variant: "secondary",
		size: "sm",
		style: w,
		onClick: ne
	}, "Import"), /* @__PURE__ */ e.createElement(a, {
		variant: "secondary",
		size: "sm",
		style: w,
		onClick: J
	}, "Export")), /* @__PURE__ */ e.createElement("div", {
		role: "status",
		"aria-live": "polite"
	}, P && /* @__PURE__ */ e.createElement("div", { className: i.notice }, /* @__PURE__ */ e.createElement("div", { className: i.noticeBody }, /* @__PURE__ */ e.createElement("p", null, P.text), P.offerStore && /* @__PURE__ */ e.createElement("button", {
		onClick: re,
		className: i.noticeLink
	}, "Browse importers")), /* @__PURE__ */ e.createElement("button", {
		onClick: () => F(null),
		title: "Dismiss",
		"aria-label": "Dismiss",
		className: i.dismiss
	}, "✕"))), z.length === 0 ? /* @__PURE__ */ e.createElement("p", { className: i.empty }, "No saved presets") : /* @__PURE__ */ e.createElement("div", { className: i.sections }, X.ungrouped.length > 0 && /* @__PURE__ */ e.createElement("div", { className: i.rows }, X.ungrouped.map($)), X.named.map(({ group: t, items: n }) => {
		let r = M.has(t);
		return /* @__PURE__ */ e.createElement("div", { key: t }, /* @__PURE__ */ e.createElement("button", {
			onClick: () => N((e) => {
				let n = new Set(e);
				return n.has(t) ? n.delete(t) : n.add(t), n;
			}),
			className: i.groupHeader
		}, /* @__PURE__ */ e.createElement("span", { className: i.caret }, r ? "▸" : "▾"), /* @__PURE__ */ e.createElement("span", { className: i.groupName }, t), /* @__PURE__ */ e.createElement("span", { className: i.count }, n.length)), !r && /* @__PURE__ */ e.createElement("div", { className: i.rows }, n.map($)));
	})), O && /* @__PURE__ */ e.createElement(r, {
		x: O.x,
		y: O.y,
		items: [
			{
				label: "Rename…",
				onClick: () => x(O.preset)
			},
			{
				label: "Move to group…",
				onClick: () => D(O.preset)
			},
			{
				label: "Update with current settings",
				onClick: () => y(O.preset)
			},
			{
				label: "Export…",
				onClick: () => t.presets.exportFile(O.preset.name, O.preset.params, O.preset.group, O.preset.paramBag)
			},
			"separator",
			{
				label: "Delete",
				danger: !0,
				onClick: () => void Z(O.preset)
			}
		],
		onClose: () => k(null)
	}), d && /* @__PURE__ */ e.createElement(E, {
		groups: Y,
		onSave: (e) => {
			_(!1), Q(e);
		},
		onCancel: () => _(!1)
	}), v && /* @__PURE__ */ e.createElement(E, {
		groups: Y,
		initialName: v.name,
		initialGroup: v.group,
		saveLabel: "Update preset",
		onSave: (e) => {
			V(v.id, e.params, e.group, e.paramBag), z.some((t) => t.id !== v.id && t.name.toLowerCase() === e.name.toLowerCase()) || H(v.id, e.name), y(null);
		},
		onCancel: () => y(null)
	}), b && /* @__PURE__ */ e.createElement(m, {
		initialName: b.name,
		validate: (e) => z.some((t) => t.id !== b.id && t.name.toLowerCase() === e.toLowerCase()) ? "A preset with this name already exists." : null,
		onRename: (e) => {
			H(b.id, e), x(null);
		},
		onCancel: () => x(null)
	}), S && /* @__PURE__ */ e.createElement(f, {
		initialGroup: S.group,
		groups: Y,
		onMove: (e) => {
			U(S.id, e), D(null);
		},
		onCancel: () => D(null)
	}), A && /* @__PURE__ */ e.createElement(p, {
		name: A.pending.name,
		onOverwrite: () => {
			V(A.existingId, A.pending.params, A.pending.group, A.pending.paramBag), j(null);
		},
		onSaveAsNew: () => {
			B(h(z, A.pending.name), A.pending.params, A.pending.group, A.pending.paramBag), j(null);
		},
		onCancel: () => j(null)
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
		},
		modules: ["develop"]
	});
}
//#endregion
export { O as PANEL_ID, k as STYLESHEET_ID, A as activate };

//# sourceMappingURL=index.js.map