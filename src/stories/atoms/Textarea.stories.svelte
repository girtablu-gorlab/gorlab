<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Textarea',
    tags: ['autodocs'],
    argTypes: {
      rows: { control: 'number', description: 'Visible row count' },
      placeholder: { control: 'text', description: 'Placeholder text' },
      disabled: { control: 'boolean', description: 'Disabled state' },
    },
    args: {
      rows: 4,
      placeholder: 'Brief description of the exhibit…',
      disabled: false,
    },
  });
</script>

<!-- Default: labelled textarea, configurable via Controls -->
<Story name="Default">
  {#snippet template(args)}
    <label class="label w-full max-w-lg">
      <span class="label-text">Summary <span class="text-error-500">*</span></span>
      <textarea class="textarea" rows={args.rows} placeholder={args.placeholder} disabled={args.disabled}></textarea>
    </label>
  {/snippet}
</Story>

<!-- WithHint: helper text pattern used for comma-separated multi-value fields -->
<Story name="WithHint">
  <label class="label w-full max-w-lg">
    <span class="label-text">Tags</span>
    <textarea class="textarea" rows={3} placeholder="osr, one-shot, dungeon-crawl"></textarea>
    <p class="mt-1 text-xs opacity-50">Separate multiple values with commas.</p>
  </label>
</Story>
