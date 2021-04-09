<script lang="ts">
  import type { Country } from '../lib'

  export let country: Country
</script>

<a href={`/country/${country.alpha2Code.toLowerCase()}`} class="country">
  <div class="image">
    <img
      src={country.flag}
      alt={`Flag of ${country.name}`}
      loading="lazy"
      width="800"
      height="600"
    />
  </div>
  <div class="contents">
    <h2>{country.name}</h2>
    <p>
      <span class="label">Population:</span>
      {country.population}
    </p>
    <p>
      <span class="label">Region:</span>
      {country.region}
    </p>
    <p>
      <span class="label">Capital:</span>
      {country.capital}
    </p>
  </div>
</a>

<style lang="scss">
  a {
    color: var(--clr-text);
    text-decoration: none;
  }

  .country {
    display: block;
    position: relative;
    overflow: hidden;
    font-size: var(--fs-small);
    border-radius: var(--br);
    background-color: var(--clr-elements);
    box-shadow: 0 0 10px -5px var(--clr-shadow);
    transform: scale(1);
    transition: transform 450ms cubic-bezier(0.69, -0.28, 0.27, 1.55);

    &:hover {
      transform: scale(1.1);
    }

    h2 {
      font-size: var(--fs-normal);
      font-weight: var(--fw-bold);
      margin-bottom: calc(var(--padding) - 0.5em);
    }
  }

  .image {
    position: relative;
    overflow: hidden;
    height: 10vw;
    max-height: 260px;
    min-height: 180px;

    img {
      object-fit: cover;
      max-height: 100%;
    }
  }

  .contents {
    padding: var(--padding);
    font-size: var(--fs-items);

    p + p {
      margin-top: 0.3em;
    }
  }
</style>
