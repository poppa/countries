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
  import { PageTitle, filterCountries } from '../lib'
  import CountryItem from '../components/CountryItem.svelte'
  import Select, {
    setSelected,
    unselectSelected
  } from '../components/Select.svelte'
  import type { Option } from '../components/Select.svelte'
  import { searchTerm, selectedRegion } from '$lib/state'
  import { onDestroy } from 'svelte'

  export let countries: Country[]

  let countryList = [...countries]
  let regions = regionsList()

  const unsubSearchTerm = searchTerm.subscribe((v) => {
    countryList = filterCountries(countries, {
      region: $selectedRegion,
      search: v
    })
  })

  function regionsList(): Option[] {
    const reg: string[] = []

    countries.forEach((c) => {
      c.region && !reg.includes(c.region) && reg.push(c.region)
    })

    const options: Option[] = reg
      .sort()
      .map((c) => ({ name: c, selected: c === $selectedRegion }))

    options.unshift({ name: 'Filter by region', value: '' })

    return options
  }

  function onSelectChanged(e: CustomEvent<{ value: string }>) {
    const val = e.detail.value || undefined
    regions = setSelected(val, unselectSelected(regions))

    selectedRegion.set(val)

    countryList = filterCountries(countries, {
      region: val,
      search: $searchTerm
    })
  }

  onDestroy(unsubSearchTerm)
</script>

<svelte:head>
  <title>{PageTitle}</title>
</svelte:head>

<div class="header">
  <input
    type="search"
    placeholder="Search for a country..."
    class="input"
    bind:value={$searchTerm}
  />
  <Select name="region" options={regions} on:changed={onSelectChanged} />
</div>

<div class="countries">
  {#each countryList as country (country.alpha3Code)}
    <CountryItem {country} />
  {:else}
    <div class="noresult">No results</div>
  {/each}
</div>

<style lang="scss">
  @use '../static' as *;

  .header {
    margin-bottom: var(--padding);
  }

  .countries {
    display: grid;
    gap: var(--padding);
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  }

  input[type='search'] {
    width: 100%;
  }

  @include grid {
    .header {
      margin-bottom: calc(var(--padding) * 2);
    }

    .countries {
      gap: calc(var(--padding) * 2);
    }

    input[type='search'] {
      max-width: 350px;
    }
  }
</style>
