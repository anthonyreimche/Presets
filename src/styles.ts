// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

// The look core gave the Presets panel, its dialogues and its tooltip with
// Tailwind utilities, as plain CSS (the app's Tailwind build never scans an
// extension). `:where()` drops every rule to zero specificity, so a stylesheet
// that restyles buttons or inputs wins over them as it wins over core's
// layered utilities. The `html.sl-larger-text` and `html.sl-title-headings`
// rules repeat core's Accessibility rules for 10 px, 11 px and uppercase text.

import type { UiTokens } from "./safelight";

const P = "safelight-presets";

export const cls = {
  toolbar: `${P}-toolbar`,
  save: `${P}-save`,
  tool: `${P}-tool`,
  notice: `${P}-notice`,
  noticeBody: `${P}-notice-body`,
  noticeLink: `${P}-notice-link`,
  dismiss: `${P}-dismiss`,
  empty: `${P}-empty`,
  sections: `${P}-sections`,
  rows: `${P}-rows`,
  groupHeader: `${P}-group-header`,
  caret: `${P}-caret`,
  groupName: `${P}-group-name`,
  count: `${P}-count`,
  row: `${P}-row`,
  apply: `${P}-apply`,
  delete: `${P}-delete`,
  backdrop: `${P}-backdrop`,
  card: `${P}-card`,
  cardPadded: `${P}-card-padded`,
  cardSave: `${P}-card-save`,
  message: `${P}-message`,
  fields: `${P}-fields`,
  fieldsDivided: `${P}-fields-divided`,
  dialogHeading: `${P}-dialog-heading`,
  input: `${P}-input`,
  error: `${P}-error`,
  actions: `${P}-actions`,
  actionsBar: `${P}-actions-bar`,
  button: `${P}-button`,
  primary: `${P}-primary`,
  danger: `${P}-danger`,
  secondary: `${P}-secondary`,
  secondaryLift: `${P}-secondary-lift`,
  include: `${P}-include`,
  showAll: `${P}-show-all`,
  fieldList: `${P}-field-list`,
  fieldEmpty: `${P}-field-empty`,
  field: `${P}-field`,
  fieldLabel: `${P}-field-label`,
  fieldTag: `${P}-field-tag`,
  fieldValue: `${P}-field-value`,
  tooltip: `${P}-tooltip`,
  tipName: `${P}-tip-name`,
  tipRule: `${P}-tip-rule`,
  tipList: `${P}-tip-list`,
  tipRow: `${P}-tip-row`,
  tipLabel: `${P}-tip-label`,
  tipValue: `${P}-tip-value`,
} as const;

const SHADOW_XL = "0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a";
const TRUNCATE = "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";

const TEXT_10 = [cls.tool, cls.notice, cls.empty, cls.groupHeader, cls.dialogHeading, cls.error, cls.include, cls.fieldTag];
const TEXT_11 = [cls.save, cls.row, cls.button, cls.fieldEmpty, cls.field, cls.tooltip];
const UPPERCASE = [cls.groupHeader, cls.dialogHeading, cls.include];

const any = (classes: readonly string[]) => classes.map((c) => `html.sl-larger-text .${c}`).join(", ");

/** `color: inherit` stands where core names `--color-text` or
 *  `--color-text-tertiary`: neither variable exists, so core's declarations
 *  resolve to the inherited colour, placeholders included. */
export function presetsCss(t: UiTokens): string {
  return `
:where(.${cls.toolbar}) { margin-bottom: 0.5rem; display: flex; gap: 0.25rem; }
:where(.${cls.save}) { flex: 1; border-radius: 0.25rem; background-color: ${t.surface3}; padding: 0.25rem 0.5rem; font-size: 11px; color: ${t.textSecondary}; }
:where(.${cls.tool}) { flex: 1; border-radius: 0.25rem; background-color: ${t.surface2}; padding: 0.25rem 0.5rem; font-size: 10px; color: ${t.textSecondary}; }
:where(.${cls.notice}) { margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.375rem; border-radius: 0.25rem; background-color: ${t.surface2}; padding: 0.375rem 0.5rem; font-size: 10px; line-height: 1.375; color: ${t.textSecondary}; }
:where(.${cls.noticeBody}) { min-width: 0; flex: 1; }
:where(.${cls.noticeLink}) { margin-top: 0.25rem; color: ${t.sliderFill}; }
:where(.${cls.dismiss}) { color: ${t.textMuted}; }
:where(.${cls.empty}) { font-size: 10px; color: ${t.textMuted}; }
:where(.${cls.sections} > :not(:last-child)) { margin-block: 0 0.25rem; }
:where(.${cls.rows} > :not(:last-child)) { margin-block: 0 0.125rem; }
:where(.${cls.groupHeader}) { display: flex; width: 100%; align-items: center; gap: 0.25rem; padding: 0.125rem 0.25rem; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.025em; color: ${t.textMuted}; }
:where(.${cls.caret}) { display: inline-block; width: 0.75rem; }
:where(.${cls.groupName}) { ${TRUNCATE} }
:where(.${cls.count}) { margin-left: auto; font-variant-numeric: tabular-nums; opacity: 0.6; }
:where(.${cls.row}) { position: relative; display: flex; align-items: center; justify-content: space-between; border-radius: 0.25rem; padding: 0.25rem 0.5rem; font-size: 11px; color: ${t.textSecondary}; }
:where(.${cls.apply}) { min-width: 0; flex: 1; ${TRUNCATE} text-align: left; }
:where(.${cls.delete}) { margin-left: 0.25rem; color: ${t.textMuted}; opacity: 0; }

:where(.${cls.backdrop}) { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; background-color: #00000080; }
:where(.${cls.card}) { width: 320px; border-radius: 0.5rem; border: 1px solid ${t.border}; background-color: ${t.surface1}; box-shadow: ${SHADOW_XL}; }
:where(.${cls.cardPadded}) { padding: 1rem; }
:where(.${cls.cardSave}) { display: flex; max-height: 80vh; width: 360px; flex-direction: column; }
:where(.${cls.message}) { margin-bottom: 1rem; font-size: 12px; color: inherit; }
:where(.${cls.fields}) { padding: 0.75rem; }
:where(.${cls.fields} > :not(:last-child)) { margin-block: 0 0.5rem; }
:where(.${cls.fieldsDivided}) { border-bottom: 1px solid ${t.border}; }
:where(.${cls.dialogHeading}) { font-size: 10px; text-transform: uppercase; letter-spacing: 0.025em; color: inherit; }
:where(.${cls.input}) { width: 100%; border-radius: 0.25rem; background-color: ${t.surface2}; padding: 0.25rem 0.5rem; font-size: 12px; color: inherit; }
:where(.${cls.input})::placeholder { color: inherit; }
:where(.${cls.input}:focus) { outline-style: none; }
:where(.${cls.error}) { font-size: 10px; color: ${t.labelRed}; }
:where(.${cls.actions}) { display: flex; justify-content: flex-end; gap: 0.5rem; }
:where(.${cls.actionsBar}) { border-top: 1px solid ${t.border}; padding: 0.75rem; }
:where(.${cls.button}) { border-radius: 0.25rem; padding: 0.25rem 0.75rem; font-size: 11px; }
:where(.${cls.primary}) { background-color: ${t.accent}; font-weight: 500; color: ${t.white}; }
:where(.${cls.danger}) { background-color: ${t.labelRed}; font-weight: 500; color: ${t.white}; }
:where(.${cls.secondary}) { background-color: ${t.surface2}; color: ${t.textSecondary}; }
:where(.${cls.include}) { display: flex; align-items: center; justify-content: space-between; padding: 0.375rem 0.75rem; font-size: 10px; text-transform: uppercase; letter-spacing: 0.025em; color: inherit; }
:where(.${cls.showAll}) { display: flex; cursor: pointer; align-items: center; gap: 0.25rem; text-transform: none; }
:where(.${cls.fieldList}) { min-height: 0; flex: 1; overflow-y: auto; padding: 0 0.5rem 0.5rem; }
:where(.${cls.fieldEmpty}) { padding: 0.5rem 0.25rem; font-size: 11px; color: inherit; }
:where(.${cls.field}) { display: flex; cursor: pointer; align-items: center; gap: 0.5rem; border-radius: 0.25rem; padding: 0.25rem; font-size: 11px; color: ${t.textSecondary}; }
:where(.${cls.fieldLabel}) { min-width: 0; flex: 1; ${TRUNCATE} }
:where(.${cls.fieldTag}) { flex-shrink: 0; font-size: 10px; color: inherit; }
:where(.${cls.fieldValue}) { flex-shrink: 0; font-variant-numeric: tabular-nums; color: inherit; }

:where(.${cls.tooltip}) { pointer-events: none; position: fixed; z-index: 1000; width: 12rem; border-radius: 0.25rem; border: 1px solid ${t.border}; background-color: ${t.surface1}; padding: 0.5rem; font-size: 11px; box-shadow: ${SHADOW_XL}; }
:where(.${cls.tipName}) { margin-bottom: 0.25rem; ${TRUNCATE} font-weight: 600; color: inherit; }
:where(.${cls.tipRule}) { margin-bottom: 0.25rem; border-top: 1px solid ${t.border}; }
:where(.${cls.tipList}) { display: flex; flex-direction: column; gap: 0.125rem; }
:where(.${cls.tipRow}) { display: flex; justify-content: space-between; gap: 0.5rem; }
:where(.${cls.tipLabel}) { ${TRUNCATE} color: ${t.textSecondary}; }
:where(.${cls.tipValue}) { flex-shrink: 0; font-variant-numeric: tabular-nums; color: inherit; }

@media (hover: hover) {
  :where(.${cls.save}:hover) { background-color: ${t.surface4}; color: ${t.textPrimary}; }
  :where(.${cls.tool}:hover) { background-color: ${t.surface3}; color: ${t.textPrimary}; }
  :where(.${cls.noticeLink}:hover) { text-decoration-line: underline; }
  :where(.${cls.dismiss}:hover) { color: ${t.textPrimary}; }
  :where(.${cls.groupHeader}:hover) { color: ${t.textSecondary}; }
  :where(.${cls.row}:hover) { background-color: ${t.surface2}; }
  :where(.${cls.apply}:hover) { color: ${t.textPrimary}; }
  :where(.${cls.delete}:hover) { color: ${t.labelRed}; }
  :where(.${cls.row}:hover .${cls.delete}) { opacity: 1; }
  :where(.${cls.primary}:hover, .${cls.danger}:hover) { opacity: 0.9; }
  :where(.${cls.secondary}:hover) { background-color: ${t.surface3}; }
  :where(.${cls.secondaryLift}:hover) { color: inherit; }
  :where(.${cls.field}:hover) { background-color: ${t.surface2}; }
}
:where(.${cls.primary}:disabled) { cursor: not-allowed; opacity: 0.4; }

${any(TEXT_10)} { font-size: 12px !important; }
${any(TEXT_11)} { font-size: 13px !important; line-height: 1.45 !important; }
${any(UPPERCASE)} { text-transform: none !important; }
${UPPERCASE.map((c) => `html.sl-title-headings .${c}`).join(", ")} { text-transform: capitalize !important; }
`;
}
