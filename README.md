# Presets for Safelight

The Develop **Presets** panel: save the adjustments of the photo you are
editing as a preset, and apply them to other photos.

- **Save preset…:** name the preset, optionally put it in a group, and tick
  the adjustments it should carry. Changed adjustments are ticked for you;
  per-image edits such as crop show under **Show all**. A preset can carry as
  little as one slider.
- **Apply:** hover a preset to preview it on the photo and see what it
  changes; click it to apply. A preset only changes the adjustments it
  carries and keeps the photo's own process version.
- **Import / Export:** read and write Safelight's JSON preset files. Other
  apps' presets (Lightroom `.xmp`, `.lrtemplate`) import through an
  importer extension; when none is installed the panel says so and offers
  the Extensions store.
- **Right-click a preset** to rename it, move it to a group, update it with
  the current settings, export it or delete it.

Until Safelight 3.2.0 this panel was built in. It keeps the built-in panel's
id (`core.presets`), so layouts saved before then keep it where it was. The
presets themselves stay in Safelight, as do the file formats and importers,
so nothing is lost when the extension is disabled.

## Development

```bash
npm install
npm run typecheck
npm run build    # dist/index.js, the file Safelight loads
npm test         # vitest; the bundle checks read dist/, so build first
npm run check    # all three, in that order
```

Safelight hands the extension its own React through `api.react`, so the
bundle never includes React. `src/safelight.d.ts` mirrors the part of the
app's extension API the extension uses.

## License

GPL-3.0-only with an attribution term (GPL v3 §7b), the same licence as Safelight; see LICENSE. Copyright (C) 2026 Anthony Reimche.
