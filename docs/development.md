# Development

## Prerequisites

- Node.js ≥ 20
- npm

## Dev setup

```bash
npm install
npm run dev
```

Opens `http://localhost:5173`. The dev server reads `oddments/` directly via Node.js `fs` in the SvelteKit `load()` functions on every request. Expect a brief CPU spike on first load — all exhibits are parsed from disk each time in dev mode. The built output prerenders everything once and is served instantly.

Changes to `src/` hot-reload automatically. Changes to `oddments/` require a manual browser refresh (the files are read at request time, not watched).

Search does not function in dev mode because hot-reload prevents indexing. If you need to test search, run a `build` and `preview` as described below.

## Running tests

```bash
npm run test:unit    # Vitest unit + component tests
npm run test:e2e     # Playwright E2E tests (requires a built preview server)
npm run test         # both in sequence
```

The E2E suite requires a built site:

```bash
npm run build
npm run test:e2e
```

Playwright starts `vite preview` automatically against the built `build/` output and runs tests in Chromium headless on desktop (1280px) and mobile (375px) viewports.

## Building

```bash
npm run build
```

Outputs a fully static site to `build/`. Every route is prerendered: the catalog index, one HTML file per exhibit slug, the submission form, and the RSS feed. If `oddments/` is empty or absent the build still succeeds — exhibit pages are simply skipped and the catalog renders its empty state.

To preview the built output locally:

```bash
npm run preview
```

Opens `http://localhost:4173`. If `basePath` is set in `oddments.config.js` (required for GitHub Pages project sites), the catalog will be at `http://localhost:4173/<basePath>/` instead.

## Theming

The app uses [Skeleton UI](https://skeleton.dev) v4. Themes are CSS files that define Skeleton's custom properties under a `[data-theme='name']` selector. Tailwind utility classes in components reference those properties, so swapping a theme reskins the entire app without touching component code.

`+layout.svelte` sets `data-theme` on `<body>` at runtime via a `$effect`, which makes Skeleton's global styles (background color, base typography) pick up the theme correctly. The `theme` key in `oddments.config.js` controls which value is applied.

### Bundled presets

Six presets are imported in `src/app.css`: `cerberus`, `wintry`, `vintage`, `crimson`, `pine`, `modern`. The default is `cerberus`.

To add more Skeleton presets, import them in `src/app.css`:

```css
@import '@skeletonlabs/skeleton/themes/mona';
```

Full preset list: `cerberus`, `wintry`, `vintage`, `crimson`, `pine`, `modern`, `mona`, `vox`, `seafoam`, `mint`, `rocket`, `concord`, `nouveau`, `legacy`, `sahara`, `hamlindigo`, `rose`, `fennec`, `nosh`, `terminus`, `reign`, `catppuccin`.

### Adding a custom theme (developer path)

1. Open the [Skeleton Theme Generator](https://themes.skeleton.dev/), customize, and copy the generated CSS.
2. Save it (e.g. `src/my-theme.css`) and import it in `src/app.css`:

    ```css
    @import './my-theme.css';
    ```

3. Set `theme: "my-theme"` in `oddments.config.js`.

Site owners who don't have access to `src/` can use the `customCss` config option instead — see [starter-template/README.md](../starter-template/README.md).

### Dark mode

Dark mode uses `localStorage` + a `$effect` in `+layout.svelte`. The header toggle adds `.dark` to `<html>` and persists the preference. The `@custom-variant dark` rule in `src/app.css` scopes all dark styles to `.dark` descendants. To change the strategy, update the effect in `src/routes/+layout.svelte`.
