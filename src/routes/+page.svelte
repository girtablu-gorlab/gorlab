<script lang="ts">
  import { onMount, untrack } from 'svelte'
  import { base } from '$app/paths'
  import type { Exhibit } from '$lib/oddments.js'
  import type { ImageOrientation } from '$lib/config.js'
  import CardGrid from '$lib/CardGrid.svelte'
  import FilterBar from '$lib/FilterBar.svelte'
  import TagCloud from '$lib/TagCloud.svelte'
  import Pagination from '$lib/Pagination.svelte'
  import { sortExhibits } from '$lib/filters.js'

  const { data } = $props()

  interface PagefindMeta {
    title?: string
    summary?: string
    'cover-image'?: string
    featured?: string
    category?: string
    author?: string
    cost?: string
    date?: string
    imageOrientation?: string
  }

  interface PagefindResultData {
    url: string
    meta: PagefindMeta
  }

  let filterCategory = $state('all')
  let filterAuthor = $state('all')
  let filterGenre = $state('all')
  let filterCost = $state('all')
  let filterTag = $state('all')
  let filterQuery = $state('')
  let currentPage = $state(1)

  let pagefindReady = $state(false)
  let loading = $state(true)
  let unavailable = $state(false)
  let filtersOpen = $state(false)
  let allExhibits = $state<Exhibit[]>([])
  let categories = $state<string[]>([])
  let authors = $state<string[]>([])
  let genres = $state<string[]>([])
  let costs = $state<string[]>([])

  let pagefind: {
    init: () => Promise<void>
    search: (q: string | null, opts?: { filters?: Record<string, string> }) => Promise<{ results: { data: () => Promise<PagefindResultData> }[] }>
    filters: () => Promise<Record<string, Record<string, number>>>
    options: (o: object) => Promise<void>
  } | null = null

  function resultToExhibit(r: PagefindResultData): Exhibit {
    const slug = r.url.replace(/^.*\/exhibit\//, '').replace(/\/$/, '')
    return {
      slug,
      date: r.meta.date ?? '',
      name: r.meta.title ?? null,
      category: r.meta.category ? r.meta.category.split(', ') : [],
      summary: r.meta.summary ?? null,
      author: r.meta.author ?? null,
      source: null,
      'source-url': null,
      genre: null,
      cost: r.meta.cost ?? null,
      license: null,
      'cover-image': r.meta['cover-image'] ?? null,
      tags: [],
      stats: null,
      subtexts: [],
      body: '',
      featured: r.meta.featured === 'true',
      sort_priority: null,
      imageOrientation: (r.meta.imageOrientation as ImageOrientation) ?? null,
      meta: {},
    }
  }

  async function runSearch() {
    if (!pagefind) return
    loading = true
    try {
      const q = filterQuery.trim()
      const filters: Record<string, string> = {}
      if (filterCategory !== 'all') filters.category = filterCategory
      if (filterAuthor !== 'all') filters.author = filterAuthor
      if (filterGenre !== 'all') filters.genre = filterGenre
      if (filterCost !== 'all') filters.cost = filterCost
      if (filterTag !== 'all') filters.tag = filterTag

      const search = await pagefind.search(
        q || null,
        Object.keys(filters).length ? { filters } : undefined
      )
      const results = await Promise.all(search.results.map(r => r.data()))
      allExhibits = results.map(resultToExhibit)
    } finally {
      loading = false
    }
  }

  async function initPagefind() {
    if (data.totalExhibits === 0) {
      loading = false
      return
    }
    try {
      pagefind = await import(/* @vite-ignore */ `${base}/pagefind/pagefind.js`)
      if (base) await pagefind!.options({ baseUrl: base })
      await pagefind!.init()
      const available = await pagefind!.filters()
      categories = Object.keys(available.category ?? {}).sort()
      authors = Object.keys(available.author ?? {}).sort()
      genres = Object.keys(available.genre ?? {}).sort()
      costs = Object.keys(available.cost ?? {}).sort()
      pagefindReady = true
    } catch {
      unavailable = true
      loading = false
    }
  }

  function readUrlParams() {
    const p = new URLSearchParams(window.location.search)
    filterCategory = p.get('category') ?? 'all'
    filterAuthor = p.get('author') ?? 'all'
    filterGenre = p.get('genre') ?? 'all'
    filterCost = p.get('cost') ?? 'all'
    filterTag = p.get('tag') ?? 'all'
    filterQuery = p.get('q') ?? ''
  }

  function writeUrlParams() {
    const p = new URLSearchParams()
    if (filterCategory !== 'all') p.set('category', filterCategory)
    if (filterAuthor !== 'all') p.set('author', filterAuthor)
    if (filterGenre !== 'all') p.set('genre', filterGenre)
    if (filterCost !== 'all') p.set('cost', filterCost)
    if (filterTag !== 'all') p.set('tag', filterTag)
    if (filterQuery) p.set('q', filterQuery)
    const qs = p.toString()
    history.replaceState(history.state, '', qs ? `?${qs}` : location.pathname)
  }

  onMount(async () => {
    readUrlParams()
    await initPagefind()
  })

  $effect(() => {
    pagefindReady
    filterCategory; filterAuthor; filterGenre; filterCost; filterTag; filterQuery
    if (!pagefindReady) return
    untrack(() => {
      writeUrlParams()
      currentPage = 1
      runSearch()
    })
  })

  const pageSize = $derived(data.config.exhibitsPerPage)
  const sorted = $derived(sortExhibits(allExhibits))
  const totalPages = $derived(Math.max(1, Math.ceil(sorted.length / pageSize)))
  const paginated = $derived(
    sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  )
  const skeletonCount = $derived(Math.min(pageSize, data.totalExhibits))
</script>

{#snippet skeletonGrid()}
  <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" aria-busy="true" aria-label="Loading exhibits">
    {#each { length: skeletonCount } as _}
      <li>
        <div class="card overflow-hidden animate-pulse">
          <div class="aspect-3/2 bg-surface-200-800 w-full"></div>
          <div class="p-4 flex flex-col gap-3">
            <div class="h-4 bg-surface-200-800 rounded w-3/4"></div>
            <div class="h-3 bg-surface-200-800 rounded w-full"></div>
            <div class="h-3 bg-surface-200-800 rounded w-5/6"></div>
            <div class="flex gap-2 mt-1">
              <div class="h-5 w-16 bg-surface-200-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ul>
{/snippet}

<div class="px-4 py-6 max-w-7xl mx-auto">
  <div class="flex flex-col gap-3 mb-6">
    <!-- Search + mobile filter toggle -->
    <div class="flex gap-2 items-center">
      <input
        type="search"
        placeholder="Search exhibits…"
        bind:value={filterQuery}
        class="input flex-1"
        aria-label="Search exhibits"
      />
      {#if data.config.showFilterBar}
        <button
          class="md:hidden btn preset-tonal text-sm shrink-0"
          onclick={() => { filtersOpen = !filtersOpen }}
          aria-expanded={filtersOpen}
        >
          {filtersOpen ? 'Close' : 'Filters'}
        </button>
      {/if}
    </div>

    <TagCloud
      {categories}
      bind:selected={filterCategory}
      show={data.config.showTagCloud}
    />

    <!-- FilterBar: collapsible on mobile, always visible on desktop -->
    <div class="{filtersOpen ? 'block' : 'hidden'} md:block">
      <FilterBar
        {categories}
        {authors}
        {genres}
        {costs}
        bind:category={filterCategory}
        bind:author={filterAuthor}
        bind:genre={filterGenre}
        bind:cost={filterCost}
        show={data.config.showFilterBar}
        showCost={data.config.showCost}
      />
    </div>

    {#if filterTag !== 'all'}
      <div class="flex items-center gap-2">
        <span class="text-xs opacity-60">Tag:</span>
        <button
          class="chip preset-filled text-xs inline-flex items-center gap-1"
          onclick={() => { filterTag = 'all' }}
          aria-label="Clear tag filter: {filterTag}"
        >
          {filterTag}
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    {/if}
  </div>

  {#if data.totalExhibits === 0}
    <div class="flex items-center justify-center min-h-48 border border-current border-dashed rounded">
      <p class="opacity-40 text-sm">No exhibits in the catalog yet.</p>
    </div>
  {:else if unavailable}
    <div class="flex items-center justify-center min-h-48 border border-current border-dashed rounded">
      <div class="text-center opacity-50">
        <p class="text-sm">Search index not available.</p>
        <p class="text-xs mt-1">Run <code>npm run build</code> to generate the search index.</p>
      </div>
    </div>
  {:else if loading}
    {@render skeletonGrid()}
  {:else}
    <p class="text-xs opacity-50 mb-4">
      {sorted.length} exhibit{sorted.length === 1 ? '' : 's'}
    </p>

    <CardGrid exhibits={paginated} />

    {#if totalPages > 1}
      <div class="mt-8 flex justify-center">
        <Pagination
          count={sorted.length}
          pageSize={data.config.exhibitsPerPage}
          bind:page={currentPage}
        />
      </div>
    {/if}
  {/if}
</div>
