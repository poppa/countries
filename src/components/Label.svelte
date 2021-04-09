<script lang="ts">
  export let label: string
  export let text: string
</script>

<div>
  <strong>{label}:</strong>
  <span>{text}</span>
</div>

<style>
  strong {
    color: var(--clr-input);
  }
</style>
