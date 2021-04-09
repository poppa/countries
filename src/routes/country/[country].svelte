<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch, page }) => {
    try {
      const res = await fetch(`./${page.params.country}.json`)
      if (!res.ok) {
        return {
          status: 404
        }
      }

      const country = await res.json()
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
  import { PageTitle } from '../../lib'
  // import Icon from '../../components/Icon.svelte'
  import Label from '../../components/Label.svelte'

  export let country: Country
</script>

<svelte:head>
  <title>{country.name} - {PageTitle}</title>
</svelte:head>

<!-- <div class="header">
    <a href="/" class="btn btn--wide">
      <Icon name="arrow-back" /> Back
    </a>
  </div> -->

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
      <Label label="Population" text={country.population.toString()} />
      <Label label="Region" text={country.region} />
      <Label label="Sub-region" text={country.subregion} />
      <Label label="Capital" text={country.capital} />
    </div>

    <div class="column">
      <Label
        label="Top-level domain"
        text={country.topLevelDomain.join(', ')}
      />
      <Label
        label="Currencies"
        text={country.currencies.map((c) => c.name).join(', ')}
      />
      <Label
        label="Languages"
        text={country.languages.map((l) => l.name).join(', ')}
      />
    </div>
  </div>
</section>

<style lang="scss">
  @use '../../static' as *;

  .btn {
    padding: calc(var(--padding) / 3) var(--padding);
    background: var(--clr-elements);
    border-radius: var(--br);
    box-shadow: 0 0 5px var(--clr-shadow);
    color: var(--clr-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    &--wide {
      min-width: 8em;
    }

    :global(.icon) {
      margin-right: 0.3em;
      text-decoration: none;
    }
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

  @include tablet {
    section {
      flex-direction: row;
      align-items: flex-start;
    }

    img {
      width: 40%;
      height: auto;
      margin-right: calc(var(--padding) * 4);
    }

    .info {
      width: 100%;
      margin-top: 0;
      display: grid;
      gap: calc(var(--padding) * 1);
      grid-template-columns: 1fr 1fr;

      h2 {
        grid-column: 1/3;
      }
    }

    h2,
    .column {
      margin: 0;
    }
  }
</style>
