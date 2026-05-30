<script lang="ts">
  import { asset, resolve } from '$app/paths'
  import Icon from '$lib/Icon.svelte'
  const { data } = $props()
  const exhibit = $derived(data.exhibit)
  const config = $derived(data.config)
  const orientation = $derived(exhibit.imageOrientation ?? config.imageOrientation)

  function hashString(s: string): number {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
    return Math.abs(h)
  }

  function placeholderGradient(name: string): string {
    const h = hashString(name)
    const hue1 = h % 360
    const hue2 = (h + 137) % 360
    return `linear-gradient(135deg, color-mix(in oklch, var(--color-surface-200-800) 75%, oklch(0.5 0.15 ${hue1}) 25%), color-mix(in oklch, var(--color-surface-300-700) 70%, oklch(0.5 0.15 ${hue2}) 30%))`
  }

  const hasCover = $derived(Boolean(exhibit['cover-image']))
  const coverSrc = $derived(
    exhibit['cover-image']?.startsWith('/') ? asset(exhibit['cover-image']) : (exhibit['cover-image'] ?? '')
  )
  const coverStyle = $derived(hasCover ? '' : `background: ${placeholderGradient(exhibit.name ?? exhibit.slug)};`)
  const hasMetadataChips = $derived(
    exhibit.category.length > 0 || Boolean(exhibit.genre) || Boolean(exhibit.license) || exhibit.tags.length > 0
  )
</script>

<svelte:head>
  <title>{exhibit.name}</title>

  {#each exhibit.category as cat}
    <meta data-pagefind-filter="category:{cat}">
  {/each}
  {#if exhibit.author}
    <meta data-pagefind-filter="author[content]" content={exhibit.author}>
  {/if}
  {#if exhibit.genre}
    <meta data-pagefind-filter="genre[content]" content={exhibit.genre}>
  {/if}
  {#if exhibit.cost}
    <meta data-pagefind-filter="cost[content]" content={exhibit.cost}>
  {/if}
  {#each exhibit.tags as tag}
    <meta data-pagefind-filter="tag:{tag}">
  {/each}

  {#if exhibit.summary}
    <meta data-pagefind-meta="summary[content]" content={exhibit.summary}>
  {/if}
  {#if hasCover}
    <meta data-pagefind-meta="cover-image[content]" content={exhibit['cover-image']}>
  {/if}
  <meta data-pagefind-meta="featured[content]" content={String(exhibit.featured)}>
  {#if exhibit.category.length > 0}
    <meta data-pagefind-meta="category[content]" content={exhibit.category.join(', ')}>
  {/if}
  {#if exhibit.author}
    <meta data-pagefind-meta="author[content]" content={exhibit.author}>
  {/if}
  {#if exhibit.cost}
    <meta data-pagefind-meta="cost[content]" content={exhibit.cost}>
  {/if}
  {#if exhibit.sort_priority !== null}
    <meta data-pagefind-sort="sort_priority[content]" content={String(exhibit.sort_priority)}>
  {/if}
  <meta data-pagefind-meta="date[content]" content={exhibit.date}>
  {#if exhibit.imageOrientation}
    <meta data-pagefind-meta="imageOrientation[content]" content={exhibit.imageOrientation}>
  {/if}
</svelte:head>

{#snippet coverImage(classes: string)}
  {#if hasCover}
    <img
      src={coverSrc}
      alt={exhibit.name ?? ''}
      class="w-full rounded-container-token object-cover {classes}"
    />
  {:else}
    <div
      class="{orientation === 'portrait' ? 'aspect-2/3' : 'aspect-3/2'} w-full rounded-container-token {classes}"
      style={coverStyle}
    ></div>
  {/if}
{/snippet}

{#snippet metadataBlock()}
  <h1 class="text-3xl font-bold leading-tight">{exhibit.name}</h1>

  <div class="flex flex-col gap-1.5">
    {#if exhibit.author}
      <span class="text-sm opacity-60">By <a href={resolve(`/?author=${encodeURIComponent(exhibit.author)}`)} class="hover:underline">{exhibit.author}</a>{config.showCost && exhibit.cost ? ` · ${exhibit.cost}` : ''}</span>
    {/if}
    {#if hasMetadataChips}
      <div class="flex flex-wrap gap-1.5">
        {#each exhibit.category as cat}
          <a href={resolve(`/?category=${encodeURIComponent(cat)}`)} class="chip preset-tonal text-xs">{cat}</a>
        {/each}
        {#if exhibit.genre}<a href={resolve(`/?genre=${encodeURIComponent(exhibit.genre)}`)} class="chip preset-tonal text-xs">{exhibit.genre}</a>{/if}
        {#if exhibit.license}<span class="chip preset-tonal text-xs">{exhibit.license}</span>{/if}
        {#each exhibit.tags as tag}
          <a href={resolve(`/?tag=${encodeURIComponent(tag)}`)} class="chip preset-tonal text-xs">{tag}</a>
        {/each}
      </div>
    {/if}
  </div>

  {#if exhibit.summary}
    <p class="text-base opacity-80">{exhibit.summary}</p>
  {/if}

  {#if exhibit.stats}
    <p class="font-mono text-xs bg-surface-100-900 rounded p-3">{exhibit.stats}</p>
  {/if}

  {#if exhibit.subtexts.length > 0}
    <ul class="list-none space-y-1 text-sm opacity-80">
      {#each exhibit.subtexts as line}
        <li>{line}</li>
      {/each}
    </ul>
  {/if}

  {#if config.customFields && config.customFields.length > 0}
    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      {#each config.customFields as field}
        {#if exhibit.meta[field.key] !== undefined}
          <dt class="opacity-60 font-medium">{field.label}</dt>
          <dd>
            {#if field.type === 'url'}
              <a href={String(exhibit.meta[field.key])} target="_blank" rel="noopener noreferrer" class="anchor">
                {exhibit.meta[field.key]}
              </a>
            {:else if field.multiple && Array.isArray(exhibit.meta[field.key])}
              {(exhibit.meta[field.key] as string[]).join(', ')}
            {:else}
              {exhibit.meta[field.key]}
            {/if}
          </dd>
        {/if}
      {/each}
    </dl>
  {/if}

  {#if exhibit['source-url']}
    <a
      href={exhibit['source-url']}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto btn preset-filled self-start inline-flex items-center gap-2"
    >
      {exhibit.source ? `Get it on ${exhibit.source}` : 'View Exhibit'}
      <Icon name="external-link" size={16} />
    </a>
  {/if}
{/snippet}

<div data-pagefind-body class="px-4 py-8 max-w-4xl mx-auto">

  {#if orientation === 'portrait'}
    <!-- Two-column on desktop: image left, metadata right.
         DOM order = mobile order: metadata first, cover second.
         On desktop, explicit grid placement swaps them visually. -->
    <div class="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-start mb-8">
      <div class="flex flex-col gap-4 md:col-start-2 md:row-start-1">
        {@render metadataBlock()}
      </div>
      {@render coverImage('md:col-start-1 md:row-start-1')}
    </div>
  {:else}
    <!-- Stacked: image above metadata (or no image for 'none') -->
    <div class="flex flex-col gap-6 mb-8">
      {#if orientation !== 'none'}
        {@render coverImage('')}
      {/if}
      <div class="flex flex-col gap-4">
        {@render metadataBlock()}
      </div>
    </div>
  {/if}

  <!-- Markdown body: always full-width below -->
  {#if data.bodyHtml}
    <div class="prose prose-sm max-w-none pt-6 border-t border-surface-200-800">
      {@html data.bodyHtml}
    </div>
  {/if}

  <!-- Back link -->
  <div class="mt-8 pt-4 border-t border-surface-200-800">
    <a href={resolve('/')} class="text-sm opacity-60 hover:opacity-100 transition-opacity">← Back to catalog</a>
  </div>

</div>
