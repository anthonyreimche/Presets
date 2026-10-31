// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { React } from "./rt";
import { cls } from "./styles";

interface Props {
  initialGroup?: string;
  /** Existing group names, offered as autocomplete. */
  groups: string[];
  /** Empty string moves the preset to the ungrouped section. */
  onMove: (group: string) => void;
  onCancel: () => void;
}

/** Single-field modal for moving a preset to another group. Typing a new name
 *  creates the group; clearing the field (or "Ungrouped") removes the grouping. */
export function PresetMoveDialog({ initialGroup, groups, onMove, onCancel }: Props) {
  const [group, setGroup] = React.useState(initialGroup ?? "");
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => inputRef.current?.select(), []);

  const submit = () => onMove(group.trim());

  return (
    <div
      className={cls.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={cls.card}>
        <div className={cls.fields}>
          <div className={cls.dialogHeading}>Move to group</div>
          <input
            ref={inputRef}
            type="text"
            value={group}
            placeholder="Group (leave empty for ungrouped)"
            aria-label="Preset group"
            list="preset-move-groups"
            onChange={(e) => setGroup(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") onCancel();
            }}
            className={cls.input}
          />
          <datalist id="preset-move-groups">
            {groups.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
        </div>
        <div className={`${cls.actions} ${cls.actionsBar}`}>
          <button className={`${cls.button} ${cls.secondary}`} onClick={onCancel}>
            Cancel
          </button>
          <button className={`${cls.button} ${cls.primary}`} onClick={submit}>
            Move
          </button>
        </div>
      </div>
    </div>
  );
}
