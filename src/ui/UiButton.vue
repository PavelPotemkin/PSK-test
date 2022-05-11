<script setup lang="ts">
const emit = defineEmits(["click"]);
const onClick = (event: Event) => {
  emit("click", event);
};
</script>

<template>
  <button class="ui-button" @click="onClick">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
  border: 1px solid darkgray;
  background-color: white;
  cursor: pointer;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 0.2em darkgrey, 0 0 0 0.2em darkgrey;
  }
}
</style>
