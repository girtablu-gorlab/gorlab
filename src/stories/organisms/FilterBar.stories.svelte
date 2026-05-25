<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/FilterBar',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import FilterBar from '$lib/FilterBar.svelte';

  const categories = ['Adventure', 'Horror', 'Mystery', 'Romance', 'Sci-Fi'];
  const authors    = ['Alex Smith', 'Jordan Lee', 'Sam Taylor', 'Morgan Chen'];
  const genres     = ['Fantasy', 'Sci-Fi', 'Horror', 'Contemporary', 'Historical'];
  const costs      = ['Free', 'PWYW', '$5–$15', '$15+'];
</script>

<!-- Default: all filters at their reset state (isDirty = false) -->
<Story name="Default">
  <FilterBar
    {categories} {authors} {genres} {costs}
    category="all" author="all" genre="all" cost="all"
  />
</Story>

<!-- ActiveFilters: pre-selected values show isDirty = true and a green clear button -->
<Story name="ActiveFilters">
  <FilterBar
    {categories} {authors} {genres} {costs}
    category="Horror" author="all" genre="Fantasy" cost="all"
  />
</Story>

<!-- NoCostColumn: showCost=false hides the cost dropdown -->
<Story name="NoCostColumn">
  <FilterBar
    {categories} {authors} {genres} {costs}
    category="all" author="all" genre="all" cost="all"
    showCost={false}
  />
</Story>
