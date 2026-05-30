<script lang="ts">
  import '../app.css';
  import { asset, resolve } from '$app/paths';
  import { config } from '$lib/catalog.js';
  import AppShell from '$lib/AppShell.svelte';

  const { children } = $props();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title={config.title} href={resolve('/feed.xml')} />
  {#if config.customCss}
    <link rel="stylesheet" href={asset(config.customCss)} />
  {/if}
</svelte:head>

<AppShell>
  {@render children()}
</AppShell>
