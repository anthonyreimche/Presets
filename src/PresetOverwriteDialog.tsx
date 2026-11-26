// Safelight — founded and principally authored by Anthony Reimche.
// Copyright (C) 2026 Anthony Reimche. Licensed under the GNU GPL v3 with an
// attribution-preservation term (GPL v3 §7b) — see LICENSE. This notice must
// be preserved in derived versions.

import { React, api } from "./rt";
import { cls } from "./styles";

interface Props {
  name: string;
  onOverwrite: () => void;
  onSaveAsNew: () => void;
  onCancel: () => void;
}

/** Shown when saving a preset whose name already exists. Modelled on the app's
 *  modal pattern. */
export function PresetOverwriteDialog({ name, onOverwrite, onSaveAsNew, onCancel }: Props) {
  const { Button } = api.ui;
  React.useEffect(() => api.ui.onEscape(onCancel), [onCancel]);

  return (
    <div
      className={cls.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={`${cls.card} ${cls.cardPadded}`}>
        <p className={cls.message}>A preset named &ldquo;{name}&rdquo; already exists.</p>
        <div className={cls.actions}>
          <Button variant="primary" onClick={onOverwrite}>
            Overwrite
          </Button>
          <Button variant="secondary" onClick={onSaveAsNew}>
            Save as new
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
