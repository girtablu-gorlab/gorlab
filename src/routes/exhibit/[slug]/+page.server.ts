import { parseOddments } from '$lib/oddments.js'
import { config } from '$lib/catalog.js'
import { error } from '@sveltejs/kit'
import { marked } from 'marked'

export const prerender = true

export function entries() {
  return parseOddments(process.env.ODDMENTS_DIR ?? 'oddments', config.customFields).map(p => ({ slug: p.slug }))
}

export function load({ params }) {
  const exhibit = parseOddments(process.env.ODDMENTS_DIR ?? 'oddments', config.customFields).find(p => p.slug === params.slug)
  if (!exhibit) error(404, `Exhibit not found: ${params.slug}`)
  const bodyHtml = exhibit.body ? String(marked(exhibit.body)) : ''
  return { exhibit, config, bodyHtml }
}
