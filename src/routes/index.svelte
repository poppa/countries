<!--
  Optimization potentials:

    - Don't render countries below the fold (with some given offset)
 -->
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
  import Icon from '../components/Icon.svelte'
  import Select, {
    setSelected,
    unselectSelected
  } from '../components/Select.svelte'
  import type { Option } from '../components/Select.svelte'
  import { searchTerm, selectedRegion } from '$lib/state'
  import { onDestroy } from 'svelte'

  // Component props

  export let countries: Country[]

  // Internals

  let countryList = [...countries]
  let regions = regionsList()

  const unsubSearchTerm = searchTerm.subscribe((v) => {
    countryList = filterCountries(countries, {
      region: $selectedRegion,
      search: v
    })
  })

  // Pull out the unique regions from the countries, sort them and
  // turn them into a list of Option types
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
  <div class="search-field">
    <span>
      <Icon name="magnifier" />
    </span>
    <input
      type="search"
      placeholder="Search for a country..."
      class="input"
      bind:value={$searchTerm}
    />
  </div>
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
    display: flex;
    flex-direction: column;
  }

  .countries {
    display: grid;
    gap: var(--padding);
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  }

  .search-field {
    position: relative;
    margin-bottom: 0.5em;

    span {
      pointer-events: none;
      color: var(--clr-input);
      position: absolute;
      z-index: 1;
      left: calc(var(--padding) / 2);
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.4em;
    }
  }

  input[type='search'] {
    width: 100%;
    padding-left: 3em;
  }

  @include grid {
    .header {
      margin-bottom: calc(var(--padding) * 2);
      flex-direction: row;
      justify-content: space-between;
    }

    .search-field {
      width: 400px;
      margin-bottom: 0;
    }
  }

  @include tablet {
    .countries {
      gap: calc(var(--padding) * 2);
    }
  }
</style>
