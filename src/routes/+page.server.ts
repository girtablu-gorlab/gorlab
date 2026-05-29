import { parseOddments } from '$lib/oddments.js'
import { config } from '$lib/catalog.js'

export const prerender = true

export function load() {
  const exhibits = parseOddments(process.env.ODDMENTS_DIR ?? 'oddments', config.customFields)
  return {
    totalExhibits: exhibits.length,
    config,
  }
}
