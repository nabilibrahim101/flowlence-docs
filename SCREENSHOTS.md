# Screenshot Style Guide

This file is for **authors of the Flowlence Learn tutorial**, not for students. It defines how to capture and name screenshots so the site looks consistent across dozens of pages and contributors.

> Keep this file out of MkDocs' `nav:` — it lives at the repo root and is for contributors only.

---

## The three kinds of screenshots

The tutorial uses three categories of images, and each has different rules:

| Category | What it shows | Who captures |
|----------|---------------|--------------|
| **App screenshots** | Flowlence Code window — blocks, code panel, Serial Monitor, UI elements | Nabil / Flowlence team |
| **Wiring diagrams** | Illustrated circuit (breadboard drawing) | Illustrator using Fritzing or similar — *not* a photo |
| **Wiring photos** | Real hardware, real wires, real breadboard | Nabil / kit assembler |

Don't mix: a page that shows a Fritzing diagram should not also have a photo of the same setup — pick one, the diagram.

---

## 1. App screenshots (Flowlence Code)

These are the most numerous and the most fragile — if the window size, theme, or cropping drifts between pages, the docs look amateur.

### Capture setup (do this once)

- **Window size:** resize Flowlence Code to exactly **1440 × 900**. Don't full-screen; don't maximise.

    Why: 1440 × 900 captures at retina density give us a sharp 2880 × 1800 image that scales down cleanly and matches the proportions of a mid-size laptop.

- **Theme:** use Flowlence Code's **default (light) theme** for every screenshot. Dark-theme captures look cool but mix badly with MkDocs Material's light-mode default.

- **Project state:** always start from a blank new project. No device connected (or *ESP32* shown if relevant). No stray blocks in the workspace from a previous capture.

- **Zoom level:** set the workspace zoom so 3–6 blocks fit comfortably in the frame. Use the `+` / `−` buttons bottom-right of the workspace.

### What to capture

| Screenshot type | What's in the frame | Example filename |
|-----------------|---------------------|------------------|
| Full window | Whole app UI | `getting-started/interface-overview.png` |
| Toolbox focus | Toolbox + one category expanded | `sensors/block-basics-toolbox.png` |
| Block stack | Just the block stack (cropped to blocks) | `sensors/dht11-blocks.png` |
| Block + code panel | Block stack on left, generated code on right | `sensors/dht11-blocks-with-code.png` |
| Serial Monitor | Bottom-right panel with visible output | `sensors/dht11-serial-output.png` |
| Upload button | Close crop of upload button / progress | `getting-started/first-program-upload.png` |

### Cropping rules

- **Full-window shots:** no crop; include title bar.
- **Block-stack shots:** crop tightly, leave ~40 px of grey workspace margin around the blocks on all sides.
- **Multi-panel shots (blocks + code):** crop to the two panels; don't include the toolbox unless it's the point.
- **Never** include your Windows taskbar, mouse cursor, or another app poking in from the edge.

### Annotations (arrows, highlights)

Keep them minimal. Use **one colour** (the Flowlence orange `#F7862F` is already in the theme) for all arrows and circles across the whole tutorial.

Tools that make this easy: **ShareX** (free, Windows), **Greenshot** (free), **Snagit** (paid). Don't annotate in Paint — the arrow styling is inconsistent.

### Export format

- **Format:** PNG, not JPG (block colours compress poorly in JPG).
- **Max width:** 1920 px. If your native capture is larger, resize.
- **File size:** aim under 400 KB. If heavier, run through [TinyPNG](https://tinypng.com/) before committing.

---

## 2. Wiring diagrams

These are **drawings**, not photos. They show the student what goes where, stripped of real-world clutter.

### Tooling

- **Fritzing** ([fritzing.org](https://fritzing.org)) — the de-facto standard for this kind of illustration. One-time €8 donation.
- Alternative: hand-draw in draw.io / Figma using the Fritzing SVG assets.

### Style

- Use the **wire colours from the [Pin Map](docs/sensors/pin-map.md)**: red for power, black for ground, yellow for signal, etc. Every diagram in the tutorial must follow this colour code.
- Put the **ESP32 on the left**, components on the right or above.
- Label every wire with its colour in a legend (not on the wire itself).
- Use a **breadboard view** for beginner diagrams, schematic view only for advanced pages.

### Export

- SVG where possible (scales cleanly for zoom), PNG at 1920 × 1080 as a fallback.

---

## 3. Wiring photos

Only for pages where the physical hardware matters (sensor close-ups, kit overview, "what the DHT11 actually looks like on a breadboard").

### Setup

- **Background:** plain white or very light grey. A sheet of printer paper works. Never a wood desk, keyboard, or cluttered surface.
- **Lighting:** diffused, from above or the side — no direct glare on the LCD or any shiny chip package.
- **Angle:** 90° top-down for wiring shots; slight 3/4 angle for component-identification shots.
- **Focus:** the component or wire in question must be in sharp focus.

### Export

- Crop tight. No one cares about the edge of your desk.
- JPG at 85% quality is fine for photos (unlike app screenshots).

---

## File structure and naming

```
docs/
└── images/
    ├── placeholder.svg          ← the shared "Screenshot pending" placeholder
    ├── getting-started/
    │   ├── install-welcome.png
    │   ├── install-location.png
    │   ├── interface-overview.png
    │   ├── interface-toolbox.png
    │   ├── first-program-blocks.png
    │   └── first-program-upload.png
    ├── sensors/
    │   ├── led-photo.jpg
    │   ├── led-wiring.svg
    │   ├── led-blocks-basic.png
    │   ├── led-blocks-pwm.png
    │   ├── dht11-photo.jpg
    │   ├── dht11-wiring.svg
    │   ├── dht11-blocks.png
    │   └── dht11-serial-output.png
    └── projects/
        ├── weather-station-wiring.svg
        ├── weather-station-stage1.png
        ├── weather-station-stage2.png
        ├── weather-station-stage3.png
        └── weather-station-lcd-photo.jpg
```

### Naming rules

1. **Kebab-case**, all lowercase: `dht11-blocks.png`, not `DHT11_Blocks.PNG`.
2. **Prefix with the page name**: a screenshot for the DHT11 page starts with `dht11-…`.
3. **Suffix with the kind**: `-blocks`, `-wiring`, `-photo`, `-serial-output`, `-upload`, `-stage1/2/3`.
4. **Sub-folder matches the doc section**: files for a page in `docs/sensors/` live under `docs/images/sensors/`.

Once an image is checked in with a name, **don't rename it** — every `![alt](path)` in every `.md` file would need updating.

---

## Replacing the placeholder

Every page that has `![some alt](../images/placeholder.svg)` is waiting for a real screenshot. Workflow:

1. Capture the real image following the rules above.
2. Save it to the right `docs/images/<section>/` sub-folder with a proper name.
3. In the markdown file, change:
   ```markdown
   ![DHT11 blocks — read temperature & humidity and print them](../images/placeholder.svg)
   ```
   to:
   ```markdown
   ![DHT11 blocks — read temperature & humidity and print them](../images/sensors/dht11-blocks.png)
   ```
4. Preview at `http://127.0.0.1:8000` (run `python -m mkdocs serve` from the repo root) to confirm the image displays and looks right.

---

## Accessibility

Always write meaningful **alt text** (the `![alt]` part). A student using a screen reader should get the point from the alt text alone.

- ❌ `![image](...)` — meaningless
- ❌ `![DHT11 screenshot](...)` — barely better
- ✅ `![DHT11 blocks — read temperature & humidity and print them to the Serial Monitor](...)` — describes what's in it

---

## Summary

- Flowlence Code window: **1440 × 900, light theme, cropped cleanly, PNG**.
- Wiring: **Fritzing diagram first**, photo only if needed.
- Filenames: `section/page-kind.ext`, kebab-case.
- When in doubt, match the exemplar pages: [sensors/dht11.md](docs/sensors/dht11.md) and [projects/weather-station.md](docs/projects/weather-station.md).
