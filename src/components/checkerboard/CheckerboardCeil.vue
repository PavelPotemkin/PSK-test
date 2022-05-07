<template>
  <li class="flat-wrapper">
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.flat-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
}
</style>
