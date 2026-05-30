import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { describe, expect, it, afterEach } from 'vitest'
import matter from 'gray-matter'
import { importCsv, summarizeImport } from './import-csv.js'

const roots = []

function makeRoot() {
  const root = mkdtempSync(join(tmpdir(), 'oddments-import-'))
  roots.push(root)
  return root
}

const config = {
  customFields: [{ key: 'contributors', label: 'Contributors', type: 'text', multiple: true }],
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true })))
})

describe('importCsv', () => {
  it('writes CSV rows as dated markdown files in flat oddments directory', async () => {
    const root = makeRoot()
    const csv = join(root, 'data.csv')
    writeFileSync(csv, 'name,category,tags,summary,contributors\nBlack Hack,"RPG, OSR","rules-light, fantasy",A compact ruleset,"Alice, Bob"\n')

    const results = await importCsv(csv, { rootDir: root, date: '2026-05-30', config })
    const output = join(root, 'oddments', '2026-05-30-black-hack.md')
    const parsed = matter(readFileSync(output, 'utf8'))

    expect(results).toEqual([{ status: 'written', slug: 'black-hack', path: join('oddments', '2026-05-30-black-hack.md') }])
    expect(parsed.data).toMatchObject({
      name: 'Black Hack',
      category: ['RPG', 'OSR'],
      tags: ['rules-light', 'fantasy'],
      summary: 'A compact ruleset',
      contributors: ['Alice', 'Bob'],
    })
  })

  it('skips existing slugs without clobbering files', async () => {
    const root = makeRoot()
    await mkdir(join(root, 'oddments'), { recursive: true })
    const existing = join(root, 'oddments', '2024-01-01-black-hack.md')
    writeFileSync(existing, 'original')
    const csv = join(root, 'data.csv')
    writeFileSync(csv, 'name,category\nBlack Hack,RPG\n')

    const results = await importCsv(csv, { rootDir: root, date: '2026-05-30', config })

    expect(results).toEqual([{ status: 'skipped', reason: 'existing-slug', slug: 'black-hack', path: join('oddments', '2026-05-30-black-hack.md') }])
    expect(readFileSync(existing, 'utf8')).toBe('original')
  })

  it('does not write files during dry-run', async () => {
    const root = makeRoot()
    const csv = join(root, 'data.csv')
    writeFileSync(csv, 'name,category\nNew Exhibit,RPG\n')

    const results = await importCsv(csv, { rootDir: root, date: '2026-05-30', dryRun: true, config })

    expect(results).toEqual([{ status: 'planned', slug: 'new-exhibit', path: join('oddments', '2026-05-30-new-exhibit.md') }])
    expect(() => readFileSync(join(root, 'oddments', '2026-05-30-new-exhibit.md'), 'utf8')).toThrow()
    expect(summarizeImport(results, true)).toBe('Import would write 1 file(s), skipped 0.')
  })

})
