<script lang="ts">
  import { asset, resolve } from '$app/paths'
  import { config as defaultConfig, type ResolvedConfig } from '$lib/catalog.js'
  import ThemeToggle from './ThemeToggle.svelte'

  let { config = defaultConfig }: { config?: ResolvedConfig } = $props()

  const logoSrc = $derived(
    config.logo.startsWith('/') ? asset(config.logo) : config.logo
  )
  const iconSrc = $derived(
    config.icon.startsWith('/') ? asset(config.icon) : config.icon
  )
</script>

<header class="border-b border-surface-200-800 px-4 py-3 flex items-center justify-between gap-4">
  <a
    href={resolve('/')}
    class="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity inline-flex items-center gap-2 min-w-0"
    aria-label="{config.title} home"
  >
    {#if config.logo}
      <img src={logoSrc} alt={config.title} class="max-h-8 w-auto" />
    {:else}
      {#if config.icon}
        <img src={iconSrc} alt="" class="size-5 shrink-0" />
      {/if}
      <span class="truncate">{config.title}</span>
    {/if}
  </a>

  <div class="flex items-center gap-3">
    {#if config.showSubmitForm}
      <a href={resolve('/submit/')} class="text-sm opacity-60 hover:opacity-100 transition-opacity">
        Submit
      </a>
    {/if}
    <ThemeToggle />
  </div>
</header>
