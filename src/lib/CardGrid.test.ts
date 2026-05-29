import { render, screen } from '@testing-library/svelte'
import CardGrid from './CardGrid.svelte'
import type { Exhibit } from './oddments.js'

function makeExhibit(overrides: Partial<Exhibit> = {}): Exhibit {
  return {
    slug: 'test-exhibit',
    date: '2024-01-01',
    name: 'Test Exhibit',
    category: [],
    summary: null,
    author: null,
    source: null,
    'source-url': null,
    genre: null,
    cost: null,
    license: null,
    'cover-image': null,
    tags: [],
    stats: null,
    subtexts: [],
    body: '',
    featured: false,
    sort_priority: null,
    imageOrientation: null,
    meta: {},
    ...overrides,
  }
}

test('shows empty state message when exhibits array is empty', () => {
  render(CardGrid, { exhibits: [] })
  expect(screen.getByText('No exhibits match your filters.')).toBeInTheDocument()
})

test('renders a list item for each exhibit', () => {
  const exhibits = [
    makeExhibit({ slug: 'exhibit-1', name: 'Exhibit One' }),
    makeExhibit({ slug: 'exhibit-2', name: 'Exhibit Two' }),
    makeExhibit({ slug: 'exhibit-3', name: 'Exhibit Three' }),
  ]
  render(CardGrid, { exhibits })
  expect(screen.getByText('Exhibit One')).toBeInTheDocument()
  expect(screen.getByText('Exhibit Two')).toBeInTheDocument()
  expect(screen.getByText('Exhibit Three')).toBeInTheDocument()
})

test('does not show empty state when exhibits are present', () => {
  render(CardGrid, { exhibits: [makeExhibit()] })
  expect(screen.queryByText('No exhibits match your filters.')).not.toBeInTheDocument()
})

test('masonry grid uses auto-rows-[10px] class', () => {
  const { container } = render(CardGrid, { exhibits: [makeExhibit()] })
  const grid = container.querySelector('ul')
  expect(grid?.className).toContain('auto-rows-[10px]')
})
