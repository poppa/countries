<script lang="ts">
  import type { Country } from '../lib'

  export let country: Country
</script>

<a href={`/country/${country.alpha3Code.toLowerCase()}`} class="btn btn--sm"
  >{country.name}</a
>
