<script context="module" lang="ts">
  export interface Option {
    name: string
    value?: string
    selected?: boolean
  }

  export function unselectSelected(list: Option[]): Option[] {
    const s = list.find((i) => i.selected)
    if (s) {
      s.selected = false
    }

    return list
  }

  export function setSelected(valueOrName: string, list: Option[]): Option[] {
    const m = list.find((r) => r.value ?? r.name === valueOrName)
    if (m) {
      m.selected = true
    }
    return list
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let name: string
  export let options: Option[]

  const dispatch = createEventDispatcher()

  function dispatcher(e: Event) {
    const t = e.target as HTMLSelectElement
    dispatch(`changed`, { value: t.value })
  }

  // This is a HACK? Nullish coalescing doesn't seem to work in inline code
  function optional<T1, T2>(
    a: T1,
    b: T2
  ): T1 extends undefined | null ? T2 : T1 {
    // I dont't get this. VSCode understands it
    // @ts-expect-error
    return a ?? b
  }
</script>

<select class="input" on:input={dispatcher} {name}>
  {#each options as option (option)}
    <option
      value={optional(option.value, option.name)}
      selected={optional(option.selected, false)}>{option.name}</option
    >
  {/each}
</select>

<style lang="scss">
  select {
    appearance: none;
  }

  option {
    color: var(--clr-input);
  }
</style>
