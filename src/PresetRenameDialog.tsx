// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { React } from "./rt";
import { cls } from "./styles";

interface Props {
  initialName: string;
  /** Return an error string for an invalid name (e.g. collision), else null. */
  validate?: (name: string) => string | null;
  onRename: (name: string) => void;
  onCancel: () => void;
}

/** Single-field modal for renaming a preset. Mirrors the app's modal pattern. */
export function PresetRenameDialog({ initialName, validate, onRename, onCancel }: Props) {
  const [name, setName] = React.useState(initialName);
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => inputRef.current?.select(), []);

  const trimmed = name.trim();
  const error = validate?.(trimmed) ?? null;
  const canSave = trimmed.length > 0 && !error;
  const submit = () => {
    if (canSave) onRename(trimmed);
  };

  return (
    <div
      className={cls.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={cls.card}>
        <div className={cls.fields}>
          <div className={cls.dialogHeading}>Rename preset</div>
          <input
            ref={inputRef}
            type="text"
            value={name}
            placeholder="Preset name"
            aria-label="Preset name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") onCancel();
            }}
            className={cls.input}
          />
          {error && <div className={cls.error}>{error}</div>}
        </div>
        <div className={`${cls.actions} ${cls.actionsBar}`}>
          <button className={`${cls.button} ${cls.secondary}`} onClick={onCancel}>
            Cancel
          </button>
          <button disabled={!canSave} className={`${cls.button} ${cls.primary}`} onClick={submit}>
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}
