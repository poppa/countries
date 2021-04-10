<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch, page }) => {
    try {
      const query = await fetch(`./${page.params.country}.json`)
      const country = await query.json()

      if (!country) {
        return {
          status: 404
        }
      }

      return { props: { country } }
    } catch (err: unknown) {
      return {
        status: 500,
        error: err as Error
      }
    }
  }
</script>

<script lang="ts">
  import type { Country } from '../../lib'
  import { PageTitle, formatNumber, joinNice } from '../../lib'
  import Icon from '../../components/Icon.svelte'
  import Label from '../../components/Label.svelte'
  import BorderButton from '../../components/BorderButton.svelte'

  export let country: Country

  function handleBack(e: Event): void {
    window.history.go(-1)
    e.preventDefault()
  }
</script>

<svelte:head>
  <title>{country.name} - {PageTitle}</title>
</svelte:head>

<div class="header">
  <a href="/" class="btn btn--wide" on:click={handleBack}>
    <Icon name="arrow-back" /> Back
  </a>
</div>

<section>
  <img
    src={country.flag}
    alt={`Flag of ${country.name}`}
    width="800"
    height="600"
  />

  <div class="info">
    <h2>{country.name}</h2>
    <div class="column">
      <Label label="Native name" text={country.nativeName} />
      <Label label="Population" text={formatNumber(country.population)} />
      <Label label="Region" text={country.region} />
      <Label label="Sub-region" text={country.subregion} showIfNovalue={true} />
      <Label label="Capital" text={country.capital} showIfNovalue={true} />
    </div>

    <div class="column">
      <Label label="Top-level domain" text={joinNice(country.topLevelDomain)} />
      <Label
        label="Currencies"
        text={joinNice(country.currencies.map((c) => c.name))}
      />
      <Label
        label="Languages"
        text={joinNice(country.languages.map((l) => l.name))}
      />
    </div>

    <div class="border-countries">
      <Label label="Border countries">
        {#each country.bordersResolved as b}
          <BorderButton country={b} />
        {:else}
          <span>None</span>
        {/each}
      </Label>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../../static' as *;

  .header {
    margin-bottom: calc(var(--padding) * 2);
  }

  section {
    display: flex;
    flex-direction: column;
    font-size: var(--fs-items);
  }

  .info {
    margin-top: var(--padding);
  }

  .column {
    margin-top: var(--padding);
  }

  img {
    width: 100%;
    height: auto;
    box-shadow: 0 0 5px var(--clr-shadow);
  }

  .border-countries {
    margin-top: var(--padding);

    :global(.btn) {
      margin-bottom: 0.5em;
      margin-right: 0.5em;
    }
  }

  @include tablet {
    section {
      flex-direction: row;
      align-items: center;
    }

    img {
      width: 40%;
      height: auto;
      margin-right: calc(var(--padding) * 2);
    }

    .info {
      width: 100%;
      margin-top: 0;
      display: grid;
      gap: calc(--padding);
      column-gap: calc(var(--padding) * 2);
      grid-template-columns: minmax(min-content, max-content);

      h2 {
        grid-column: 1/3;
        margin-bottom: calc(var(--padding) / 2);
      }
    }

    .column {
      margin: 0;
    }

    .border-countries {
      grid-column: 1/3;
    }
  }

  @include widescreen {
    img {
      margin-right: calc(var(--padding) * 3);
    }
  }
</style>
