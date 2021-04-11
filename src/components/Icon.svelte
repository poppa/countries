<script lang="ts">
  import iconArrowBack from '../icons/arrow-back'
  import iconArrowDown from '../icons/arrow-down'
  import iconMagnifier from '../icons/magnifier'
  import iconMoon from '../icons/moon'

  type IconName = 'arrow-back' | 'arrow-down' | 'magnifier' | 'moon'

  export let name: IconName

  const iconMap: Record<IconName, string> = {
    'arrow-back': iconArrowBack,
    'arrow-down': iconArrowDown,
    magnifier: iconMagnifier,
    moon: iconMoon
  }
</script>

<div class="icon">{@html iconMap[name]}</div>

<style lang="scss">
  .icon {
    position: relative;
    width: 1em;
    height: 1em;

    :global(svg) {
      display: block;
      fill: currentColor;
      width: 100%;
      height: 100%;
    }
  }
</style>
