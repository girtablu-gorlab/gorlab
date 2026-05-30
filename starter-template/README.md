# My Catalog

A filterable card catalog built with [Oddments](https://github.com/gulluth/oddments).

## Quick start

### GitHub UI

1. Click **Use this template** → create your repo
2. **In your new repo**, go to **Settings → Pages**, set Source to **GitHub Actions**
3. Edit `oddments.config.js` → set your `title` → commit → site deploys automatically
4. Add exhibits to `oddments/` → commit → site updates automatically

### For local development (optional)

```bash
git clone your-repo
npm install
npm run dev       # preview at http://localhost:5173
```

### Codespaces or Dev Containers

This template includes a `.devcontainer/` setup for GitHub Codespaces and local Docker-based development. Open the repo in Codespaces, or use VS Code's **Dev Containers: Reopen in Container** command, then run:

```bash
npm run dev
```

CLI commands work there too:

```bash
npx oddments import template.csv --dry-run
npx oddments covers --dry-run
```

## Adding content

Each exhibit is a Markdown file with YAML frontmatter in `oddments/`.

**Filename format:** `slug.md` or `YYYY-MM-DD-slug.md` if you want to control sort order by publication date.

```yaml
---
name: My Exhibit Title       # required — the only mandatory field
category:                     # recommended — drives tag cloud and filters
  - systems
author: Author Name
source: itch.io               # platform name
source-url: https://example.itch.io/my-exhibit
genre: horror
summary: A one-line description shown on the card.
cost: free                    # free / PWYW / $5.00 / etc.
license: CC BY 4.0
cover-image: https://example.com/cover.png
tags:
  - one-shot
  - investigation
# Optional extended fields
stats: 8 HP, 1 Armor, 10 STR
subtexts:
  - "First bullet point on the entry page."
  - "Second bullet point."
featured: true                # featured exhibits get a highlighted card accent
imageOrientation: portrait    # landscape | portrait | none — overrides global config
published: false              # optional — hide this exhibit without deleting it
---

Optional markdown body rendered on the exhibit page. Delete this if unused.
```

Only `name` is required. Every other field degrades gracefully when absent.

Exhibits are published by default. Add `published: false` to keep a file in
your repo while excluding it from the catalog, search, filters, exhibit pages,
and RSS feed.

## Page sections

Add optional Markdown files in the root of your repository:

```sh
hero.md   # appears above the catalog
body.md   # appears below the catalog
```

Both files support frontmatter:

```md
---
published: false
---

# Hidden for now
```

Missing `published` means the section is published.

### Cover images

You can leave `cover-image` as an external URL, or download external cover images into `static/covers/` when you want local copies:

```bash
npx oddments covers
```

This rewrites matching exhibit frontmatter from external URLs to local `/covers/...` paths. Existing local cover files are reused, not overwritten.

Preview the changes first with:

```bash
npx oddments covers --dry-run
```

To add a cover image locally, place the file in `static/covers/` and set:

```yaml
cover-image: /covers/filename.(jpg|gif|png|webp)
```

## Exhibits structure

Exhibits can live directly in `oddments/` or in any subdirectory:

```sh
oddments/
  my-adventure.md                   ← flat, no date
  2024-01-02-my-system.md           ← flat, with date prefix for sort order
  zines/
    my-zine.md                      ← in a subdir
```

Exhibits with a `YYYY-MM-DD-` prefix sort before undated exhibits (newest date first). Undated exhibits sort after all dated ones.

Subdirectory names have no effect on categories. Categories come only from the `category:` field in each exhibit's frontmatter. Organize subdirectories however makes sense for you, the catalog ignores the folder structure.

## Configuration

Edit `oddments.config.js`. Every option is documented inline. Common settings:

```js
export default {
  title: "My Catalog",
  // description: "",
  // icon: "/icon.svg",      // small custom SVG or PNG shown before the title
  // logo: "/logo.svg",      // custom SVG or PNG that replaces icon + title
  // siteUrl: "https://username.github.io/my-catalog",
  // theme: "vintage",        // cerberus | wintry | vintage | crimson | pine | modern
  // cardLayout: 'masonry',   // masonry (default) | grid
  // exhibitsPerPage: 24,
  // imageOrientation: 'landscape',  // landscape | portrait | none
  // showCost: false,
  // copyright: "(c) 2026 My Catalog",
  // copyrightUrl: "https://example.com/license",
  // instagram: "https://instagram.com/example",
  // itch: "https://example.itch.io",
  // github: "https://github.com/example",
}
```

`cardLayout` controls how cards are arranged on the catalog page:

| Value               | Behavior                                                      |
| ------------------- | ------------------------------------------------------------- |
| `masonry` (default) | Variable-height cards; gaps collapse. Best for mixed content. |
| `grid`              | Uniform rows; all cards in a row share the same height.       |

`imageOrientation` controls how cover images are displayed on cards and exhibit pages. Set it to match the shape of your cover images:

| Value                 | Card image box | Exhibit page layout       |
| --------------------- | -------------- | ------------------------- |
| `landscape` (default) | 3:2 (wide)     | Image stacked above text  |
| `portrait`            | 2:3 (tall)     | Image left, text right    |
| `none`                | Hidden         | No image, text full width |

Individual exhibits can override the global setting with `imageOrientation:` in their frontmatter.

## Theming

### Preset themes

Set `theme` in `oddments.config.js`:

| Name       | Character      |
| ---------- | -------------- |
| `cerberus` | Dark, moody    |
| `wintry`   | Cool blues     |
| `vintage`  | Warm, aged     |
| `crimson`  | Red, horror    |
| `pine`     | Earthy greens  |
| `modern`   | Clean, minimal |

The default is `cerberus`. Commit the config change and the site redeploys.

### Custom themes

1. Create a theme CSS file at the [Skeleton UI Theme Generator](https://themes.skeleton.dev/)
2. Save it to `static/my-theme.css`
3. In `oddments.config.js`:

```js
theme: "my-theme",
customCss: "/my-theme.css",
```

### Custom CSS

To tweak styles without replacing the whole theme, point `customCss` at a file in `static/`:

```js
customCss: "/my-styles.css",
```

## Deployment (GitHub Pages)

1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to **GitHub Actions**
3. Push to `main` → the workflow builds and deploys automatically

For project sites (`username.github.io/my-catalog`), uncomment `basePath` in `oddments.config.js`:

```js
basePath: '/my-catalog',
```

## Upgrading

### GitHub

Edit `package.json`, bump the version number in `"@gulluth/oddments": "^x.y.z"`, save. The Github Actions run `npm install` which resolves the new version automatically.

### Local

```bash
npm update @gulluth/oddments
```

Then push — GitHub Actions rebuilds with the new version.

## Custom fields

If your catalog needs fields beyond the standard set, declare them in `oddments.config.js`:

```js
customFields: [
  { key: "page_count", label: "Pages",     type: "text", multiple: false },
  { key: "publisher",  label: "Publisher", type: "text", multiple: false },
  { key: "system",     label: "System",    type: "text", multiple: true  },
],
```

Then add the corresponding keys to your exhibit frontmatter. Fields not declared here are ignored.

## Bulk import from CSV

If you have existing data in a spreadsheet, export it as CSV and run:

```bash
npx oddments import path/to/data.csv
```

The starter includes `template.csv` with the standard column headings. Duplicate it, add your rows, then import the copy.

The first row must be column headings. Headings are normalized to frontmatter keys, matching the legacy importer: spaces become hyphens, `%` becomes `percent`, and `$` is removed. The first column is used to build the exhibit slug and filename.

Imported files are written flat into `oddments/` as `YYYY-MM-DD-slug.md` using today's date. Existing exhibits are never overwritten; if any markdown file under `oddments/` already has the same slug, that CSV row is skipped.

Use `--dry-run` to preview the files that would be created:

```bash
npx oddments import path/to/data.csv --dry-run
```

Comma-separated values in `category`, `tags`, `subtexts`, and any `customFields` marked `multiple: true` are written as frontmatter arrays.
