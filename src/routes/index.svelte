<script context="module" lang="ts">
  // SSR preload
  export const load: Load = async ({ fetch }) => {
    const url = `./index.json`
    const res = await fetch(url)

    try {
      if (res.ok) {
        const countries = await res.json()

        return {
          props: {
            countries
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
  import type { Country } from '../lib'
  import { PageTitle } from '../lib'
  import CountryItem from '../components/CountryItem.svelte'

  export let countries: Country[]
</script>

<svelte:head>
  <title>{PageTitle}</title>
</svelte:head>

<div class="countries">
  {#each countries as country (country.alpha3Code)}
    <CountryItem {country} />
  {/each}
</div>

<style lang="scss">
  @use '../static' as *;

  .countries {
    display: grid;
    gap: var(--padding);
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

    @include grid {
      gap: calc(var(--padding) * 2);
    }
  }
</style>
