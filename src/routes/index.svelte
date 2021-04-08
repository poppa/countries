<script context="module" lang="ts">
  // SSR preload
  export const load: Load = async ({ fetch }) => {
    const url = `./index.json`
    const res = await fetch(url)

    try {
      if (res.ok) {
        return {
          props: {
            countries: await res.json()
          }
        }
      } else {
        throw new Error(`Bad Resquest/response ${res.status}`)
      }
    } catch (err: unknown) {
      return {
        status: res.status,
        error: err as Error
      }
    }
  }
</script>

<script lang="ts">
  import type { Load } from '@sveltejs/kit'
  import CountryItem from '../components/CountryItem.svelte'

  import type { Country } from '../lib'
  export let countries: Country[]
</script>

<div class="countries">
  {#each countries as country (country.alpha2Code)}
    <CountryItem {country} />
  {/each}
</div>

<style lang="scss">
  .countries {
    display: grid;
    gap: calc(var(--padding) * 2);
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  }
</style>
