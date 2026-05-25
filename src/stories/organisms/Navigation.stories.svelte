<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import TagCloud from '$lib/TagCloud.svelte';
  import FilterBar from '$lib/FilterBar.svelte';

  const categories = ['Adventure', 'Horror', 'Mystery', 'Romance', 'Sci-Fi'];
  const authors    = ['Alex Smith', 'Jordan Lee', 'Sam Taylor', 'Morgan Chen'];
  const genres     = ['Fantasy', 'Sci-Fi', 'Horror', 'Contemporary'];
  const costs      = ['Free', 'PWYW', '$5–$15', '$15+'];
</script>

<!-- Menu: the top navigation bar from +layout.svelte -->
<Story name="Menu">
  <header class="w-full border-b border-surface-200-800 px-4 py-3 flex items-center justify-between gap-4">
    <a href="/" class="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
      Site Title
    </a>
    <div class="flex items-center gap-3">
      <a href="/submit/" class="text-sm opacity-60 hover:opacity-100 transition-opacity">Submit</a>
      <button class="btn-icon preset-tonal size-8" aria-label="Toggle dark mode">
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  </header>
</Story>

<!-- ContentFilters: TagCloud + FilterBar as they appear together on the home page -->
<Story name="ContentFilters">
  <div class="flex w-full flex-col gap-3">
    <TagCloud {categories} selected="all" />
    <FilterBar
      {categories} {authors} {genres} {costs}
      category="all" author="all" genre="all" cost="all"
    />
  </div>
</Story>

<!-- ContentFiltersActive: both controls with a selection in force — isDirty state -->
<Story name="ContentFiltersActive">
  <div class="flex w-full flex-col gap-3">
    <TagCloud {categories} selected="Horror" />
    <FilterBar
      {categories} {authors} {genres} {costs}
      category="Horror" author="all" genre="all" cost="all"
    />
  </div>
</Story>

<!-- CloudOnly: TagCloud without the dropdown bar (showFilterBar = false config) -->
<Story name="CloudOnly">
  <TagCloud {categories} selected="all" />
</Story>

<!-- BarOnly: FilterBar without the cloud (showTagCloud = false config) -->
<Story name="BarOnly">
  <FilterBar
    {categories} {authors} {genres} {costs}
    category="all" author="all" genre="all" cost="all"
  />
</Story>
