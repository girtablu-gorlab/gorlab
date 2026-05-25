<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Card',
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['filled', 'tonal', 'outlined'],
        description: 'Visual style preset',
      },
      color: {
        control: 'select',
        options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'],
        description: 'Semantic color token',
      },
      padding: {
        control: 'select',
        options: ['p-2', 'p-4', 'p-6', 'p-8'],
        description: 'Internal padding',
      },
    },
    args: {
      variant: 'filled',
      color: 'surface',
      padding: 'p-4',
    },
  });
</script>

<!-- Default: configurable via the Controls panel -->
<Story name="Default">
  {#snippet template(args)}
    {@const preset =
      args.variant === 'tonal'
        ? `preset-tonal-${args.color}`
        : args.variant === 'outlined'
          ? `preset-outlined-${args.color}-500`
          : `preset-filled-${args.color}-500`}
    <div class="card max-w-sm {preset} {args.padding}">
      <p class="font-semibold">Card Title</p>
      <p class="mt-1 text-sm opacity-70">Card body content goes here. Use cards to group related information and actions.</p>
    </div>
  {/snippet}
</Story>

<!-- Structured: header image / article / footer divided card -->
<Story name="Structured">
  <a
    href="/"
    class="card preset-filled-surface-100-900 border border-surface-200-800 card-hover divide-y divide-surface-200-800 block max-w-sm overflow-hidden"
  >
    <header class="bg-surface-200-800 flex h-32 items-center justify-center text-sm opacity-50">
      Image placeholder (21:9)
    </header>
    <article class="space-y-2 p-4">
      <div>
        <p class="text-xs uppercase tracking-widest opacity-50">Announcements</p>
        <h3 class="h4">Skeleton is Awesome</h3>
      </div>
      <p class="text-sm opacity-60">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident
        eveniet eligendi cumque consequatur tempore sint nisi sapiente.
      </p>
    </article>
    <footer class="flex items-center justify-between gap-4 p-4">
      <small class="opacity-50">By Alex</small>
      <small class="opacity-50">{new Date().toLocaleDateString()}</small>
    </footer>
  </a>
</Story>

<!-- Presets: 3×7 grid of all semantic color presets -->
<Story name="Presets">
  <div class="space-y-3">
    {#each ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'] as color (color)}
      <div class="grid grid-cols-3 gap-3">
        <div class="card preset-filled-{color}-500 p-3 text-sm text-center capitalize">{color} filled</div>
        <div class="card preset-tonal-{color} p-3 text-sm text-center capitalize">{color} tonal</div>
        <div class="card preset-outlined-{color}-500 p-3 text-sm text-center capitalize">{color} outlined</div>
      </div>
    {/each}
  </div>
</Story>

<!-- Interactive: card-hover adds a lift + cursor-pointer on hover -->
<Story name="Interactive">
  <div class="grid grid-cols-3 gap-4 max-w-lg">
    {#each ['Alpha', 'Beta', 'Gamma'] as name (name)}
      <a
        href="/"
        class="card preset-filled-surface-100-900 border border-surface-200-800 card-hover p-4 text-center"
      >
        <p class="font-semibold">{name}</p>
        <p class="mt-1 text-xs opacity-60">Hover to see lift</p>
      </a>
    {/each}
  </div>
</Story>
