<script lang="ts">
    import type { Exhibit } from "./oddments.js";
    import { base } from "$app/paths";
    import { config } from "./catalog.js";

    let { exhibit }: { exhibit: Exhibit } = $props();

    function toArray(val: string | string[] | null | undefined): string[] {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
    }

    function hashString(s: string): number {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        }
        return Math.abs(h);
    }

    function placeholderGradient(name: string): string {
        const h = hashString(name);
        const hue1 = h % 360;
        const hue2 = (h + 137) % 360;
        return `linear-gradient(135deg, color-mix(in oklch, var(--color-surface-200-800) 75%, oklch(0.5 0.15 ${hue1}) 25%), color-mix(in oklch, var(--color-surface-300-700) 70%, oklch(0.5 0.15 ${hue2}) 30%))`;
    }

    const categories = $derived(toArray(exhibit.category));
    const author = $derived(toArray(exhibit.author).join(", "));
    const orientation = $derived(exhibit.imageOrientation ?? config.imageOrientation);
    const hasCover = $derived(Boolean(exhibit["cover-image"]));
    const coverSrc = $derived(
        exhibit["cover-image"]?.startsWith("/")
            ? `${base}${exhibit["cover-image"]}`
            : (exhibit["cover-image"] ?? ""),
    );
    const coverStyle = $derived(
        hasCover
            ? ""
            : `background: ${placeholderGradient(exhibit.name ?? exhibit.slug)};`,
    );
</script>

<article
    class="card flex flex-col overflow-hidden hover:shadow-lg transition-shadow {exhibit.featured
        ? 'ring-1 ring-primary-500'
        : ''}"
>
    <!-- Cover image or gradient placeholder -->
    {#if orientation !== 'none'}
        <a
            href={`${base}/exhibit/${exhibit.slug}/`}
            class="block {orientation === 'portrait' ? 'aspect-2/3' : 'aspect-3/2'} overflow-hidden shrink-0"
            aria-label={exhibit.name ?? exhibit.slug}
        >
            {#if hasCover}
                <img
                    src={coverSrc}
                    alt={exhibit.name}
                    class="w-full h-full object-cover"
                    loading="lazy"
                />
            {:else}
                <div class="w-full h-full" style={coverStyle}></div>
            {/if}
        </a>
    {/if}

    <!-- Card body -->
    <div class="flex flex-col flex-1 p-4 gap-2">
        <h2 class="font-bold text-base leading-snug">
            <a href={`${base}/exhibit/${exhibit.slug}/`} class="hover:underline"
                >{exhibit.name}</a
            >
        </h2>

        {#if exhibit.summary}
            <p class="text-sm opacity-70 line-clamp-3">{exhibit.summary}</p>
        {/if}

        <div class="mt-auto pt-2 flex flex-col gap-1">
            {#if author}
                <span class="text-xs opacity-60">{author}</span>
            {/if}

            <div class="flex flex-wrap gap-1 items-center">
                {#each categories as cat}
                    <span class="chip preset-tonal text-xs">{cat}</span>
                {/each}

                {#if config.showCost && exhibit.cost}
                    <span class="text-xs ml-auto opacity-60">{exhibit.cost}</span>
                {/if}
            </div>
        </div>
    </div>
</article>
