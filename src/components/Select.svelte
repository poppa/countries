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
  import Icon from './Icon.svelte'

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

<div class="select-box">
  <select class="input" on:input={dispatcher} {name}>
    {#each options as option (option)}
      <option
        value={optional(option.value, option.name)}
        selected={optional(option.selected, false)}>{option.name}</option
      >
    {/each}
  </select>
  <span>
    <Icon name="arrow-down" />
  </span>
</div>

<style lang="scss">
  .select-box {
    position: relative;
    display: flex;

    span {
      pointer-events: none;
      position: absolute;
      right: var(--padding);
      top: 50%;
      transform: translateY(-50%);
      color: var(--clr-input);
      font-size: 0.9em;
    }
  }

  select {
    appearance: none;
    padding-right: calc(var(--padding) * 2.5);
  }
</style>
