<script lang="ts">
  import { PageTitle } from '../lib'
  import { onMount } from 'svelte'
  import Icon from './Icon.svelte'

  let mode: 'light' | 'dark' = 'light'

  function toggleMode() {
    mode = mode === 'dark' ? 'light' : 'dark'
    setMode()
    localStorage.setItem('mode', mode)
  }

  function setMode() {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  onMount(async () => {
    const l = localStorage.getItem('mode')

    if (l) {
      mode = l as typeof mode
      setMode()
    }
  })
</script>

<header>
  <div class="container">
    <a href="/">
      <h1>{PageTitle}</h1>
    </a>

    <button
      class:dark={mode === 'dark'}
      on:click={toggleMode}
      aria-hidden="true"
    >
      <Icon name="moon" />
    </button>
  </div>
</header>

<style lang="scss">
  header {
    background: var(--clr-elements);
    box-shadow: 3px 0 7px var(--clr-shadow);
    transition: var(--theme-transition);
  }

  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: var(--clr-text);
    transition: var(--theme-transition);
  }

  .container {
    padding-top: calc(var(--padding) / 2);
    padding-bottom: calc(var(--padding) / 2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :global(svg .stars) {
    opacity: 1;
    transform: scale(1);
    transform-origin: center;
    transition: opacity 250ms ease-in, transform 250ms ease-in;
  }

  .dark {
    :global(svg .stars) {
      opacity: 0;
      transform: scale(2);
    }
  }

  button {
    display: flex;
    align-items: center;
    padding: calc(var(--padding) / 2);
    margin-right: calc((var(--padding) / 2) * -1);
    font-size: inherit;
    border: 0;
    background: none;
    color: currentColor;
    cursor: pointer;

    &:focus:not(:focus-visible) {
      border: 0;
      outline: 0;
    }

    &:target {
      outline: 1px dashed var(--clr-text);
    }

    :global(.icon) {
      width: 1.1em;
      height: 1.1em;
    }
  }
</style>
