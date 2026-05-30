<script lang="ts">
  import { resolve } from '$app/paths'
  import { config as defaultConfig, type ResolvedConfig } from '$lib/catalog.js'
  import Icon from './Icon.svelte'
  import { normalizeSocialHref, socialDefinitions } from './socials.js'

  let { config = defaultConfig }: { config?: ResolvedConfig } = $props()

  const enabledSocials = $derived(
    socialDefinitions
      .map((social) => ({
        ...social,
        href: normalizeSocialHref(social.key, config.socials[social.key]),
      }))
      .filter((social) => Boolean(config.socials[social.key]))
  )
</script>

<footer class="border-t border-surface-200-800 px-4 py-4 text-xs text-center flex flex-col items-center gap-3">
  {#if enabledSocials.length > 0}
    <nav aria-label="Social links" class="flex flex-wrap justify-center gap-1.5">
      {#each enabledSocials as social}
        <a
          href={social.href}
          class="btn-icon preset-tonal size-8"
          aria-label={social.label}
          target={social.key === 'email' ? undefined : '_blank'}
          rel={social.key === 'email' ? undefined : 'noopener'}
        >
          <Icon name={social.icon} size={16} />
        </a>
      {/each}
    </nav>
  {/if}

  <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 opacity-50">
    {#if config.copyright}
      {#if config.copyrightUrl}
        <a href={config.copyrightUrl} class="hover:opacity-80" target="_blank" rel="noopener">{config.copyright}</a>
      {:else}
        <span>{config.copyright}</span>
      {/if}
    {/if}

    {#if config.showRss}
      <a href={resolve('/feed.xml')} class="hover:opacity-80 inline-flex items-center gap-1">
        <Icon name="rss" size={14} />
        <span>RSS Feed</span>
      </a>
    {/if}
  </div>
</footer>
