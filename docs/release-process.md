# Release process

Steps to cut a new oddments release. Run these in order.

## 1. Pre-release checks

- All tests pass: `npm run test`
- Branch is on `main` and clean (no uncommitted changes)
- Changelog / PR descriptions are up to date

## 2. Bump versions

Edit `package.json` — increment `version` to the new semver:

```json
"version": "X.Y.Z"
```

Edit `starter-template/package.json` — update the `@gulluth/oddments` dependency to match:

```json
"@gulluth/oddments": "^X.Y.Z"
```

## 3. Update the lockfile

```bash
npm install
```

This regenerates `package-lock.json` with the new version. Commit the lockfile alongside the version bumps.

## 4. Commit

```sh
chore: release vX.Y.Z
```

Stage `package.json`, `package-lock.json`, and `starter-template/package.json`, then commit with the message above.

## 5. Tag and push

```bash
git tag vX.Y.Z
git push origin main --tags
```

Pushing the tag triggers the `publish.yml` workflow which runs tests and publishes to npm.

## 6. Verify

Check the **Actions** tab on GitHub. The publish job should complete successfully and the new version should appear on npm.

## 7. Sync starter-template to oddments-starter

The `oddments-starter` repo is the public template. After a release, sync any updated files from `starter-template/` into it:

| Source (oddments) | Destination (oddments-starter) |
| --- | --- |
| `starter-template/package.json` | `package.json` |
| `starter-template/oddments.config.js` | `oddments.config.js` |
| `starter-template/README.md` | `README.md` |

Copy changed files, commit in oddments-starter, and push:

```bash
# From the oddments-starter directory
git add .
git commit -m "chore: sync from oddments vX.Y.Z"
git push
```
