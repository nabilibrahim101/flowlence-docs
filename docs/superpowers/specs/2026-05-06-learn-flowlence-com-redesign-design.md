# learn.flowlence.com co-brand redesign · design spec

**Date:** 2026-05-06
**Status:** approved through brainstorming, awaiting user review of this spec
**Implementation:** to be planned via the `superpowers:writing-plans` skill after this spec is approved

---

## 1. Goal

Replace the current generic-MkDocs-Material visual identity of `learn.flowlence.com` with a polished co-branded design that reflects the Flowlence × BGC partnership. The partnership is contractually exclusive for 5 years: Flowlence builds and operates the site; BGC schools are its only audience; the same partnership will host Brilliant Academy curriculum once that product launches. The visual identity must read as **both brands together** without either dominating, and must scale beyond BGC competition material as Brilliant Academy expands the site's content.

## 2. Constraints

- **No marketing-site palette drift.** Flowlence's separate B2B work lives at `flowlence.com` and stays untouched. Decisions here only apply to `learn.flowlence.com`.
- **MkDocs Material as the substrate.** We're customizing Material via `extra.css`, `extra_javascript`, `overrides/`, and per-page front matter. We are not switching to a different static-site generator.
- **Auto-deploy stays simple.** Edits land at the live site within ~45 seconds via the existing GitHub Actions workflow. No new build steps that fight that loop.
- **Performance.** All web fonts must load via Google Fonts (no self-hosted heavyweight assets). Total CSS additions stay under ~50 KB. No JS dependencies.
- **Direction:** "Workshop" — energetic, student-facing, BGC tone forward. Not "Studio" (calm/Stripe-like) or "Atelier" (editorial/serif).

## 3. Out of scope (this spec)

- Marketing copy rewrites (the spec defines tone, but actual rewrites of project pages happen in implementation chunks)
- New imagery / photography sourcing (we use the assets already in the repo: `city-model.png`, `brilliant-smart-city-kit.png`, the BGC wordmark)
- Internationalization
- A separate Brilliant Academy "skin" (the spec leaves room for it without building it)

---

## 4. Section 1 · Brand foundation

### 4.1 Palette · with attribution

The palette splits into three zones. **Each color belongs to exactly one zone** — no overlap means no ambiguity about who owns what.

#### Flowlence-owned (`--flowlence-*`)

| Token | Hex | Use |
|---|---|---|
| `--flowlence-orange` | `#F7862F` | Flowlence-only accents (primary buttons, link underlines on Flowlence-only sections) |
| `--flowlence-cream` | `#FFF7E6` | Background washes, hero backgrounds, soft surfaces |
| `--flowlence-slate` | `#0F172A` | Text, dark-mode chrome, code-block background |

These are already in use on `flowlence.com` — not invented for this site.

#### Shared / Ribbon (`--ribbon-*`)

| Token | Definition | Use |
|---|---|---|
| `--ribbon-gradient` | `linear-gradient(90deg, #F7862F 0%, #F8568D 50%, #C026D3 100%)` | Hero emphasis lines, primary CTAs, header bottom-border, achievement moments |
| `--ribbon-gradient-soft` | `linear-gradient(135deg, #FFF7E6 0%, #FFFFFF 50%, #FFE8F0 100%)` | Try-it card backgrounds, soft hero backgrounds |

The ribbon directly references BGC's wordmark gradient — it IS the partnership signature.

#### BGC-owned (`--bgc-*`)

| Token | Hex | Use |
|---|---|---|
| `--bgc-coral` | `#F8568D` | Gradient mid-stop, BGC-only accents |
| `--bgc-magenta` | `#C026D3` | Gradient end-stop, BGC competition badges |
| `--bgc-blush` | `#FFE8F0` | Soft surfaces in BGC-themed sections |

Sampled directly from the BGC wordmark gradient (`BGC.webp`) — not invented.

### 4.2 Pillar colors (`--pillar-*`)

Used only on individual project section pages — see Section 4.

| Token | Hex | Project |
|---|---|---|
| `--pillar-agriculture` | `#16A34A` (emerald) | Smart Agriculture · Sustainability |
| `--pillar-parking` | `#2563EB` (royal blue) | Smart Parking · Mobility |
| `--pillar-safety` | `#DC2626` (deep red) | Smart Safety · Protection |
| `--pillar-temperature` | `#0D9488` (teal) | Smart Temperature · Comfort |

Cool / distinct / culturally meaningful and deliberately outside the warm orange-pink ribbon's hue range.

### 4.3 Typography

- **Display face:** Inter Tight, weights 800 and 900, with letter-spacing `-0.025em` to `-0.035em`. Used for h1 and h2.
- **Body face:** Inter, weights 400 (regular) and 600 (semibold). Used for body, h3, h4, links.
- **Mono face:** JetBrains Mono (or system fallback). Used for code blocks and inline code.
- **Font loading:** single Google Fonts request loading both Inter and Inter Tight in the weights actually used. No additional font requests.

### 4.4 Ribbon usage rules

| ✓ Used for | ✗ Not used for |
|---|---|
| Hero headline emphasis line (one phrase only per page) | Body text |
| Primary CTAs (Start Part 1, Begin building, Download) | Secondary CTAs (those use `--flowlence-orange` or pillar color) |
| Header bottom-border (3px, on every page) | Navigation links |
| Achievement / success cards | Code blocks |
| Numbered-step badges (1, 2, 3 with interpolated stops) | Wallpaper / large background washes |
| Try-it challenge card backgrounds (soft gradient variant) | Sensor diagrams / wiring photos |

The discipline: a visitor should be able to find the ribbon on a page in <1 second by skim. If gradient is everywhere, it stops meaning anything.

---

## 5. Section 2 · Site chrome

### 5.1 Header

A single-row header on every page:

```
[ bgc | Flowlence Learn ]   [ Home  Getting Started  Smart Agriculture  Smart Parking  Smart Safety  Smart Temperature ]   [ 🔍 Search ] [ ☀️ ]
```

- **Lockup (left):**
  - "bgc" wordmark in stylized lowercase italic, 1.5rem, weight 900, with the ribbon gradient applied as a CSS text-clip
  - 1px vertical divider, 22px tall, color `#cbd5e1` (light) / `#334155` (dark)
  - "Flowlence Learn" in Inter Tight 800, 1.05rem, slate (light) / cream (dark), letter-spacing `-0.02em`
  - Equal vertical weight; both clickable, both link to `/`
- **Navigation (center):** flat list of top-level sections, no dropdowns. Active section uses pillar color (when on a project) or slate-bold (Home / Getting Started). Material's `navigation.tabs` feature drives this.
- **Right cluster:** search input, theme toggle. Both use Material's defaults; we restyle to match.
- **Bottom border:** 3px tall, full ribbon gradient. Always visible. The partnership signature on every page.
- **Background:** white in light mode, slate in dark mode. The ribbon below stays full color regardless of mode.

### 5.2 Footer

- **Top edge:** 2px ribbon gradient at 40% opacity (softer than the header's), as a transition into the footer.
- **Lockup row:** same `bgc | Flowlence Learn` lockup as the header, slightly smaller (1.25rem/0.95rem).
- **Three link columns:** *About* (Brilliant Global Competitions, Flowlence, Contact), *Resources* (Download Flowlence Code, Brilliant Smart City Kit, Troubleshooting), *For Educators* (Become a participating school, Coach materials).
- **Copyright row:** "© 2026 Flowlence Inc. · in partnership with Brilliant Global Competitions" + URL. No "Made with Material for MkDocs" attribution.

### 5.3 Dark mode

Same structure throughout. Backgrounds switch to `--flowlence-slate` and `#1e293b`. Text becomes cream `#f1f5f9`. Pillar colors keep their hex values (they're already chosen to work on both backgrounds). The ribbon stays at full saturation.

---

## 6. Section 3 · Home page hero

### 6.1 Above-the-fold layout

Two-column at desktop (60/40 text/image), stacked at <900px viewport. Sits on a soft ribbon-gradient background (`--ribbon-gradient-soft`).

### 6.2 Elements top-to-bottom (left column)

1. **Competition badge:** `⚡ Brilliant Global Competition · 2026–27` — pill shape, BGC magenta text on a 8% magenta tint background, magenta border. Always present unless/until the badge content needs to change for Brilliant Academy.
2. **Headline (two lines):**
   - Line 1, slate weight 900: *"Build a smart city."*
   - Line 2, ribbon gradient text-clip, weight 900: *"Block by block."*
   - 3.6rem on desktop, scales down at smaller viewports
3. **Sub-headline:** one paragraph, 1.15rem, slate-medium color. Three concrete promises: "Drag-and-drop programming, real ESP32 hardware, and a competition that spans 4 continents."
4. **CTAs (two):**
   - Primary: ribbon-gradient button, "Start Part 1 →"
   - Secondary: outlined slate button, "Meet your kit"
5. **Trust line:** "Grades 10–12 · about 10 hours · no prior coding experience needed", with three orange/coral/magenta dots above.

### 6.3 Right column

- The `city-model.png` image, displayed in a white frame with subtle shadow, rotated `0.8deg` for a "polaroid pinned to the page" feel.
- Floating dark-chip caption tag at bottom-right of the image: "What students build", with a small ribbon dot.

### 6.4 Below-the-fold (rest of home)

The home page continues with: 4 project cards (one per pillar, each tinted with its pillar color), the BGC 5-stage journey (Identify → Imagine → Build → Integrate → Impact), what-you-need section, closing CTA. **Detailed designs for these sections are deferred to implementation** — the patterns from Sections 4 and 5 of this spec will guide their treatment.

---

## 7. Section 4 · Project section landings

### 7.1 Where pillar color appears (5 redundant signals)

When a visitor is inside any of the four projects, the corresponding pillar color appears in:

1. **Top nav active tab.** The active project's tab gets the pillar color text + a 2px bottom border in pillar color.
2. **Breadcrumb.** The current-section segment uses pillar color text. E.g. `Home / 🌿 Smart Agriculture / White LED` — "Smart Agriculture" in green.
3. **Page H1 accent bar.** A 4px-wide × 30px-tall vertical pill in pillar color, sitting to the left of the page-level eyebrow label (`SUSTAINABILITY · PILLAR 1 OF 4`).
4. **Sidebar TOC.** Left border of the active section's nested-link list is a 2px line in pillar color. The currently-viewed page in the list has its text in pillar color + bold.
5. **"Next up" / "What's next?" CTA button.** Stays in pillar color when the next destination is within the same project (so the student visually sees they're staying in the green pillar). Switches to ribbon-gradient when the next destination crosses pillars.

### 7.2 Where pillar color does NOT appear

- Header chrome (lockup, ribbon line) — stays Flowlence/BGC always
- Body text and code blocks
- Universal callouts (warning, danger, info — these keep their universal colors regardless of pillar)
- Buttons that take students out of the current project

### 7.3 Stats / overview card on landing pages

Each project landing has a soft-tinted stats card showing time, components, difficulty:

```
─────────────────────────────────────────────
  Time · ~4 hours    Components · 4 sensors + 1 pump    Difficulty · Beginner
─────────────────────────────────────────────
```

Background uses pillar color at ~6% opacity (e.g. `#F0FDF4` for Agriculture). 1px border in a slightly darker tint.

---

## 8. Section 5 · Content page treatment

### 8.1 Typography (vs current Material defaults)

| Element | Current | New |
|---|---|---|
| Body text | ~0.85rem, line-height 1.6 | 1rem (16px), line-height 1.65 |
| Lead paragraph | same as body | 1.08rem, slate-medium color |
| h1 | 2.5rem, weight 700 (Roboto) | 2.3rem, weight 900 (Inter Tight), letter-spacing `-0.025em` |
| h2 | 1.6rem, weight 700 | 1.4rem, weight 800 (Inter Tight), letter-spacing `-0.02em` |
| h3 | 1.25rem, weight 700 | 1.1rem, weight 700 (Inter), letter-spacing `-0.015em` |
| Code blocks | small, low-contrast default | larger, slate-on-cream palette (see 8.4) |

### 8.2 Callouts (admonitions)

Material's admonitions stay as the underlying mechanism but get restyled. **Color logic is by *meaning*, not by *pillar*** — except for `tip`, which is friendly and section-owned.

| Type | Border-left color | Icon | Background tint |
|---|---|---|---|
| `tip` | pillar color | 💡 | pillar tint at 6% |
| `info` | universal blue `#2563EB` | ℹ️ | blue tint at 6% |
| `warning` | universal amber `#F59E0B` | ⚠️ | amber tint at 6% |
| `danger` | universal red `#DC2626` | 🚨 | red tint at 6% |
| `success` | ribbon gradient | ✓ | ribbon-soft gradient |
| `question` | (replaced by Try-it card — see 8.5) | — | — |

All callouts use 4px left border, 1rem padding, 8px border-radius, with the icon at 1.3rem in the leftmost column.

### 8.3 Numbered steps

Lists generated by `1. 2. 3.` markdown become flexbox rows with circle badges:

- 30px circle, ribbon-gradient fill (each badge interpolates a different stop along the gradient by step index — step 1 closer to orange, step 5 closer to magenta)
- Step content has 1rem font, line-height 1.6, slate text
- Used for tutorials, wiring instructions, and any procedural sequence

### 8.4 Code blocks

Replace Material's default code-block theme with one matching Flowlence Code's editor:

- Background: `#0F172A` (slate)
- Foreground: `#e2e8f0` (cream)
- Comments: `#94a3b8` (muted)
- Keywords: `#c084fc` (purple)
- Function names: `#fbbf24` (amber)
- Numbers / literals: `#fb923c` (orange)
- Top-right language label (e.g. `cpp`) in muted Inter
- 8px border-radius, 1rem padding, subtle shadow

Inline code stays light-themed: light-gray background, slate text, 4px border-radius.

### 8.5 Try-it challenge cards

Replace `!!! question` admonitions with distinct gradient cards:

- Background: `--ribbon-gradient-soft`
- Border: 1px transparent + 1px inset ribbon-magenta at 12% opacity
- ⚡ icon in a 30px ribbon-gradient circle (top-left)
- Title in Inter Tight 800, 1.05rem
- Body text 0.95rem with `<code>` styled with semitransparent white background

Triggered via Material's existing admonition syntax — we just restyle `.admonition.question`.

### 8.6 Right-side page TOC

Material's "On this page" right rail stays. Active section in pillar color + 600 weight, others in slate-medium. 2px left border on the rail in light gray (becomes pillar color where the indicator dot moves).

---

## 9. Implementation approach

### 9.1 File structure

```
docs/
  stylesheets/
    extra.css                    # token system, palette, type, base overrides
    chrome.css                   # header + footer
    home.css                     # home page hero + below
    pillars.css                  # per-pillar variable scoping + landing styles
    content.css                  # callouts, numbered steps, try-it, code blocks
  javascripts/
    download-toast.js            # (existing, unchanged)
overrides/
  partials/
    header.html                  # custom lockup, ribbon line
    footer.html                  # 3-column footer with new copy
    nav.html                     # active-tab pillar coloring (if needed)
mkdocs.yml                       # add new stylesheets to extra_css
```

### 9.2 CSS token system

A single `:root` block at the top of `extra.css` defines all tokens. Component CSS only references tokens, never raw hex. Light/dark/pillar variants are scoped via class selectors:

```css
:root {
  --flowlence-orange: #F7862F;
  --flowlence-cream: #FFF7E6;
  --flowlence-slate: #0F172A;
  --bgc-coral: #F8568D;
  --bgc-magenta: #C026D3;
  --bgc-blush: #FFE8F0;
  --ribbon-gradient: linear-gradient(90deg, #F7862F 0%, #F8568D 50%, #C026D3 100%);
  --ribbon-gradient-soft: linear-gradient(135deg, #FFF7E6 0%, #FFFFFF 50%, #FFE8F0 100%);
  --pillar: var(--flowlence-orange);  /* default — overridden per pillar */
  --pillar-tint: rgba(247, 134, 47, 0.08);
}

[data-pillar="agriculture"] { --pillar: #16A34A; --pillar-tint: rgba(22, 163, 74, 0.08); }
[data-pillar="parking"]     { --pillar: #2563EB; --pillar-tint: rgba(37, 99, 235, 0.08); }
[data-pillar="safety"]      { --pillar: #DC2626; --pillar-tint: rgba(220, 38, 38, 0.08); }
[data-pillar="temperature"] { --pillar: #0D9488; --pillar-tint: rgba(13, 148, 136, 0.08); }
```

### 9.3 Per-page pillar tagging

Each project's pages declare their pillar via Material's front-matter `extra` block, which gets rendered as a body-level data attribute via a small partial override:

```yaml
---
extra:
  pillar: agriculture
---
```

The override sets `<body data-pillar="agriculture">`. CSS selectors then apply pillar-tinted styles globally on that page. Pages without front-matter (Home, Getting Started, Reference) get no pillar attribute and fall back to default tokens.

---

## 10. Acceptance criteria

The redesign is complete when all of the following are true on `learn.flowlence.com`:

1. Header on every page shows the `bgc | Flowlence Learn` lockup with a ribbon-gradient bottom border.
2. Home page hero matches Section 6 exactly — badge, two-line headline (line 2 in gradient), sub-headline, two CTAs, framed city-model image, trust line.
3. Each project landing (Smart Agriculture, Smart Parking, Smart Safety, Smart Temperature) shows pillar color in **all 5 places** described in Section 7.1.
4. A representative content page (e.g., `agriculture/led.md`) demonstrates the new typography, callouts, numbered steps, code block style, and Try-it card pattern.
5. Dark mode works correctly across all of the above (no unreadable contrasts, ribbon stays vivid).
6. Mobile breakpoint (<900px viewport) collapses the hero to single-column and keeps the chrome usable.
7. `mkdocs build` produces no warnings.
8. Auto-deploy on `git push` lands the new design at `https://learn.flowlence.com` within ~45 seconds.

---

## 11. Decisions deferred to implementation

These are intentionally NOT specified here, to keep the spec focused. They'll be resolved during the implementation plan or as the work proceeds:

- Exact below-the-fold layout of the home page (project cards, 5-stage journey, what-you-need)
- Reference page chrome (the only top-level section with no pillar — likely uses default Flowlence orange accent)
- Exact mobile breakpoints (will tune to actual content widths during build)
- Whether to add page transitions / scroll animations (can layer on later if desired)
- Whether the Brilliant Academy expansion changes the header lockup — likely yes, but defers until that brand exists

---

*End of spec.*
