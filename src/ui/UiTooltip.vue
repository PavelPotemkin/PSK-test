<template>
  <div class="ui-tooltip">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-tooltip {
  width: fit-content;
  padding: 0.3em 0.6em;
  background-color: darkgray;
  color: white;
  animation-name: opacity;
  animation-duration: 800ms;
  animation-direction: normal;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
