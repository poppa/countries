<script lang="ts">
  import { PageTitle } from '../lib'
  import { onMount } from 'svelte'
  import Icon from './Icon.svelte'

  let mode: 'light' | 'dark'

  function toggleMode() {
    console.log(`Toggle mode`)
    mode = mode === 'dark' ? 'light' : 'dark'
    setMode(mode)
    localStorage.setItem('mode', mode)
  }

  function setMode(m: typeof mode) {
    if (m === 'dark') {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else if (m === 'light') {
      console.log(`Add light class`)
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }

    mode = m
  }

  onMount(async () => {
    const l = localStorage.getItem('mode')

    if (l) {
      setMode(l as typeof mode)
    } else {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--mode')
        .trim()

      setMode(v as typeof mode)
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
      class:light={mode === 'light'}
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
    border: 1px solid transparent;
    transition: var(--theme-transition), border-color 250ms ease-in;

    &:focus:not(:focus-visible) {
      border-color: transparent;
      outline: 0;
    }
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
    border: 1px solid transparent;

    &:focus:not(:focus-visible) {
      border-color: transparent;
      outline: 0;
    }

    :global(.icon) {
      width: 1.1em;
      height: 1.1em;
    }
  }
</style>
