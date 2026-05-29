import type { Exhibit } from './oddments.js'

export interface FilterState {
  category: string
  author: string
  genre: string
  cost: string
}

export const DEFAULT_FILTER_STATE: FilterState = {
  category: 'all',
  author: 'all',
  genre: 'all',
  cost: 'all',
}

function normalize(s: string | null | undefined): string {
  return (s ?? '').toLowerCase().trim()
}

export function applyFilters(
  exhibits: Exhibit[],
  state: Pick<FilterState, 'category' | 'author' | 'genre' | 'cost'>
): Exhibit[] {
  return exhibits.filter(exhibit => {
    if (state.category !== 'all' && !exhibit.category.some(c => normalize(c) === normalize(state.category))) return false
    if (state.author !== 'all' && normalize(exhibit.author) !== normalize(state.author)) return false
    if (state.genre !== 'all' && normalize(exhibit.genre) !== normalize(state.genre)) return false
    if (state.cost !== 'all' && normalize(exhibit.cost) !== normalize(state.cost)) return false
    return true
  })
}

export function sortExhibits(exhibits: Exhibit[]): Exhibit[] {
  const featured = [...exhibits.filter(p => p.featured)].sort((a, b) => {
    const pa = a.sort_priority ?? Infinity
    const pb = b.sort_priority ?? Infinity
    if (pa !== pb) return pa - pb
    return b.date.localeCompare(a.date)
  })

  const rest = [...exhibits.filter(p => !p.featured)].sort((a, b) =>
    b.date.localeCompare(a.date)
  )

  return [...featured, ...rest]
}

export function paginate(
  exhibits: Exhibit[],
  page: number,
  perPage: number
): { items: Exhibit[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(exhibits.length / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const items = exhibits.slice((safePage - 1) * perPage, safePage * perPage)
  return { items, totalPages }
}

export function getAuthors(exhibits: Exhibit[]): string[] {
  return [...new Set(exhibits.map(p => p.author).filter((a): a is string => !!a))].sort()
}

export function getGenres(exhibits: Exhibit[]): string[] {
  return [...new Set(exhibits.map(p => p.genre).filter((g): g is string => !!g))].sort()
}

export function getCosts(exhibits: Exhibit[]): string[] {
  return [...new Set(exhibits.map(p => p.cost).filter((c): c is string => !!c))].sort()
}
