import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ODDMENTS_DIR = 'oddments'
const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/
const ARRAY_FIELDS = new Set(['category', 'tags', 'subtexts'])

function normalizeHeading(value) {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('%', 'percent')
    .replaceAll('$', '')
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function todayString(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function parseCsv(input) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    const next = input[i + 1]

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"'
        i++
      } else if (char === '"') {
        quoted = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      quoted = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  row.push(cell)
  if (row.some(value => value.length > 0) || rows.length === 0) rows.push(row)
  return rows
}

function getMarkdownFiles(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return getMarkdownFiles(full)
      if (entry.isFile() && entry.name.endsWith('.md')) return [full]
      return []
    })
  } catch {
    return []
  }
}

function existingSlugs(rootDir) {
  return new Set(
    getMarkdownFiles(join(rootDir, ODDMENTS_DIR)).map(filepath =>
      basename(filepath, '.md').replace(DATE_PREFIX, ''),
    ),
  )
}

async function loadConfig(rootDir) {
  const configPath = join(rootDir, 'oddments.config.js')
  if (!existsSync(configPath)) return {}

  const configModule = await import(pathToFileURL(configPath).href)
  return configModule.default ?? {}
}

function parseValue(value, multiple) {
  const trimmed = value.trim().replace(/\n/g, ', ')
  if (!trimmed) return undefined
  if (multiple) {
    return trimmed
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  }
  if (trimmed.toLowerCase() === 'true') return true
  if (trimmed.toLowerCase() === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  return trimmed
}

function yamlScalar(value) {
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  return JSON.stringify(String(value))
}

function frontmatter(data) {
  const lines = ['---']
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`)
      for (const item of value) lines.push(`  - ${yamlScalar(item)}`)
    } else {
      lines.push(`${key}: ${yamlScalar(value)}`)
    }
  }
  lines.push('---', '')
  return `${lines.join('\n')}\n`
}

export async function importCsv(csvPath, options = {}) {
  const rootDir = options.rootDir ?? process.cwd()
  const dryRun = options.dryRun ?? false
  const date = options.date ?? todayString()
  const config = options.config ?? await loadConfig(rootDir)
  const customMultiple = new Set(
    (config.customFields ?? [])
      .filter(field => field && field.multiple === true && typeof field.key === 'string')
      .map(field => field.key),
  )
  const rows = parseCsv(readFileSync(csvPath, 'utf8'))
  const headings = rows.shift()?.map(normalizeHeading) ?? []
  const seenSlugs = existingSlugs(rootDir)
  const plannedSlugs = new Set()
  const results = []

  for (const row of rows) {
    if (row.every(cell => cell.trim() === '')) continue

    const name = row[0]?.trim()
    const slug = slugify(name)
    if (!slug) {
      results.push({ status: 'skipped', reason: 'missing-slug', source: name ?? '' })
      continue
    }

    const filepath = join(rootDir, ODDMENTS_DIR, `${date}-${slug}.md`)
    const relativePath = join(ODDMENTS_DIR, `${date}-${slug}.md`)

    if (seenSlugs.has(slug) || plannedSlugs.has(slug)) {
      results.push({ status: 'skipped', reason: 'existing-slug', slug, path: relativePath })
      continue
    }

    const data = {}
    for (let i = 0; i < headings.length; i++) {
      const key = headings[i]
      if (!key) continue
      const value = parseValue(row[i] ?? '', ARRAY_FIELDS.has(key) || customMultiple.has(key))
      if (value !== undefined) data[key] = value
    }

    plannedSlugs.add(slug)
    results.push({ status: dryRun ? 'planned' : 'written', slug, path: relativePath })

    if (!dryRun) {
      mkdirSync(join(rootDir, ODDMENTS_DIR), { recursive: true })
      writeFileSync(filepath, frontmatter(data))
    }
  }

  return results
}

export function summarizeImport(results, dryRun = false) {
  const planned = results.filter(result => result.status === 'planned').length
  const written = results.filter(result => result.status === 'written').length
  const skipped = results.filter(result => result.status === 'skipped').length
  const action = dryRun ? 'would write' : 'wrote'
  return `Import ${action} ${dryRun ? planned : written} file(s), skipped ${skipped}.`
}
