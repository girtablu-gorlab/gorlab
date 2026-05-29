<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/Footer',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import { base } from '$app/paths';
  import { config } from '$lib/catalog.js';
</script>

<!-- Default: site title links to siteUrl (set in oddments.config.js) -->
<Story name="Default">
  <footer class="border-t border-surface-200-800 px-4 py-3 text-xs opacity-40 text-center flex flex-wrap justify-center gap-x-4 gap-y-1">
    {#if config.siteUrl}
      <a href={config.siteUrl} class="hover:opacity-80" target="_blank" rel="noopener">{config.title}</a>
    {:else}
      <span>{config.title}</span>
    {/if}
    <a href="https://opensource.org/licenses/MIT" class="hover:opacity-80" target="_blank" rel="noopener">MIT License</a>
    <a href="{base}/feed.xml" class="hover:opacity-80">RSS Feed</a>
  </footer>
</Story>

<!-- NoSiteUrl: title is plain text when siteUrl is not configured -->
<Story name="NoSiteUrl">
  <footer class="border-t border-surface-200-800 px-4 py-3 text-xs opacity-40 text-center flex flex-wrap justify-center gap-x-4 gap-y-1">
    <span>{config.title}</span>
    <a href="https://opensource.org/licenses/MIT" class="hover:opacity-80" target="_blank" rel="noopener">MIT License</a>
    <a href="{base}/feed.xml" class="hover:opacity-80">RSS Feed</a>
  </footer>
</Story>
