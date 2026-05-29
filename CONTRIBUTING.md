# Contributing to oddments

This doc is for developers working on the oddments framework itself: routes, components, data loading, theming, tests, and CLI.

**Are you a site owner?** You don't need any of this. See the [oddments starter](https://github.com/gulluth/oddments-starter) for setup, configuration, and usage.

## Reference

- [Architecture](docs/architecture.md) — app structure, design principles, component conventions
- [Development](docs/development.md) — dev setup, testing, building, theming

## How to contribute

1. Fork the repo and create a branch off `main`.
2. Make your changes. Run `npm run test:unit` before opening a PR.
3. Open a pull request to `main`.

Direct push to `main` is not allowed.

## CI

Every PR to `main` triggers the `build` job in `.github/workflows/build.yml`, which runs `npm run test:unit` and `npm run build`. Merging to `main` triggers a build and deploys to GitHub Pages.

E2E tests require content in `oddments/` and are not run in CI. Run them locally against your own test content before opening a PR:

```bash
npm run build
npm run test:e2e
```

PRs that add exhibits with external `cover-image` URLs are processed by `.github/workflows/fetch-covers.yml`: it downloads each image to `static/covers/`, rewrites the frontmatter, and commits the result back to the PR branch before review.

## Branch strategy

| Branch | Purpose |
| ------- | ------- |
| `main` | Package source. No demo content — `oddments/` is empty. PRs only; direct push is not allowed. |
| `gh_pages` | Live demo catalog with real content. Deployed independently; never merges from `main`. |

**`gh_pages` lifecycle (pre-npm):** Currently a full-framework branch with demo exhibits and its own copy of the app. It is not a consumer of the npm package yet — that restructure happens after v0.1.0 ships.

**`gh_pages` lifecycle (post-npm):** Once `@gulluth/oddments` is published, `gh_pages` will be restructured as a real end-user project — identical in shape to `oddments-starter`. All framework files (`src/`, `e2e/`, `svelte.config.js`, etc.) will be removed; the branch will depend on the package via `package.json`. App updates flow through version bumps only, never merges from `main`.
