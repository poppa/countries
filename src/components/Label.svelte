<script lang="ts">
  export let label: string
  export let text: string
  export let showIfNovalue = false
  export let defaultValue = 'No value'

  const hasSlot = $$slots.default
</script>

{#if (text || (!text && showIfNovalue)) && !hasSlot}
  <div class:no-value={!text}>
    <strong>{label}:</strong>
    <span>{text || defaultValue}</span>
  </div>
{:else if hasSlot}
  <strong>{label}:</strong>
  <slot />
{/if}

<style>
  .no-value {
    opacity: 0.5;
  }

  strong {
    color: var(--clr-input);
  }
</style>
