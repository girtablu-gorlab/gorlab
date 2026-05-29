<script lang="ts">
  import type { Exhibit } from './oddments.js'
  import ExhibitCard from './ExhibitCard.svelte'
  import { config } from './catalog.js'

  let { exhibits }: { exhibits: Exhibit[] } = $props()

  let gridEl: HTMLElement | undefined = $state()

  // Each grid row is 10px tall; gap is read from computed styles so the span
  // calculation stays accurate regardless of the Tailwind gap class in use.
  const ROW_HEIGHT = 10

  function measureSpans() {
    if (!gridEl) return
    const gap = parseInt(getComputedStyle(gridEl).rowGap) || 0
    for (const item of gridEl.children) {
      const card = (item as HTMLElement).firstElementChild as HTMLElement | null
      if (!card) continue
      const h = card.getBoundingClientRect().height
      const span = Math.ceil((h + gap) / (ROW_HEIGHT + gap))
      ;(item as HTMLElement).style.gridRow = `span ${span}`
    }
  }

  // Re-measure after each exhibits update so new cards get correct spans.
  $effect(() => {
    exhibits
    if (config.cardLayout !== 'masonry') return
    requestAnimationFrame(measureSpans)
  })

  // Re-measure on viewport resize so spans stay accurate as columns reflow.
  $effect(() => {
    if (config.cardLayout !== 'masonry' || !gridEl) return
    const ro = new ResizeObserver(() => requestAnimationFrame(measureSpans))
    ro.observe(gridEl)
    return () => ro.disconnect()
  })
</script>

{#if exhibits.length === 0}
  <div class="flex items-center justify-center min-h-48 border border-current border-dashed rounded">
    <p class="opacity-40 text-sm">No exhibits match your filters.</p>
  </div>
{:else if config.cardLayout === 'masonry'}
  <ul
    bind:this={gridEl}
    class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[10px]"
  >
    {#each exhibits as exhibit (exhibit.slug)}
      <li>
        <ExhibitCard {exhibit} />
      </li>
    {/each}
  </ul>
{:else}
  <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each exhibits as exhibit (exhibit.slug)}
      <li>
        <ExhibitCard {exhibit} />
      </li>
    {/each}
  </ul>
{/if}
