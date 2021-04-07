<script lang="ts">
  import Icon from "./Icon.svelte";

  let mode: 'dark' | 'light' = 'light'

  function toggleMode() {
    mode = mode === 'dark' ? 'light' : 'dark'

    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
</script>

<header>
  <div class="container">
    <a href="/">
      <h1>Where in the world?</h1>
    </a>

    <button class:dark={mode === 'dark'} on:click={toggleMode}>
      <Icon name='moon' />
    </button>
  </div>
</header>

<style lang="scss">
  header {
    background: var(--clr-elements);
    box-shadow: 3px 0 5px var(--clr-shadow);
  }

  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: var(--clr-text);
  }

  .container {
    padding-top: var(--padding);
    padding-bottom: var(--padding);
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

    // FIXME: It should still be highlighted in some way
    &:active {
      border: 0;
      outline: 0;
    }

    :global(.icon) {
      width: 1.3em;
      height: 1.3em;
    }
  }
</style>
