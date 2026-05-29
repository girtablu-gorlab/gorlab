<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/CardGrid',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import CardGrid from '$lib/CardGrid.svelte';
  import type { Exhibit } from '$lib/oddments.js';

  function makeExhibit(slug: string, name: string, overrides: Partial<Exhibit> = {}): Exhibit {
    return {
      slug,
      date: '2024-01-01',
      name,
      category: ['RPG'],
      summary: 'A brief description of this exhibit for the catalog.',
      author: 'Sample Author',
      source: null,
      'source-url': null,
      genre: 'fantasy',
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
    };
  }

  const exhibits: Exhibit[] = [
    makeExhibit('the-black-hack',              'The Black Hack',              { category: ['RPG', 'OSR'], featured: true }),
    makeExhibit('knave',                       'Knave',                       { author: 'Ben Milton', genre: 'dungeon-crawl' }),
    makeExhibit('maze-rats',                   'Maze Rats',                   { author: 'Ben Milton', category: ['Toolkit'] }),
    makeExhibit('electric-bastionland',        'Electric Bastionland',        { author: 'Chris McDowall' }),
    makeExhibit('cairn',                       'Cairn',                       { category: ['OSR', 'Adventure'] }),
    makeExhibit('into-the-odd',               'Into the Odd',                { genre: 'weird-fiction' }),
    makeExhibit('whitehack',                   'Whitehack',                   { author: 'Christian Mehrstam', cost: 'PWYW' }),
    makeExhibit('searchers-of-the-unknown',   'Searchers of the Unknown',    { cost: 'Free', category: ['OSR'] }),
  ];
</script>

<!-- Default: full 8-card grid at 2–4 columns depending on viewport -->
<Story name="Default">
  <CardGrid {exhibits} />
</Story>

<!-- Empty: "no results" placeholder with dashed border -->
<Story name="Empty">
  <CardGrid exhibits={[]} />
</Story>

<!-- Few: 2 cards — verifies the grid doesn't stretch to fill empty columns -->
<Story name="Few">
  <CardGrid exhibits={exhibits.slice(0, 2)} />
</Story>
