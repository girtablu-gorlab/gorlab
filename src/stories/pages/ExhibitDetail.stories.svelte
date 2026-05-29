<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ImageOrientation } from '$lib/config.js';

  const { Story } = defineMeta({
    title: 'Pages/ExhibitDetail',
    parameters: { layout: 'fullscreen' },
    argTypes: {
      imageOrientation: {
        control: 'radio',
        options: ['landscape', 'portrait', 'none'] satisfies ImageOrientation[],
        description: 'Image layout. Mirrors the per-exhibit frontmatter field.',
      },
    },
    args: {
      imageOrientation: 'landscape' satisfies ImageOrientation,
    },
  });
</script>

<script lang="ts">
  import { config } from '$lib/catalog.js';
  import type { Exhibit } from '$lib/oddments.js';
  import AppShell from '$lib/AppShell.svelte';
  import Page from '../../routes/exhibit/[slug]/+page.svelte';

  const base: Exhibit = {
    slug: 'the-black-hack',
    date: '2016-04-01',
    name: 'The Black Hack',
    category: ['RPG', 'OSR'],
    summary: 'A super-streamlined roleplaying game that uses the original 1970s rules as a base. Simple, fast, and deadly — character creation takes minutes.',
    author: 'David Black',
    source: 'itch.io',
    'source-url': 'https://www.itch.io',
    genre: 'fantasy',
    cost: 'PWYW',
    license: 'CC BY 4.0',
    'cover-image': null,
    tags: ['osr', 'dungeon-crawl', 'rules-lite'],
    stats: '1d6 classes · 6 attributes · Usage Dice',
    subtexts: [],
    body: '',
    featured: false,
    sort_priority: null,
    imageOrientation: null,
    meta: {},
  };

  const bodyHtml = `
<h2>Overview</h2>
<p>The Black Hack is a rules-lite tabletop RPG using a single resolution mechanic throughout: roll under your attribute on a d20. It strips away the complexity of its ancestors while keeping the feel of old-school play.</p>
<h2>What's Included</h2>
<ul>
  <li>20-page core rules PDF</li>
  <li>Four classic classes (Warrior, Conjurer, Cleric, Thief)</li>
  <li>Usage Dice — an elegant exhibit management system</li>
  <li>Monsters with a single HD stat and damage output</li>
</ul>
<h2>Design Notes</h2>
<p>Originally released in 2016, The Black Hack sparked a wave of "Hackett" games. The Usage Dice mechanic has since appeared in dozens of other systems.</p>
  `.trim();
</script>

<!-- Default: toggle imageOrientation in the Controls panel -->
<Story name="Default">
  {#snippet template(args)}
    <AppShell>
      <Page data={{ exhibit: { ...base, imageOrientation: args.imageOrientation }, config, bodyHtml }} />
    </AppShell>
  {/snippet}
</Story>

<!-- Landscape: image stacked above text, 3:2 aspect ratio -->
<Story name="Landscape">
  <AppShell>
    <Page data={{ exhibit: { ...base, imageOrientation: 'landscape' }, config, bodyHtml }} />
  </AppShell>
</Story>

<!-- Portrait: image left, text right in two columns -->
<Story name="Portrait">
  <AppShell>
    <Page data={{ exhibit: { ...base, imageOrientation: 'portrait' }, config, bodyHtml }} />
  </AppShell>
</Story>

<!-- None: no image, text fills full width -->
<Story name="None">
  <AppShell>
    <Page data={{ exhibit: { ...base, imageOrientation: 'none' }, config, bodyHtml }} />
  </AppShell>
</Story>

<!-- Featured: primary ring accent -->
<Story name="Featured">
  <AppShell>
    <Page data={{ exhibit: { ...base, featured: true, sort_priority: 1 }, config, bodyHtml }} />
  </AppShell>
</Story>

<!-- Minimal: only name and slug — no optional fields -->
<Story name="Minimal">
  <AppShell>
    <Page data={{
      exhibit: {
        ...base,
        summary: null, author: null, source: null, 'source-url': null,
        genre: null, cost: null, license: null, stats: null,
        tags: [], category: [], 'cover-image': null,
      },
      config,
      bodyHtml: '',
    }} />
  </AppShell>
</Story>
