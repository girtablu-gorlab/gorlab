<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ImageOrientation } from '$lib/config.js';

  const { Story } = defineMeta({
    title: 'Molecules/ExhibitCard',
    tags: ['autodocs'],
    argTypes: {
      imageOrientation: {
        control: 'radio',
        options: ['landscape', 'portrait', 'none'] satisfies ImageOrientation[],
        description: 'Image aspect ratio and layout. Mirrors the per-exhibit frontmatter field.',
      },
    },
    args: {
      imageOrientation: 'landscape' satisfies ImageOrientation,
    },
  });
</script>

<script lang="ts">
  import ExhibitCard from '$lib/ExhibitCard.svelte';
  import type { Exhibit } from '$lib/oddments.js';

  const base: Exhibit = {
    slug: 'the-black-hack',
    date: '2023-04-01',
    name: 'The Black Hack',
    category: ['RPG', 'OSR'],
    summary: 'A super-streamlined roleplaying game that uses the original 1970s rules as a base. Simple, fast, lethal.',
    author: 'David Black',
    source: 'itch.io',
    'source-url': 'https://www.itch.io',
    genre: 'fantasy',
    cost: 'PWYW',
    license: 'CC BY 4.0',
    'cover-image': null,
    tags: ['osr', 'dungeon-crawl'],
    stats: null,
    subtexts: [],
    body: '',
    featured: false,
    sort_priority: null,
    imageOrientation: null,
    meta: {},
  };
</script>

<!-- Default: toggle imageOrientation in the Controls panel -->
<Story name="Default">
  {#snippet template(args)}
    <div class="w-56">
      <ExhibitCard exhibit={{ ...base, imageOrientation: args.imageOrientation }} />
    </div>
  {/snippet}
</Story>

<!-- Landscape: 3:2 image box — for wide cover images (A5/half-letter landscape) -->
<Story name="Landscape">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, imageOrientation: 'landscape' }} />
  </div>
</Story>

<!-- Portrait: 2:3 image box — for tall cover images (A5/half-letter portrait, book covers) -->
<Story name="Portrait">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, imageOrientation: 'portrait' }} />
  </div>
</Story>

<!-- None: image area hidden; content fills the full card -->
<Story name="None">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, imageOrientation: 'none' }} />
  </div>
</Story>

<!-- Featured: primary ring accent for highlighted entries -->
<Story name="Featured">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, featured: true }} />
  </div>
</Story>

<!-- Minimal: only slug and name — no summary, author, or categories -->
<Story name="Minimal">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, summary: null, author: null, cost: null, category: [] }} />
  </div>
</Story>

<!-- ThreeUp: mixed orientations in a grid to preview per-exhibit overrides -->
<Story name="ThreeUp">
  <div class="grid grid-cols-3 gap-6 max-w-2xl">
    <ExhibitCard exhibit={{ ...base, imageOrientation: 'landscape' }} />
    <ExhibitCard exhibit={{ ...base, slug: 'knave', name: 'Knave', author: 'Ben Milton', featured: true, imageOrientation: 'portrait' }} />
    <ExhibitCard exhibit={{ ...base, slug: 'maze-rats', name: 'Maze Rats', author: 'Ben Milton', category: ['Toolkit'], summary: null, imageOrientation: 'none' }} />
  </div>
</Story>
