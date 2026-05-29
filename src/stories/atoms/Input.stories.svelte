<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Input',
    tags: ['autodocs'],
    argTypes: {
      type: {
        control: 'select',
        options: ['text', 'email', 'url', 'password', 'date', 'search'],
        description: 'HTML input type',
      },
      placeholder: { control: 'text', description: 'Placeholder text' },
      disabled: { control: 'boolean', description: 'Disabled state' },
    },
    args: {
      type: 'text',
      placeholder: 'Enter a value…',
      disabled: false,
    },
  });
</script>

<!-- Default: labelled input, fully configurable via Controls -->
<Story name="Default">
  {#snippet template(args)}
    <label class="label w-72">
      <span class="label-text">Label</span>
      <input type={args.type} class="input" placeholder={args.placeholder} disabled={args.disabled} />
    </label>
  {/snippet}
</Story>

<!-- Required: asterisk convention used throughout the submit form -->
<Story name="Required">
  <label class="label w-72">
    <span class="label-text">Title <span class="text-error-500">*</span></span>
    <input type="text" class="input" placeholder="Name of the exhibit" required />
  </label>
</Story>

<!-- Types: text / url / date — the three types used in the submit form -->
<Story name="Types">
  <div class="flex w-72 flex-col gap-4">
    <label class="label">
      <span class="label-text">Text</span>
      <input type="text" class="input" placeholder="Author or creator name" />
    </label>
    <label class="label">
      <span class="label-text">URL</span>
      <input type="url" class="input" placeholder="https://…" />
    </label>
    <label class="label">
      <span class="label-text">Date</span>
      <input type="date" class="input" />
    </label>
  </div>
</Story>

<!-- TwoColumn: paired field grid layout used in the submit form -->
<Story name="TwoColumn">
  <div class="grid w-full max-w-lg grid-cols-2 gap-4">
    <label class="label">
      <span class="label-text">Source</span>
      <input type="text" class="input" placeholder="e.g. itch.io" />
    </label>
    <label class="label">
      <span class="label-text">Source URL</span>
      <input type="url" class="input" placeholder="https://…" />
    </label>
    <label class="label">
      <span class="label-text">Genre</span>
      <input type="text" class="input" placeholder="e.g. horror, fantasy" />
    </label>
    <label class="label">
      <span class="label-text">Cost</span>
      <input type="text" class="input" placeholder="e.g. free, PWYW, $10" />
    </label>
  </div>
</Story>

<!-- WithHint: helper text below the input — used for comma-separated fields -->
<Story name="WithHint">
  <label class="label w-72">
    <span class="label-text">Tags</span>
    <input type="text" class="input" placeholder="osr, one-shot, dungeon" />
    <p class="mt-1 text-xs opacity-50">Separate multiple tags with commas.</p>
  </label>
</Story>
