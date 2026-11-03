// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { React } from "./rt";
import { cls } from "./styles";

interface Props {
  name: string;
  onDelete: () => void;
  onCancel: () => void;
}

/** Confirmation shown before deleting a preset. Modelled on the app's modal
 *  pattern (see PresetOverwriteDialog). */
export function PresetDeleteDialog({ name, onDelete, onCancel }: Props) {
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      className={cls.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={`${cls.card} ${cls.cardPadded}`}>
        <p className={cls.message}>
          Delete the preset &ldquo;{name}&rdquo;? This can&rsquo;t be undone.
        </p>
        <div className={cls.actions}>
          <button className={`${cls.button} ${cls.danger}`} onClick={onDelete}>
            Delete
          </button>
          <button className={`${cls.button} ${cls.secondary}`} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
