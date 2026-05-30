<script lang="ts">
    import type { Exhibit } from "./oddments.js";
    import { asset, resolve } from "$app/paths";
    import { config } from "./catalog.js";

    let { exhibit }: { exhibit: Exhibit } = $props();

    function toArray(val: string | string[] | null | undefined): string[] {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
    }

    const categories = $derived(toArray(exhibit.category));
    const author = $derived(toArray(exhibit.author).join(", "));
    const orientation = $derived(exhibit.imageOrientation ?? config.imageOrientation);
    const hasCover = $derived(Boolean(exhibit["cover-image"]));
    const coverSrc = $derived(
        exhibit["cover-image"]?.startsWith("/")
            ? asset(exhibit["cover-image"])
            : (exhibit["cover-image"] ?? ""),
    );
    const exhibitHref = $derived(resolve(`/exhibit/${exhibit.slug}/`))
</script>

<article
    class="card flex flex-col overflow-hidden hover:shadow-lg transition-shadow {exhibit.featured
        ? 'ring-1 ring-primary-500'
        : ''}"
>
    {#if hasCover && orientation !== 'none'}
        <a
            href={exhibitHref}
            class="block overflow-hidden shrink-0"
            aria-label={exhibit.name ?? exhibit.slug}
        >
            <img
                src={coverSrc}
                alt={exhibit.name}
                class="w-full h-auto"
                loading="lazy"
            />
        </a>
    {/if}

    <!-- Card body -->
    <div class="flex flex-col flex-1 p-4 gap-2">
        <h2 class="font-bold text-base leading-snug">
            <a href={exhibitHref} class="hover:underline"
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
