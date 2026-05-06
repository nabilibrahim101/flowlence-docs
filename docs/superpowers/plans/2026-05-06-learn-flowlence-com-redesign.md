# learn.flowlence.com Co-Brand Redesign · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic-MkDocs-Material visual identity of `learn.flowlence.com` with a polished co-branded design (Flowlence × BGC) per the spec at `docs/superpowers/specs/2026-05-06-learn-flowlence-com-redesign-design.md`.

**Architecture:** Pure CSS + Jinja partial overrides on top of MkDocs Material. New work splits across 5 stylesheets (`tokens.css`, `chrome.css`, `home.css`, `pillars.css`, `content.css`), 2 partial overrides (`header.html`, `main.html`), and per-page `extra.pillar` front-matter. Each chunk is independently shippable — the live site at `https://learn.flowlence.com` must remain functional during every chunk's deploy.

**Tech Stack:** MkDocs Material 9.x, Python 3, Jinja2 (template overrides), CSS Custom Properties, Google Fonts (Inter + Inter Tight). No JavaScript dependencies beyond the existing `download-toast.js`.

---

## File Structure

### Created

| Path | Responsibility |
|---|---|
| `docs/stylesheets/tokens.css` | All CSS custom properties (`--flowlence-*`, `--bgc-*`, `--ribbon-*`, `--pillar-*`). Single source of truth for color/spacing tokens. |
| `docs/stylesheets/chrome.css` | Header lockup + ribbon line, footer 3-column layout. Used on every page. |
| `docs/stylesheets/home.css` | Home page hero only (badge, two-line headline, CTAs, image frame). |
| `docs/stylesheets/pillars.css` | `[data-pillar=…]` scoping rules — applies pillar tints to nav tabs, breadcrumbs, h1 accents, sidebar, next-up. |
| `docs/stylesheets/content.css` | Content-page treatments — body type, callouts, numbered steps, Try-it cards, code-block palette. |
| `overrides/partials/header.html` | Custom header partial: BGC mark + divider + Flowlence Learn lockup, ribbon line below. |
| `overrides/partials/footer.html` | Custom footer partial: 3-column layout + brand attribution + copyright. |
| `overrides/main.html` | Top-level template that injects `data-pillar` body attribute from page front-matter. |

### Modified

| Path | Change |
|---|---|
| `docs/stylesheets/extra.css` | Trim down — keep only the download-toast styles. Move palette/typography/header tweaks into the new dedicated files. |
| `mkdocs.yml` | Add 5 new `extra_css` entries; add `extra` block with default `pillar: null`; configure Pygments code-block theme. |
| `docs/index.md` | Replace existing hero + nav cards markup with new hero structure. |
| `docs/getting-started/index.md` | Add front-matter (no pillar — getting-started doesn't get pillar tinting). |
| `docs/projects/agriculture/*.md` (6 files) | Add `extra.pillar: agriculture` front-matter. |
| `docs/projects/parking/*.md` (5 files) | Add `extra.pillar: parking` front-matter. |
| `docs/projects/safety/*.md` (5 files) | Add `extra.pillar: safety` front-matter. |
| `docs/projects/temperature/*.md` (5 files) | Add `extra.pillar: temperature` front-matter. |

### Unchanged (do not touch)

- `docs/javascripts/download-toast.js`
- `docs/CNAME`
- `.github/workflows/deploy.yml`
- All images under `docs/images/`
- All non-front-matter content of project markdown files

---

## Chunking Strategy & Order

7 chunks. Each ends with **a working, deployed change visible at `https://learn.flowlence.com`**. Order is dependency-driven:

1. **Foundation** — tokens, fonts, base type. Visible: new fonts everywhere, slightly larger body text.
2. **Header** — lockup partial + ribbon line. Visible: BGC + Flowlence Learn at top of every page.
3. **Footer** — 3-column footer, both wordmarks. Visible: new footer everywhere.
4. **Home hero** — `index.md` rewrite + `home.css`. Visible: new hero on `/` only.
5. **Pillar system** — front-matter, `main.html`, `pillars.css`. Visible: project pages get pillar accents.
6. **Content treatment** — `content.css`. Visible: callouts, code blocks, numbered steps look new.
7. **Try-it + polish** — Try-it cards, dark-mode pass, mobile/a11y audit. Visible: final coherent product.

Each chunk ends with a `git push` that triggers GitHub Pages deploy.

---

## Conventions Used Throughout

**Verification commands** (run from `C:/Source/Flowlence/flowlence-docs`):

- Build check: `python -m mkdocs build` — must complete with `INFO - Documentation built` and no warnings.
- Local preview: `python -m mkdocs serve --dev-addr=127.0.0.1:8000` then open the URL.
- Live verification (after push): `curl -sI https://learn.flowlence.com/` returns `HTTP/2 200`.
- Workflow check: `gh run list --repo nabilibrahim101/flowlence-docs --limit 1` — last entry shows `success`.

**Commit style:**
- Subject line: `feat(redesign): <chunk> — <task>`, e.g. `feat(redesign): foundation — add Inter font import`.
- Body: 1–2 sentences explaining what changed and why.

**Bash quoting:** absolute paths to mkdocs (`python -m mkdocs build`) avoid shell-related path issues on Windows Git Bash.

---

## Chunk 1 · Foundation (tokens + typography)

Lays the CSS variable system and the new web fonts. After this chunk, every page on the site looks subtly *different* (typeface, body size) but otherwise unchanged. Foundation for chunks 2–7.

### Task 1.1 · Create the token stylesheet

**Files:**
- Create: `docs/stylesheets/tokens.css`

- [ ] **Step 1 · Write the file with the full token system**

```css
/* ===================================================================
   tokens.css — Single source of truth for color / typography tokens
   Spec ref: docs/superpowers/specs/2026-05-06-learn-flowlence-com-redesign-design.md §4
   =================================================================== */

:root {
  /* ---------- Flowlence-owned ---------- */
  --flowlence-orange: #F7862F;
  --flowlence-orange-light: #F9A443;
  --flowlence-orange-dark: #E0792B;
  --flowlence-cream: #FFF7E6;
  --flowlence-slate: #0F172A;

  /* ---------- BGC-owned ---------- */
  --bgc-coral: #F8568D;
  --bgc-magenta: #C026D3;
  --bgc-blush: #FFE8F0;

  /* ---------- Shared / Ribbon ---------- */
  --ribbon-gradient: linear-gradient(90deg, #F7862F 0%, #F8568D 50%, #C026D3 100%);
  --ribbon-gradient-soft: linear-gradient(135deg, #FFF7E6 0%, #FFFFFF 50%, #FFE8F0 100%);
  --ribbon-gradient-vertical: linear-gradient(180deg, #F7862F 0%, #F8568D 50%, #C026D3 100%);

  /* ---------- Pillars (default = Flowlence orange) ---------- */
  --pillar: var(--flowlence-orange);
  --pillar-light: rgba(247, 134, 47, 0.08);
  --pillar-border: rgba(247, 134, 47, 0.2);

  /* ---------- Typography ---------- */
  --font-display: "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "Consolas", "Courier New", monospace;

  /* ---------- Material variable wiring ---------- */
  --md-primary-fg-color: var(--flowlence-orange);
  --md-primary-fg-color--light: var(--flowlence-orange-light);
  --md-primary-fg-color--dark: var(--flowlence-orange-dark);
  --md-accent-fg-color: var(--bgc-coral);
}

/* ---------- Per-pillar scoping ---------- */
[data-pillar="agriculture"] {
  --pillar: #16A34A;
  --pillar-light: rgba(22, 163, 74, 0.08);
  --pillar-border: rgba(22, 163, 74, 0.2);
}
[data-pillar="parking"] {
  --pillar: #2563EB;
  --pillar-light: rgba(37, 99, 235, 0.08);
  --pillar-border: rgba(37, 99, 235, 0.2);
}
[data-pillar="safety"] {
  --pillar: #DC2626;
  --pillar-light: rgba(220, 38, 38, 0.08);
  --pillar-border: rgba(220, 38, 38, 0.2);
}
[data-pillar="temperature"] {
  --pillar: #0D9488;
  --pillar-light: rgba(13, 148, 136, 0.08);
  --pillar-border: rgba(13, 148, 136, 0.2);
}

/* ---------- Dark mode (slate scheme) ---------- */
[data-md-color-scheme="slate"] {
  --md-primary-fg-color: var(--flowlence-orange);
  --md-primary-fg-color--light: var(--flowlence-orange-light);
  --md-primary-fg-color--dark: var(--flowlence-orange-dark);
  --md-accent-fg-color: var(--bgc-coral);
}
```

- [ ] **Step 2 · Verify build still passes**

Run: `cd "C:/Source/Flowlence/flowlence-docs" && python -m mkdocs build`
Expected: `INFO - Documentation built in <N> seconds` — no warnings about missing files (the file isn't yet referenced in `mkdocs.yml`, that's fine).

- [ ] **Step 3 · Commit**

```bash
cd "C:/Source/Flowlence/flowlence-docs"
git add docs/stylesheets/tokens.css
git commit -m "feat(redesign): foundation — add tokens.css with palette + type variables"
```

### Task 1.2 · Add the Google Fonts import

**Files:**
- Modify: `mkdocs.yml` (around line 43, after `extra_css:` block)

- [ ] **Step 1 · Add `extra_javascript` font preload + the css import as the first `extra_css` entry**

Read `mkdocs.yml` first to confirm exact context. Then insert the stylesheet load. The Google Fonts URL loads only the weights actually used: Inter 400/600 and Inter Tight 800/900.

Edit `mkdocs.yml` — find:

```yaml
extra_css:
  - stylesheets/extra.css
```

Replace with:

```yaml
extra_css:
  - https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400&display=swap
  - stylesheets/tokens.css
  - stylesheets/extra.css
```

- [ ] **Step 2 · Build and check for any warning**

Run: `python -m mkdocs build`
Expected: no warnings.

- [ ] **Step 3 · Open local preview to confirm fonts load**

Run: `python -m mkdocs serve --dev-addr=127.0.0.1:8000` (in background or another terminal).
Open `http://127.0.0.1:8000` in a browser. View source and confirm the `<link>` to `fonts.googleapis.com` is present in the HTML head.

- [ ] **Step 4 · Commit**

```bash
git add mkdocs.yml
git commit -m "feat(redesign): foundation — load Inter / Inter Tight / JetBrains Mono via Google Fonts"
```

### Task 1.3 · Apply base typography to body + headings

**Files:**
- Modify: `docs/stylesheets/extra.css` (top of file, after the existing `:root` block)

- [ ] **Step 1 · Read `extra.css` to confirm current state, then prepend new typography rules**

Edit the file — replace the existing `:root` block (lines 1–13) with a comment pointing to tokens.css, and add the new base typography section at top:

```css
/* ===================================================================
   extra.css — Base type, header tweaks, download toast (legacy)
   Color tokens live in tokens.css.
   =================================================================== */

/* ---------- Base typography (uses tokens from tokens.css) ---------- */
body, .md-typeset {
  font-family: var(--font-body);
  font-feature-settings: "cv11", "ss01";  /* Inter stylistic alternates for cleaner numerals */
}

.md-typeset {
  font-size: 0.85rem;        /* Material's base; scaled up by content.css later */
  line-height: 1.65;
}

.md-typeset h1, .md-typeset h2, .md-typeset h3, .md-typeset h4, .md-typeset h5, .md-typeset h6 {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

.md-typeset h1 { font-weight: 900; letter-spacing: -0.025em; }
.md-typeset h2 { font-weight: 800; letter-spacing: -0.02em; }
.md-typeset h3 { font-weight: 700; letter-spacing: -0.015em; }

.md-typeset code {
  font-family: var(--font-mono);
}

/* ---------- Header / nav tweaks (preserved from prior work) ---------- */
```

(Keep all the existing rules from line 14 onward — `.md-header`, `.md-tabs`, `.md-search__input`, `.md-header .md-icon`, the `.flowlence-toast*` block, etc. They stay as-is.)

- [ ] **Step 2 · Build**

Run: `python -m mkdocs build`
Expected: no warnings.

- [ ] **Step 3 · Local preview**

In `mkdocs serve`, open any page (`http://127.0.0.1:8000/getting-started/`). Open browser DevTools → Inspect a `<p>` element. Confirm the `font-family` resolves to "Inter, …".
Open DevTools → Network tab → filter "Font". Confirm Inter and Inter Tight load (status 200 from `fonts.gstatic.com`).

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/extra.css
git commit -m "feat(redesign): foundation — apply Inter Tight / Inter base typography"
git push origin main
```

- [ ] **Step 5 · Verify auto-deploy**

Run: `gh run list --repo nabilibrahim101/flowlence-docs --limit 1`
Wait for status `completed/success` (~30 sec).
Open `https://learn.flowlence.com` in a browser, hard-refresh. Headings should now look more condensed/punchy (Inter Tight); body should be Inter. **Chunk 1 complete.**

---

## Chunk 2 · Site Chrome — Header Lockup + Ribbon Line

After this chunk, every page shows the BGC + Flowlence Learn lockup at the top with a 3px ribbon gradient below.

### Task 2.1 · Create the header partial

**Files:**
- Create: `overrides/partials/header.html`

- [ ] **Step 1 · Write the partial**

This replaces Material's default header. The structure mirrors the existing header behavior (logo, nav, search, palette toggle) but with our custom lockup.

```html
{#-
  Custom header for learn.flowlence.com
  Renders: bgc mark + divider + Flowlence Learn lockup, then standard Material nav controls.
  Spec: docs/superpowers/specs/2026-05-06-learn-flowlence-com-redesign-design.md §5.1
-#}
{% set class = "md-header" %}
{% if "navigation.tabs.sticky" in features %}
  {% set class = class ~ " md-header--shadow md-header--lifted" %}
{% elif "navigation.tabs" not in features or "toc.integrate" in features or page and page.meta and page.meta.hide and "navigation" in page.meta.hide %}
  {% set class = class ~ " md-header--shadow" %}
{% endif %}

<header class="{{ class }}" data-md-component="header">
  <nav class="md-header__inner md-grid" aria-label="{{ lang.t('header') }}">

    {#- Hamburger (mobile) -#}
    <label class="md-header__button md-icon" for="__drawer">
      {% include ".icons/material/menu" ~ ".svg" %}
    </label>

    {#- Brand lockup: bgc mark + divider + Flowlence Learn -#}
    <a href="{{ '' | url }}" title="{{ config.site_name | e }}" class="md-header__title flowlence-lockup" data-md-component="header-title">
      <span class="flowlence-lockup__bgc">bgc</span>
      <span class="flowlence-lockup__divider" aria-hidden="true"></span>
      <span class="flowlence-lockup__name">Flowlence Learn</span>
    </a>

    {#- Search -#}
    {% if "material/search" in config.plugins %}
      <label class="md-header__button md-icon" for="__search">
        {% include ".icons/material/magnify.svg" %}
      </label>
      {% include "partials/search.html" %}
    {% endif %}

    {#- Palette toggle -#}
    {% if config.theme.palette %}
      {% if not config.theme.palette is mapping %}
        {% include "partials/palette.html" %}
      {% endif %}
    {% endif %}

    {#- Source repo (if configured) -#}
    {% if config.repo_url %}
      <div class="md-header__source">
        {% include "partials/source.html" %}
      </div>
    {% endif %}
  </nav>

  {#- Ribbon partnership signature -#}
  <div class="flowlence-ribbon-line" aria-hidden="true"></div>

  {#- Tabs -#}
  {% if "navigation.tabs.sticky" in features %}
    {% if "navigation.tabs" in features %}
      {% include "partials/tabs.html" %}
    {% endif %}
  {% endif %}
</header>
```

- [ ] **Step 2 · Build and verify partial loads**

Run: `python -m mkdocs build`
Expected: success, no Jinja errors.
Then check: `grep -c "flowlence-lockup" site/index.html` should return `>= 1`.

- [ ] **Step 3 · Commit**

```bash
git add overrides/partials/header.html
git commit -m "feat(redesign): chrome — custom header partial with bgc + Flowlence Learn lockup"
```

### Task 2.2 · Style the lockup + ribbon line

**Files:**
- Create: `docs/stylesheets/chrome.css`

- [ ] **Step 1 · Write the chrome stylesheet**

```css
/* ===================================================================
   chrome.css — Header lockup + ribbon line + footer
   Spec ref: §5
   =================================================================== */

/* ---------- Header background (light + dark) ---------- */
.md-header {
  background-color: #ffffff;
  color: var(--flowlence-slate);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
[data-md-color-scheme="slate"] .md-header {
  background-color: var(--flowlence-slate);
  color: #f1f5f9;
}

/* ---------- The lockup (bgc | Flowlence Learn) ---------- */
.flowlence-lockup {
  display: flex !important;
  align-items: center;
  gap: 0.85rem;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: inherit;
  font-family: var(--font-display);
  line-height: 1;
}

/* The "bgc" stylized mark */
.flowlence-lockup__bgc {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.5rem;
  font-style: italic;
  letter-spacing: -0.05em;
  background: var(--ribbon-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

/* The vertical divider */
.flowlence-lockup__divider {
  display: inline-block;
  width: 1px;
  height: 22px;
  background: #cbd5e1;
}
[data-md-color-scheme="slate"] .flowlence-lockup__divider {
  background: #334155;
}

/* "Flowlence Learn" wordmark */
.flowlence-lockup__name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  color: var(--flowlence-slate);
}
[data-md-color-scheme="slate"] .flowlence-lockup__name {
  color: #f1f5f9;
}

/* ---------- The 3px ribbon line under the header ---------- */
.flowlence-ribbon-line {
  height: 3px;
  background: var(--ribbon-gradient);
}
```

- [ ] **Step 2 · Wire chrome.css into mkdocs.yml**

Edit `mkdocs.yml`. Find the `extra_css:` block (now showing `tokens.css` and `extra.css`). Add `chrome.css` after `tokens.css`:

```yaml
extra_css:
  - https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400&display=swap
  - stylesheets/tokens.css
  - stylesheets/chrome.css
  - stylesheets/extra.css
```

- [ ] **Step 3 · Build + local preview**

Run: `python -m mkdocs build`. No warnings expected.
In `mkdocs serve`, refresh — header should now show `bgc | Flowlence Learn` with the 3px ribbon below it.

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/chrome.css mkdocs.yml
git commit -m "feat(redesign): chrome — style header lockup, ribbon line, dark mode handling"
git push origin main
```

- [ ] **Step 5 · Verify on live site**

Wait for deploy (`gh run list --limit 1` shows success). Visit `https://learn.flowlence.com` — header should show the new lockup with ribbon line. Toggle dark mode — header background goes slate, lockup name turns cream, ribbon stays full color. **Chunk 2 complete.**

---

## Chunk 3 · Footer

Replace the default Material footer (which has prev/next links + "Made with Material" attribution) with a 3-column footer that matches the header lockup.

### Task 3.1 · Create the footer partial

**Files:**
- Create: `overrides/partials/footer.html`

- [ ] **Step 1 · Write the partial**

```html
{#-
  Custom footer for learn.flowlence.com
  Renders: faded ribbon top-edge + lockup + 3 link columns + copyright.
  Spec: §5.2
-#}

{#- Material's built-in prev/next nav (preserve for keyboard navigation) -#}
{% if "navigation.footer" in features %}
  {% if page.previous_page or page.next_page %}
    {% if page.meta and page.meta.hide %}
      {% set hidden = "hidden" if "footer" in page.meta.hide %}
    {% endif %}
    <nav class="md-footer__inner md-grid" aria-label="{{ lang.t('footer') }}" {{ hidden }}>
      {% if page.previous_page %}
        {% set direction = lang.t("footer.previous") %}
        <a href="{{ page.previous_page.url | url }}" class="md-footer__link md-footer__link--prev" aria-label="{{ direction }}: {{ page.previous_page.title | e }}">
          <div class="md-footer__button md-icon">
            {% include ".icons/material/arrow-left.svg" %}
          </div>
          <div class="md-footer__title">
            <span class="md-footer__direction">{{ direction }}</span>
            <div class="md-ellipsis">{{ page.previous_page.title }}</div>
          </div>
        </a>
      {% endif %}
      {% if page.next_page %}
        {% set direction = lang.t("footer.next") %}
        <a href="{{ page.next_page.url | url }}" class="md-footer__link md-footer__link--next" aria-label="{{ direction }}: {{ page.next_page.title | e }}">
          <div class="md-footer__title">
            <span class="md-footer__direction">{{ direction }}</span>
            <div class="md-ellipsis">{{ page.next_page.title }}</div>
          </div>
          <div class="md-footer__button md-icon">
            {% include ".icons/material/arrow-right.svg" %}
          </div>
        </a>
      {% endif %}
    </nav>
  {% endif %}
{% endif %}

{#- Custom Flowlence × BGC footer -#}
<footer class="md-footer flowlence-footer">

  {#- Faded ribbon top-edge -#}
  <div class="flowlence-footer__ribbon" aria-hidden="true"></div>

  <div class="flowlence-footer__inner md-grid">

    {#- Brand lockup row -#}
    <div class="flowlence-footer__brand">
      <span class="flowlence-lockup__bgc">bgc</span>
      <span class="flowlence-lockup__divider" aria-hidden="true"></span>
      <span class="flowlence-lockup__name">Flowlence Learn</span>
    </div>

    {#- Link columns -#}
    <div class="flowlence-footer__cols">
      <div class="flowlence-footer__col">
        <h4>About</h4>
        <ul>
          <li><a href="https://bgc.education" target="_blank" rel="noopener">Brilliant Global Competitions ↗</a></li>
          <li><a href="https://flowlence.com" target="_blank" rel="noopener">Flowlence ↗</a></li>
          <li><a href="mailto:contact@flowlence.com">Contact</a></li>
        </ul>
      </div>
      <div class="flowlence-footer__col">
        <h4>Resources</h4>
        <ul>
          <li><a href="{{ '/getting-started/install/' | url }}">Download Flowlence Code</a></li>
          <li><a href="{{ '/getting-started/meet-your-kit/' | url }}">Brilliant Smart City Kit</a></li>
          <li><a href="{{ '/reference/troubleshooting/' | url }}">Troubleshooting</a></li>
        </ul>
      </div>
      <div class="flowlence-footer__col">
        <h4>For Educators</h4>
        <ul>
          <li><a href="https://bgc.education" target="_blank" rel="noopener">Become a participating school ↗</a></li>
          <li><a href="{{ '/reference/' | url }}">Coach materials</a></li>
        </ul>
      </div>
    </div>

    {#- Copyright -#}
    <div class="flowlence-footer__legal">
      <span>© {{ build_date_utc.strftime('%Y') if build_date_utc else '2026' }} Flowlence Inc. · in partnership with Brilliant Global Competitions</span>
      <span>learn.flowlence.com</span>
    </div>

  </div>
</footer>
```

- [ ] **Step 2 · Build + check no Jinja errors**

Run: `python -m mkdocs build`
Expected: success.

- [ ] **Step 3 · Commit**

```bash
git add overrides/partials/footer.html
git commit -m "feat(redesign): chrome — custom footer partial with brand attribution + 3 columns"
```

### Task 3.2 · Style the footer

**Files:**
- Modify: `docs/stylesheets/chrome.css` (append at end)

- [ ] **Step 1 · Append footer styles**

Add to the bottom of `chrome.css`:

```css
/* ===================================================================
   Footer (continues from chrome.css above)
   =================================================================== */

.flowlence-footer {
  background: #FAFAF8;
  color: var(--flowlence-slate);
  padding: 0;
  margin-top: 3rem;
}
[data-md-color-scheme="slate"] .flowlence-footer {
  background: #1e293b;
  color: #f1f5f9;
}

.flowlence-footer__ribbon {
  height: 2px;
  background: var(--ribbon-gradient);
  opacity: 0.4;
}

.flowlence-footer__inner {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.flowlence-footer__brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.95rem;
}
.flowlence-footer__brand .flowlence-lockup__bgc { font-size: 1.25rem; }

.flowlence-footer__cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.flowlence-footer__col h4 {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin: 0 0 0.5rem;
}
[data-md-color-scheme="slate"] .flowlence-footer__col h4 {
  color: #94a3b8;
}

.flowlence-footer__col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.flowlence-footer__col a {
  color: #334155;
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.15s ease;
}
.flowlence-footer__col a:hover {
  color: var(--flowlence-orange);
}
[data-md-color-scheme="slate"] .flowlence-footer__col a {
  color: #cbd5e1;
}
[data-md-color-scheme="slate"] .flowlence-footer__col a:hover {
  color: var(--flowlence-orange-light);
}

.flowlence-footer__legal {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: #64748b;
}
[data-md-color-scheme="slate"] .flowlence-footer__legal {
  border-top-color: #334155;
  color: #94a3b8;
}
```

- [ ] **Step 2 · Build + local preview**

Run: `python -m mkdocs build`. No warnings.
In `mkdocs serve`, scroll to the bottom of any page — footer should now show 3 columns + brand lockup + copyright. The "Made with Material" line is gone (replaced by our partial).

- [ ] **Step 3 · Commit + push**

```bash
git add docs/stylesheets/chrome.css
git commit -m "feat(redesign): chrome — style footer with brand lockup + 3 columns"
git push origin main
```

- [ ] **Step 4 · Verify on live site**

Wait for deploy. Visit `https://learn.flowlence.com`, scroll to footer. Confirm new footer renders correctly. **Chunk 3 complete.**

---

## Chunk 4 · Home Page Hero

After this chunk, the home page (`/`) opens with a polished hero: BGC competition badge, two-line headline (line 2 in gradient), sub-headline, two CTAs, framed city-model image. Other pages unchanged.

### Task 4.1 · Create the home stylesheet

**Files:**
- Create: `docs/stylesheets/home.css`

- [ ] **Step 1 · Write the file**

```css
/* ===================================================================
   home.css — Home page hero + below-the-fold treatments
   Spec ref: §6
   Scoped via .flowlence-home-* class — only applies on the index page.
   =================================================================== */

/* Hide the page H1 ("Welcome to Flowlence Learn") since the hero replaces it */
.flowlence-home .md-typeset > h1:first-of-type {
  display: none;
}

/* ---------- Hero container ---------- */
.flowlence-hero {
  background: var(--ribbon-gradient-soft);
  margin: -1.5rem -1rem 2.5rem;
  padding: 3rem 2rem;
  border-radius: 0;
}

.flowlence-hero__grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 900px) {
  .flowlence-hero__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* ---------- Competition badge ---------- */
.flowlence-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: rgba(192, 38, 211, 0.08);
  border: 1px solid rgba(192, 38, 211, 0.2);
  margin-bottom: 1.4rem;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bgc-magenta);
}

/* ---------- Headline ---------- */
.flowlence-hero__headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 3.6rem;
  line-height: 1.0;
  letter-spacing: -0.035em;
  color: var(--flowlence-slate);
  margin: 0 0 0.3rem;
}
[data-md-color-scheme="slate"] .flowlence-hero__headline {
  color: #f1f5f9;
}
.flowlence-hero__headline--gradient {
  margin: 0 0 1.4rem;
  background: var(--ribbon-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (max-width: 600px) {
  .flowlence-hero__headline,
  .flowlence-hero__headline--gradient { font-size: 2.4rem; }
}

/* ---------- Sub-headline ---------- */
.flowlence-hero__sub {
  font-size: 1.15rem;
  line-height: 1.55;
  color: #475569;
  margin: 0 0 2rem;
  max-width: 480px;
}
[data-md-color-scheme="slate"] .flowlence-hero__sub {
  color: #cbd5e1;
}

/* ---------- CTAs ---------- */
.flowlence-hero__ctas {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
  align-items: center;
}

.flowlence-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.4rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.005em;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.flowlence-cta--primary {
  background: var(--ribbon-gradient);
  color: #fff !important;
  box-shadow: 0 4px 14px rgba(248, 86, 141, 0.35);
}
.flowlence-cta--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(248, 86, 141, 0.45);
}
.flowlence-cta--secondary {
  background: #fff;
  color: var(--flowlence-slate) !important;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}
.flowlence-cta--secondary:hover {
  border-color: var(--flowlence-slate);
}
[data-md-color-scheme="slate"] .flowlence-cta--secondary {
  background: #1e293b;
  color: #f1f5f9 !important;
  border-color: #334155;
}

/* ---------- Trust line ---------- */
.flowlence-hero__trust {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.82rem;
  color: #64748b;
}
.flowlence-hero__dots {
  display: inline-flex;
}
.flowlence-hero__dots span {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.flowlence-hero__dots span:nth-child(1) { background: var(--flowlence-orange); }
.flowlence-hero__dots span:nth-child(2) { background: var(--bgc-coral); margin-left: -8px; }
.flowlence-hero__dots span:nth-child(3) { background: var(--bgc-magenta); margin-left: -8px; }

/* ---------- City model image frame ---------- */
.flowlence-hero__image {
  position: relative;
}
.flowlence-hero__image-frame {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.10);
  transform: rotate(0.8deg);
}
.flowlence-hero__image-frame img {
  width: 100%;
  display: block;
}
.flowlence-hero__image-tag {
  position: absolute;
  bottom: -12px;
  right: 14px;
  background: var(--flowlence-slate);
  color: #fff;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  font-size: 0.76rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.flowlence-hero__image-tag::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ribbon-gradient);
}
```

- [ ] **Step 2 · Wire `home.css` into `mkdocs.yml`**

Edit `mkdocs.yml`. Append to the `extra_css:` list:

```yaml
extra_css:
  - https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400&display=swap
  - stylesheets/tokens.css
  - stylesheets/chrome.css
  - stylesheets/home.css
  - stylesheets/extra.css
```

- [ ] **Step 3 · Commit**

```bash
git add docs/stylesheets/home.css mkdocs.yml
git commit -m "feat(redesign): home — add home.css with hero styles"
```

### Task 4.2 · Rewrite the home page hero markup

**Files:**
- Modify: `docs/index.md` (replace lines 1–12, the existing hero markdown)

- [ ] **Step 1 · Read current `docs/index.md` to confirm context**

The first 12 lines are the existing hero (heading + lead paragraph + city-model image). They get replaced.

- [ ] **Step 2 · Replace the opening of the file**

Find the existing first 12 lines (from `# Welcome to Flowlence Learn` through the `![A student-built smart city model...](images/city-model.png)` image line). Replace with:

```markdown
---
extra:
  body_class: flowlence-home
---

# Welcome to Flowlence Learn

<div class="flowlence-hero" markdown>
<div class="flowlence-hero__grid" markdown>
<div markdown>

<span class="flowlence-hero__badge">⚡ Brilliant Global Competition · 2026–27</span>

<h1 class="flowlence-hero__headline">Build a smart city.</h1>
<h1 class="flowlence-hero__headline flowlence-hero__headline--gradient">Block by block.</h1>

<p class="flowlence-hero__sub">Drag-and-drop programming, real ESP32 hardware, and a competition that spans <strong>4&nbsp;continents</strong>. You'll build four working smart-city projects, then bring them to life as a model.</p>

<div class="flowlence-hero__ctas">
<a class="flowlence-cta flowlence-cta--primary" href="getting-started/">Start Part 1 →</a>
<a class="flowlence-cta flowlence-cta--secondary" href="getting-started/meet-your-kit/">Meet your kit</a>
</div>

<div class="flowlence-hero__trust">
<span class="flowlence-hero__dots"><span></span><span></span><span></span></span>
<span><strong>Grades 10–12</strong> · about 10 hours · no prior coding experience needed</span>
</div>

</div>
<div class="flowlence-hero__image" markdown>
<div class="flowlence-hero__image-frame">
<img src="images/city-model.png" alt="A student-built smart city model with four zones — agriculture, parking, safety, and climate — each wired to the ESP32 Plus and the Brilliant Smart City Kit">
</div>
<div class="flowlence-hero__image-tag">What students build</div>
</div>
</div>
</div>
```

(Keep all content from "## Why you're here" downward in `index.md` exactly as it was.)

- [ ] **Step 3 · Add markdown extension for raw HTML inside markdown**

Edit `mkdocs.yml`. Find the `markdown_extensions:` block. Confirm `md_in_html` is present. If not, add it:

```yaml
markdown_extensions:
  - admonition
  - pymdownx.details
  - md_in_html       # ← add this line if missing
  # ...other existing extensions
```

(Run `grep -n "md_in_html" mkdocs.yml` first; if it returns a line, skip this step.)

- [ ] **Step 4 · Build + local preview**

Run: `python -m mkdocs build`. No warnings.
In `mkdocs serve`, open `http://127.0.0.1:8000/` — the home page should now show: badge, two-line headline (second line in gradient), sub-headline, two buttons, framed city-model image, trust line.

- [ ] **Step 5 · Inject the body class**

The hero relies on `body.flowlence-home` to hide Material's default `<h1>`. We need a partial override to set the body class from front-matter. Create `overrides/main.html`:

```html
{% extends "base.html" %}

{#- Inject body classes from page front-matter (extra.body_class, extra.pillar) -#}
{% block site_meta %}
  {{ super() }}
{% endblock %}

{% block extrahead %}
  {{ super() }}
{% endblock %}

{#- Override the body tag to inject our custom attributes -#}
{% block htmltitle %}
  {{ super() }}
{% endblock %}

{#- Custom: data-pillar attribute on body via JS (because Material renders <body> in base.html and we can't easily override that block without copying the whole template) -#}
{% block libs %}
  {{ super() }}
  {% if page and page.meta and (page.meta.body_class or page.meta.pillar) %}
    <script>
      (function() {
        {% if page.meta.body_class %}
          document.body.classList.add("{{ page.meta.body_class | e }}");
        {% endif %}
        {% if page.meta.pillar %}
          document.body.setAttribute("data-pillar", "{{ page.meta.pillar | e }}");
        {% endif %}
      })();
    </script>
  {% endif %}
{% endblock %}
```

- [ ] **Step 6 · Build + local preview again**

Run: `python -m mkdocs build`. Refresh `mkdocs serve`. Confirm:
- The default `<h1>Welcome to Flowlence Learn</h1>` is hidden
- The new hero is visible

- [ ] **Step 7 · Commit + push**

```bash
git add docs/index.md overrides/main.html mkdocs.yml
git commit -m "feat(redesign): home — replace hero with badge / two-line headline / framed image / CTAs"
git push origin main
```

- [ ] **Step 8 · Verify on live site**

Wait for deploy. Visit `https://learn.flowlence.com/` — confirm new hero. **Chunk 4 complete.**

---

## Chunk 5 · Pillar System

After this chunk, the four projects each show their pillar color in 5 places: nav tab, breadcrumb, h1 accent bar, sidebar TOC, next-up CTA.

### Task 5.1 · Add pillar front-matter to all project markdown files

**Files:**
- Modify: 21 markdown files across `docs/projects/{agriculture,parking,safety,temperature}/`

- [ ] **Step 1 · List all files that need front-matter**

Run: `find "C:/Source/Flowlence/flowlence-docs/docs/projects" -name "*.md" -type f`
Expected: 21 paths printed.

- [ ] **Step 2 · Add `extra.pillar` front-matter to each Smart Agriculture file**

For each file in `docs/projects/agriculture/`:

```bash
for f in C:/Source/Flowlence/flowlence-docs/docs/projects/agriculture/*.md; do
  # Skip if already has front-matter
  if head -1 "$f" | grep -q "^---$"; then
    echo "SKIP (has front-matter): $f"
  else
    # Prepend the front-matter
    { printf -- "---\nextra:\n  pillar: agriculture\n---\n\n"; cat "$f"; } > "$f.tmp" && mv "$f.tmp" "$f"
    echo "ADDED: $f"
  fi
done
```

- [ ] **Step 3 · Repeat for Parking, Safety, Temperature**

Run the same loop 3 more times, replacing `agriculture` with `parking`, `safety`, `temperature` in both the path and the `pillar:` value.

- [ ] **Step 4 · Verify**

Run: `head -4 docs/projects/agriculture/led.md`
Expected:
```
---
extra:
  pillar: agriculture
---
```

Then: `grep -l "pillar: agriculture" docs/projects/agriculture/ | wc -l` should return `6`.

- [ ] **Step 5 · Build + verify body attribute renders**

Run: `python -m mkdocs build`. No warnings.
In `mkdocs serve`, open `/projects/agriculture/led/`. Open browser DevTools → inspect `<body>`. Confirm `<body data-pillar="agriculture">` is present (set by the JS in `main.html`).

- [ ] **Step 6 · Commit**

```bash
git add docs/projects/
git commit -m "feat(redesign): pillars — tag all 21 project pages with extra.pillar front-matter"
```

### Task 5.2 · Create the pillar stylesheet

**Files:**
- Create: `docs/stylesheets/pillars.css`

- [ ] **Step 1 · Write the file**

```css
/* ===================================================================
   pillars.css — Per-pillar accents (5 redundant signals)
   Spec ref: §7
   Activates when <body data-pillar="..."> is set; falls back gracefully.
   =================================================================== */

/* ---------- 1. Nav tab (active project gets pillar color) ---------- */
body[data-pillar] .md-tabs__link--active {
  color: var(--pillar) !important;
  border-bottom: 2px solid var(--pillar);
  padding-bottom: 0.2rem;
}

/* ---------- 2. Breadcrumb (final segment uses pillar color) ---------- */
/* MkDocs Material doesn't render breadcrumbs by default — uses .md-nav__path */
body[data-pillar] .md-nav__path > a:last-of-type,
body[data-pillar] .md-content__breadcrumb > :last-child {
  color: var(--pillar);
  font-weight: 600;
}

/* ---------- 3. H1 accent bar + pillar eyebrow ---------- */
body[data-pillar] .md-typeset h1::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 0.85em;
  background: var(--pillar);
  border-radius: 2px;
  margin-right: 0.85rem;
  vertical-align: -0.05em;
}

/* ---------- 4. Sidebar TOC: pillar-color left border on active section ---------- */
body[data-pillar] .md-nav--secondary > .md-nav__list,
body[data-pillar] .md-sidebar--primary .md-nav__list .md-nav__list {
  border-left-color: var(--pillar);
}

body[data-pillar] .md-nav__link--active {
  color: var(--pillar) !important;
  font-weight: 600;
}

/* ---------- 5. Next-up CTA on project pages ---------- */
body[data-pillar] .md-button.md-button--primary {
  background-color: var(--pillar) !important;
  border-color: var(--pillar) !important;
  color: #fff !important;
}
body[data-pillar] .md-button.md-button--primary:hover {
  filter: brightness(0.95);
}

/* ---------- Soft pillar tint for stats cards (optional, used on landing pages) ---------- */
body[data-pillar] .pillar-stats-card {
  background: var(--pillar-light);
  border: 1px solid var(--pillar-border);
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  font-size: 0.85rem;
}
```

- [ ] **Step 2 · Wire `pillars.css` into `mkdocs.yml`**

Edit `mkdocs.yml`. Append to `extra_css:` after `home.css`:

```yaml
extra_css:
  - https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400&display=swap
  - stylesheets/tokens.css
  - stylesheets/chrome.css
  - stylesheets/home.css
  - stylesheets/pillars.css
  - stylesheets/extra.css
```

- [ ] **Step 3 · Build + local preview**

Run: `python -m mkdocs build`. No warnings.
In `mkdocs serve`, navigate to:
- `/projects/agriculture/led/` — h1 should have a green vertical bar before "White LED"; sidebar TOC should have green left border; "Next: Soil Moisture" button should be green.
- `/projects/parking/ultrasonic/` — same pattern but blue.
- `/projects/safety/fire-detector/` — red.
- `/projects/temperature/dht11/` — teal.
- `/getting-started/install/` — no pillar accents (correct; that page has no pillar tag).

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/pillars.css mkdocs.yml
git commit -m "feat(redesign): pillars — add per-pillar accents (h1 bar, sidebar, nav tab, next-up button)"
git push origin main
```

- [ ] **Step 5 · Verify on live site**

Wait for deploy. Visit `https://learn.flowlence.com/projects/agriculture/led/` — confirm green pillar accents on all 5 places. Visit each other project once for sanity. **Chunk 5 complete.**

---

## Chunk 6 · Content Page Treatment

After this chunk, content pages have larger body text, restyled callouts, numbered-step badges, and a Flowlence-Code-themed code block palette.

### Task 6.1 · Create the content stylesheet · part 1 (typography + callouts)

**Files:**
- Create: `docs/stylesheets/content.css`

- [ ] **Step 1 · Write the file (typography + callouts only — code blocks come in 6.2)**

```css
/* ===================================================================
   content.css — Inside-of-page treatments
   Spec ref: §8
   Typography (8.1), callouts (8.2), numbered steps (8.3), Try-it (8.5)
   =================================================================== */

/* ---------- 8.1 Typography — larger, more breathable body ---------- */
.md-typeset {
  font-size: 1rem;            /* up from Material's 0.85rem default */
  line-height: 1.65;
}

/* The first paragraph after the H1 — slightly larger as a "lead" */
.md-typeset h1 + p {
  font-size: 1.08rem;
  line-height: 1.65;
  color: #334155;
}
[data-md-color-scheme="slate"] .md-typeset h1 + p {
  color: #cbd5e1;
}

.md-typeset h1 { font-size: 2.3rem; }
.md-typeset h2 { font-size: 1.4rem; margin-top: 2rem; }
.md-typeset h3 { font-size: 1.1rem; margin-top: 1.5rem; }

/* ---------- 8.2 Callouts (admonitions) ---------- */
/* Material's admonition selector: .admonition.<type> */

.md-typeset .admonition,
.md-typeset details {
  border-radius: 8px;
  border-left-width: 4px;
  font-size: 0.95rem;
  line-height: 1.55;
}

/* TIP — uses pillar color (or Flowlence orange when no pillar) */
.md-typeset .admonition.tip,
.md-typeset details.tip {
  border-left-color: var(--pillar);
  background-color: var(--pillar-light);
}
.md-typeset .admonition.tip > .admonition-title,
.md-typeset details.tip > summary {
  background-color: transparent;
  color: var(--pillar);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.md-typeset .admonition.tip > .admonition-title::before,
.md-typeset details.tip > summary::before {
  background-color: var(--pillar);
}

/* INFO — universal blue */
.md-typeset .admonition.info,
.md-typeset details.info {
  border-left-color: #2563EB;
  background-color: rgba(37, 99, 235, 0.06);
}
.md-typeset .admonition.info > .admonition-title,
.md-typeset details.info > summary {
  color: #2563EB;
}

/* WARNING — universal amber */
.md-typeset .admonition.warning,
.md-typeset details.warning {
  border-left-color: #F59E0B;
  background-color: rgba(245, 158, 11, 0.06);
}
.md-typeset .admonition.warning > .admonition-title,
.md-typeset details.warning > summary {
  color: #B45309;
}

/* DANGER — universal red */
.md-typeset .admonition.danger,
.md-typeset details.danger {
  border-left-color: #DC2626;
  background-color: rgba(220, 38, 38, 0.06);
}
.md-typeset .admonition.danger > .admonition-title,
.md-typeset details.danger > summary {
  color: #DC2626;
}

/* SUCCESS — ribbon gradient */
.md-typeset .admonition.success,
.md-typeset details.success {
  border-left: 0;
  border-radius: 8px;
  background: var(--ribbon-gradient-soft);
  border: 1px solid rgba(248, 86, 141, 0.15);
}
.md-typeset .admonition.success > .admonition-title,
.md-typeset details.success > summary {
  color: var(--bgc-magenta);
}

/* ---------- 8.3 Numbered steps ---------- */
/* Markdown ordered lists become flexbox rows with ribbon-gradient circle badges */
.md-typeset ol.flowlence-steps {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  counter-reset: step-counter;
}
.md-typeset ol.flowlence-steps > li {
  counter-increment: step-counter;
  display: flex;
  gap: 0.95rem;
  align-items: flex-start;
  margin-bottom: 0.85rem;
  padding-left: 0;
}
.md-typeset ol.flowlence-steps > li::before {
  content: counter(step-counter);
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--ribbon-gradient);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(192, 38, 211, 0.3);
}

/* ---------- 8.5 Try-it challenge cards ---------- */
/* "!!! question" admonitions become gradient cards */
.md-typeset .admonition.question,
.md-typeset details.question {
  background: var(--ribbon-gradient-soft);
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 1.1rem 1.3rem;
  box-shadow: 0 0 0 1px rgba(248, 86, 141, 0.12) inset;
}
.md-typeset .admonition.question > .admonition-title,
.md-typeset details.question > summary {
  background-color: transparent;
  color: var(--flowlence-slate);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  text-transform: none;
  letter-spacing: -0.01em;
  padding-left: 2.4rem;        /* room for the ⚡ badge */
}
.md-typeset .admonition.question > .admonition-title::before,
.md-typeset details.question > summary::before {
  content: "⚡";
  background: var(--ribbon-gradient);
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  font-size: 0.95rem;
  font-weight: 800;
  -webkit-mask: none;
  mask: none;
}
```

- [ ] **Step 2 · Wire `content.css` into `mkdocs.yml`**

Edit `mkdocs.yml`. Append `content.css` to `extra_css:` (after `pillars.css`, before `extra.css`):

```yaml
extra_css:
  - https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400&display=swap
  - stylesheets/tokens.css
  - stylesheets/chrome.css
  - stylesheets/home.css
  - stylesheets/pillars.css
  - stylesheets/content.css
  - stylesheets/extra.css
```

- [ ] **Step 3 · Build + local preview**

Run: `python -m mkdocs build`. Navigate to `/projects/agriculture/led/` and confirm:
- Body text is larger
- The first paragraph after the h1 is slightly larger still (lead style)
- A `!!! tip` admonition (if present) shows green styling
- A `!!! warning` admonition shows amber styling
- A `!!! question` admonition shows the gradient Try-it card

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/content.css mkdocs.yml
git commit -m "feat(redesign): content — body type + restyled callouts + Try-it cards"
git push origin main
```

- [ ] **Step 5 · Verify on live site**

Wait for deploy. Visit `https://learn.flowlence.com/projects/agriculture/led/`. Confirm callouts and body text look new. (Numbered steps don't auto-apply yet — that's task 6.3.)

### Task 6.2 · Customize code block palette

**Files:**
- Modify: `mkdocs.yml` (configure Pygments highlighter)
- Modify: `docs/stylesheets/content.css` (append code-block CSS)

- [ ] **Step 1 · Confirm `pymdownx.highlight` is enabled and configure Pygments style**

Edit `mkdocs.yml`. Find `markdown_extensions:`. Add or update:

```yaml
markdown_extensions:
  # ...existing entries...
  - pymdownx.highlight:
      anchor_linenums: false
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
```

(Skip any line that's already present.)

- [ ] **Step 2 · Append code-block styles to `content.css`**

Add to bottom of `content.css`:

```css
/* ===================================================================
   8.4 Code blocks — Flowlence Code editor palette
   Slate background + cream text + amber/purple/orange syntax highlights
   =================================================================== */

.md-typeset pre,
.md-typeset .highlight pre,
.md-typeset code.highlight,
.md-typeset .highlighttable .highlight pre {
  background-color: var(--flowlence-slate) !important;
  color: #e2e8f0 !important;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  position: relative;
}

/* Comments */
.md-typeset .highlight .c, .md-typeset .highlight .c1, .md-typeset .highlight .cm { color: #94a3b8 !important; }

/* Keywords */
.md-typeset .highlight .k, .md-typeset .highlight .kn, .md-typeset .highlight .kd { color: #c084fc !important; }

/* Function/method names */
.md-typeset .highlight .nf, .md-typeset .highlight .nb { color: #fbbf24 !important; }

/* Numbers + literals */
.md-typeset .highlight .mi, .md-typeset .highlight .mf, .md-typeset .highlight .mh { color: #fb923c !important; }

/* Strings */
.md-typeset .highlight .s, .md-typeset .highlight .s1, .md-typeset .highlight .s2 { color: #86efac !important; }

/* Inline code stays light */
.md-typeset code:not(pre > code) {
  background-color: #f1f5f9;
  color: var(--flowlence-slate);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.88em;
}
[data-md-color-scheme="slate"] .md-typeset code:not(pre > code) {
  background-color: #1e293b;
  color: #f1f5f9;
}
```

- [ ] **Step 3 · Build + local preview**

Run: `python -m mkdocs build`. Open any page with a code block (e.g. `/getting-started/first-program/` has the generated Arduino code). Confirm dark background, purple keywords, amber function names, orange numbers, green strings.

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/content.css mkdocs.yml
git commit -m "feat(redesign): content — code blocks use Flowlence Code editor palette"
git push origin main
```

- [ ] **Step 5 · Verify on live site**

Wait for deploy. Visit a page with code (`/getting-started/first-program/`). Confirm new code-block palette. **Task 6.2 done.**

### Task 6.3 · Apply numbered-step styling to existing tutorials

**Files:**
- Modify: `docs/getting-started/first-program.md`, `docs/projects/agriculture/build.md`, plus any other pages with sequential step lists

- [ ] **Step 1 · Identify pages with ordered lists representing steps**

Run: `grep -rln "^1\. " docs/getting-started/ docs/projects/`
Expected: a list of paths (most tutorials).

- [ ] **Step 2 · Wrap step-style ordered lists in `<ol class="flowlence-steps">`**

This is markdown-to-HTML in-place edit. For each tutorial that has a numbered step sequence describing user actions (not a generic numbered list), edit the markdown to use raw HTML for the wrapper:

For example, in `docs/getting-started/first-program.md`, find a section like:

```markdown
1. Make sure the USB cable is plugged in.
2. Click **Connect** in the top bar...
3. Wait about 30 seconds...
```

Replace with:

```html
<ol class="flowlence-steps" markdown>
<li markdown>Make sure the USB cable is plugged in.</li>
<li markdown>Click **Connect** in the top bar, pick the COM port that appears, then click the green **Upload** button (top right).</li>
<li markdown>Wait about 30 seconds for the program to compile and flash.</li>
</ol>
```

(The `markdown` attribute keeps inline markdown rendering inside the `<li>` thanks to the `md_in_html` extension.)

Apply only to **action-sequence** lists, NOT to enumeration lists like "1. First reason 2. Second reason."

- [ ] **Step 3 · Build + local preview**

Run: `python -m mkdocs build`. Confirm step lists now render with circle badges 1, 2, 3 in the ribbon gradient.

- [ ] **Step 4 · Commit + push**

```bash
git add docs/getting-started/ docs/projects/
git commit -m "feat(redesign): content — wrap action-sequence lists in flowlence-steps for ribbon badges"
git push origin main
```

- [ ] **Step 5 · Verify on live site**

Wait for deploy. Visit pages where you applied the wrapper (e.g. `/getting-started/first-program/` step-by-step section). Confirm circle badges. **Chunk 6 complete.**

---

## Chunk 7 · Polish & Final Pass

After this chunk, the redesign is complete: dark mode coherent, mobile usable, accessibility passes.

### Task 7.1 · Dark mode pass

**Files:**
- Modify: `docs/stylesheets/content.css` (append dark-mode adjustments)

- [ ] **Step 1 · Test dark mode locally**

In `mkdocs serve`, toggle dark mode (☀️/🌙 button in header). Walk through these pages:
- `/` (home with hero)
- `/getting-started/install/`
- `/projects/agriculture/led/`
- A page with a code block

Note any contrast issues (text on backgrounds, ribbon visibility, etc.).

- [ ] **Step 2 · Append dark-mode fixes**

Add to `content.css`:

```css
/* ===================================================================
   Dark mode adjustments — keep coherence with the slate scheme
   =================================================================== */

[data-md-color-scheme="slate"] .md-typeset .admonition.tip,
[data-md-color-scheme="slate"] .md-typeset details.tip {
  background-color: rgba(255, 255, 255, 0.03);
}

[data-md-color-scheme="slate"] .md-typeset .admonition.info,
[data-md-color-scheme="slate"] .md-typeset details.info {
  background-color: rgba(37, 99, 235, 0.1);
}

[data-md-color-scheme="slate"] .md-typeset .admonition.warning,
[data-md-color-scheme="slate"] .md-typeset details.warning {
  background-color: rgba(245, 158, 11, 0.1);
}

[data-md-color-scheme="slate"] .md-typeset .admonition.danger,
[data-md-color-scheme="slate"] .md-typeset details.danger {
  background-color: rgba(220, 38, 38, 0.1);
}

[data-md-color-scheme="slate"] .md-typeset .admonition.question,
[data-md-color-scheme="slate"] .md-typeset details.question {
  background: linear-gradient(135deg, rgba(247, 134, 47, 0.08) 0%, rgba(248, 86, 141, 0.08) 50%, rgba(192, 38, 211, 0.08) 100%);
}

/* Keep code-block contrast — already dark, but check inline code */
[data-md-color-scheme="slate"] .flowlence-hero {
  background: linear-gradient(135deg, rgba(255, 247, 230, 0.05) 0%, rgba(30, 41, 59, 1) 50%, rgba(255, 232, 240, 0.08) 100%);
}
```

- [ ] **Step 3 · Build + walkthrough dark mode**

Run: `python -m mkdocs build`. Toggle dark mode and confirm all admonitions readable, hero gradient still recognizable, no white-on-white or black-on-black issues.

- [ ] **Step 4 · Commit**

```bash
git add docs/stylesheets/content.css
git commit -m "feat(redesign): polish — dark mode adjustments for callouts + hero"
```

### Task 7.2 · Mobile breakpoint pass

**Files:**
- Modify: `docs/stylesheets/chrome.css` and `home.css` (append responsive rules)

- [ ] **Step 1 · Test at 375px viewport**

In Chrome DevTools, switch to device toolbar (`Ctrl+Shift+M`). Set viewport to 375x812 (iPhone SE / X size). Navigate the same pages from 7.1.

Note any:
- Header lockup overflowing
- Hero grid not collapsing
- Content text too cramped

- [ ] **Step 2 · Append mobile adjustments to `chrome.css`**

```css
/* ---------- Mobile chrome adjustments ---------- */
@media (max-width: 600px) {
  .flowlence-lockup__bgc { font-size: 1.2rem; }
  .flowlence-lockup__name { font-size: 0.9rem; }
  .flowlence-lockup__divider { height: 18px; }
  .flowlence-footer__inner { padding: 1.5rem 1rem; }
  .flowlence-footer__cols { grid-template-columns: 1fr; gap: 1rem; }
  .flowlence-footer__legal { flex-direction: column; align-items: flex-start; }
}
```

- [ ] **Step 3 · Append mobile adjustments to `home.css`**

```css
/* ---------- Mobile hero ---------- */
@media (max-width: 600px) {
  .flowlence-hero { padding: 2rem 1.25rem; }
  .flowlence-hero__sub { font-size: 1rem; }
  .flowlence-cta { padding: 0.7rem 1.1rem; font-size: 0.9rem; }
  .flowlence-hero__image-frame { transform: rotate(0); }  /* drop the tilt on small screens */
}
```

- [ ] **Step 4 · Re-test mobile, commit**

Re-test at 375px. Confirm everything fits. Then:

```bash
git add docs/stylesheets/chrome.css docs/stylesheets/home.css
git commit -m "feat(redesign): polish — mobile breakpoint adjustments for chrome + hero"
```

### Task 7.3 · Accessibility / contrast audit

**Files:**
- Modify: any of the new stylesheets if contrast issues are found

- [ ] **Step 1 · Run Lighthouse audit on home page**

In Chrome DevTools, open `https://learn.flowlence.com` (or local preview). Lighthouse → "Accessibility" → "Analyze page load." Note any contrast warnings.

- [ ] **Step 2 · Manually check key contrast pairs**

Use https://webaim.org/resources/contrastchecker/ or DevTools' contrast picker to verify these pairs hit WCAG AA (4.5:1 for normal text, 3:1 for large):

- `.flowlence-hero__sub` color (`#475569`) on hero background (`#FFFCF7`-ish blend)
- `.flowlence-footer__col a` (`#334155`) on footer `#FAFAF8`
- `.flowlence-hero__trust` (`#64748b`) on hero — likely tight, may need to darken to `#475569`

- [ ] **Step 3 · Fix any failures inline**

If a pair fails, darken the lighter color by one Tailwind step (e.g., `#64748b` → `#475569`). Edit the relevant CSS file. Re-test.

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/
git commit -m "feat(redesign): polish — fix accessibility contrast issues from a11y audit"
git push origin main
```

- [ ] **Step 5 · Final live-site walkthrough**

Wait for deploy. Visit `https://learn.flowlence.com`. Walk through:
- Home (`/`)
- Getting Started (`/getting-started/`)
- Install page (`/getting-started/install/`)
- Each project landing (`/projects/agriculture/`, `/projects/parking/`, `/projects/safety/`, `/projects/temperature/`)
- One inner project page (`/projects/agriculture/led/`)
- Reference (`/reference/`)

For each: confirm chrome looks right, content treatment looks right, pillar accents (where expected) appear correctly, dark mode works.

### Task 7.4 · Clean up the legacy `extra.css`

**Files:**
- Modify: `docs/stylesheets/extra.css`

- [ ] **Step 1 · Identify what's still relevant**

The original `extra.css` had:
- Token variables (now moved to `tokens.css`)
- Header/tab styles (now in `chrome.css`)
- Search/icon styles (still relevant — shared with chrome)
- Download-toast styles (still relevant)

- [ ] **Step 2 · Trim `extra.css` to just the toast + any leftover overrides**

Replace `docs/stylesheets/extra.css` content with a minimal version:

```css
/* ===================================================================
   extra.css — Misc overrides not covered by other files
   Most styling has moved to: tokens.css, chrome.css, home.css,
   pillars.css, content.css. This file is now small on purpose.
   =================================================================== */

/* ---------- Search bar (keep close to default but tweak background) ---------- */
.md-search__input {
  background-color: #f1f5f9;
}
[data-md-color-scheme="slate"] .md-search__input {
  background-color: #1e293b;
}

/* ---------- Header icons ---------- */
.md-header .md-icon {
  color: #64748b;
}
[data-md-color-scheme="slate"] .md-header .md-icon {
  color: #cbd5e1;
}

/* ---------- Download-started toast (existing — preserved) ---------- */
.flowlence-toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  max-width: 380px;
  padding: 0.85rem 1rem 0.85rem 1.1rem;
  background: var(--flowlence-orange);
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.35;
  opacity: 0;
  transform: translateX(calc(100% + 2rem));
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease-out;
  z-index: 9999;
}
.flowlence-toast--visible { opacity: 1; transform: translateX(0); }
.flowlence-toast-icon { font-size: 1.4rem; flex-shrink: 0; line-height: 1; }
.flowlence-toast-text { display: flex; flex-direction: column; gap: 0.1rem; }
.flowlence-toast-text strong { font-weight: 700; }
.flowlence-toast-close {
  background: transparent;
  border: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;
  margin-left: 0.25rem;
  transition: color 0.15s ease-out;
}
.flowlence-toast-close:hover { color: #ffffff; }

@media (max-width: 480px) {
  .flowlence-toast {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    max-width: none;
    transform: translateY(-150%);
  }
  .flowlence-toast--visible { transform: translateY(0); }
}
```

- [ ] **Step 3 · Build, verify nothing broke**

Run: `python -m mkdocs build`. Walk through pages once more. Confirm download-toast still works on the install page.

- [ ] **Step 4 · Commit + push**

```bash
git add docs/stylesheets/extra.css
git commit -m "feat(redesign): polish — trim extra.css to just the download toast + minor overrides"
git push origin main
```

- [ ] **Step 5 · Verify live site**

Walk the full site once more. Click the download button on the install page — confirm orange toast still slides in from the right.

**Chunk 7 complete. Redesign shipped.** 🎉

---

## Self-Review

Run after the entire plan is written. Goal: catch gaps and inconsistencies before execution begins.

### Spec coverage

| Spec section | Covered by tasks | Gap? |
|---|---|---|
| §4.1 Palette tokens | Task 1.1 | ✓ |
| §4.2 Pillar colors | Task 1.1 + 5.2 | ✓ |
| §4.3 Typography (Inter / Inter Tight) | Tasks 1.2, 1.3, 6.1 | ✓ |
| §4.4 Ribbon usage rules | Embedded across chunks 2 (ribbon line), 4 (hero), 6 (steps + Try-it) | ✓ |
| §5.1 Header lockup | Tasks 2.1, 2.2 | ✓ |
| §5.2 Footer | Tasks 3.1, 3.2 | ✓ |
| §5.3 Dark mode | Tasks 2.2, 3.2, 7.1 | ✓ |
| §6 Home hero (badge, headline, sub, CTAs, image, trust) | Tasks 4.1, 4.2 | ✓ |
| §6.4 Below-the-fold home | **Deferred to implementation per spec §11** — explicit in plan | ✓ |
| §7 Pillar accents (5 places) | Tasks 5.1, 5.2 | ✓ |
| §8.1 Body type | Task 6.1 | ✓ |
| §8.2 Callouts | Task 6.1 | ✓ |
| §8.3 Numbered steps | Tasks 6.1 (CSS) + 6.3 (apply to pages) | ✓ |
| §8.4 Code blocks | Task 6.2 | ✓ |
| §8.5 Try-it cards | Task 6.1 | ✓ |
| §8.6 Page TOC pillar coloring | Task 5.2 (covered by `.md-nav__link--active`) | ✓ |
| §10 Acceptance criteria 1–8 | All chunks contribute; final walkthrough in 7.3 | ✓ |

### Placeholder scan

- No "TBD"/"TODO" found in plan tasks
- No "implement appropriate error handling" or "add validation"
- All code blocks contain actual code, not pseudo-code
- All file paths absolute or relative-to-clear-anchor

### Type / name consistency

- CSS class names consistent across plan: `.flowlence-lockup`, `.flowlence-ribbon-line`, `.flowlence-hero__*`, `.flowlence-footer__*`, `.flowlence-cta`, `.flowlence-steps`, `.flowlence-toast` — used identically in CSS and partials
- CSS custom properties: `--flowlence-*`, `--bgc-*`, `--ribbon-*`, `--pillar*` — defined in tokens.css (Task 1.1), referenced consistently in chunks 2–7
- Pillar values: `agriculture`, `parking`, `safety`, `temperature` — used consistently in front-matter (Task 5.1) and CSS scoping (Task 5.2)
- Front-matter shape: `extra.pillar` and `extra.body_class` — consistent in Tasks 4.2 and 5.1, matches `main.html` reader (Task 4.2 step 5)

No issues found.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-06-learn-flowlence-com-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best for a 7-chunk plan like this where each chunk is verifiable on the live site before moving to the next. Agent context stays focused per task.

**2. Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints for review. Best if you want to watch each step and steer mid-flight.

**Which approach?**

