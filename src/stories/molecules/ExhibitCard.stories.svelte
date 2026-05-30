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
        description: 'Controls whether card media is shown. Exhibit pages still use this for layout.',
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

  const landscapeCover =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720"%3E%3Crect width="1200" height="720" fill="%232c5f5d"/%3E%3Ccircle cx="920" cy="190" r="150" fill="%23f0c46b"/%3E%3Cpath d="M0 520 260 350l170 105 210-190 250 255 150-120 160 120v200H0z" fill="%23d95d39"/%3E%3C/svg%3E';
  const portraitCover =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1100"%3E%3Crect width="720" height="1100" fill="%23344156"/%3E%3Cpath d="M95 150h530v800H95z" fill="%23efe3c8"/%3E%3Cpath d="M155 245h410v85H155zm0 145h305v45H155zm0 75h360v45H155zm0 75h260v45H155z" fill="%2381465b"/%3E%3Ccircle cx="360" cy="760" r="120" fill="%232c8c77"/%3E%3C/svg%3E';

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
    'cover-image': landscapeCover,
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

<!-- Default: image keeps its natural dimensions on cards -->
<Story name="Default">
  {#snippet template(args)}
    <div class="w-56">
      <ExhibitCard exhibit={{ ...base, imageOrientation: args.imageOrientation }} />
    </div>
  {/snippet}
</Story>

<!-- Landscape: wide image renders at its natural ratio on cards -->
<Story name="Landscape">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, 'cover-image': landscapeCover, imageOrientation: 'landscape' }} />
  </div>
</Story>

<!-- Portrait: tall image renders at its natural ratio on cards -->
<Story name="Portrait">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, 'cover-image': portraitCover, imageOrientation: 'portrait' }} />
  </div>
</Story>

<!-- None: image area hidden; content fills the full card -->
<Story name="None">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, imageOrientation: 'none' }} />
  </div>
</Story>

<!-- MissingCover: no placeholder media box is rendered -->
<Story name="MissingCover">
  <div class="w-56">
    <ExhibitCard exhibit={{ ...base, 'cover-image': null }} />
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

<!-- ThreeUp: mixed image dimensions in a grid -->
<Story name="ThreeUp">
  <div class="grid grid-cols-3 gap-6 max-w-2xl">
    <ExhibitCard exhibit={{ ...base, 'cover-image': landscapeCover, imageOrientation: 'landscape' }} />
    <ExhibitCard exhibit={{ ...base, 'cover-image': portraitCover, slug: 'knave', name: 'Knave', author: 'Ben Milton', featured: true, imageOrientation: 'portrait' }} />
    <ExhibitCard exhibit={{ ...base, 'cover-image': null, slug: 'maze-rats', name: 'Maze Rats', author: 'Ben Milton', category: ['Toolkit'], summary: null }} />
  </div>
</Story>
