<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Molecules/Feedback',
    tags: ['autodocs'],
  });
</script>

<!-- Success: exhibit-submit confirmation card from submit/+page.svelte -->
<Story name="Success">
  <div class="card mx-auto flex max-w-sm flex-col gap-4 p-8 text-center">
    <h1 class="h2">Thank you!</h1>
    <p class="opacity-70">Your submission is under review. It will appear in the catalog once approved.</p>
    <button class="btn preset-tonal mx-auto">Submit another</button>
  </div>
</Story>

<!-- Error: inline error alert with role="alert" from submit/+page.svelte -->
<Story name="Error">
  <div class="flex max-w-sm flex-col gap-3">
    <p class="text-sm text-error-500" role="alert">
      Submission failed (422). Please try again.
    </p>
    <p class="text-sm text-error-500" role="alert">
      Network error. Please check your connection and try again.
    </p>
  </div>
</Story>

<!-- Submitting: disabled button with in-progress label from submit/+page.svelte -->
<Story name="Submitting">
  <div class="flex items-center gap-4 pt-2">
    <button type="submit" class="btn preset-filled" disabled>Submitting…</button>
    <p class="text-xs opacity-40">Fields marked <span class="text-error-500">*</span> are required.</p>
  </div>
</Story>

<!-- Loading: text-only loading state from search/+page.svelte -->
<Story name="Loading">
  <p class="text-sm opacity-50">Searching…</p>
</Story>

<!-- Empty: no-results placeholder from CardGrid.svelte -->
<Story name="Empty">
  <div class="flex min-h-48 items-center justify-center rounded border border-current border-dashed">
    <p class="text-sm opacity-40">No exhibits match your filters.</p>
  </div>
</Story>

<!-- Unavailable: search index not yet built — from search/+page.svelte -->
<Story name="Unavailable">
  <div class="rounded border border-dashed border-current p-6 text-center opacity-50">
    <p class="text-sm">Search index not available.</p>
    <p class="mt-1 text-xs">Run <code>npm run build</code> to generate the search index.</p>
  </div>
</Story>
