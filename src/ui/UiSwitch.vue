<script lang="ts" setup>
defineProps<{
  modelValue: {
    type: boolean;
    required: true;
  };
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="ui-switch">
    <input class="ui-switch__input visually-hidden" type="checkbox" />

    <span class="ui-switch__box">
      <span class="ui-switch__circle"></span>
    </span>

    <slot />
  </label>
</template>

<style lang="scss" scoped>
.ui-switch {
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: fit-content;
  padding: 0.2em 0;

  &__input:checked + .ui-switch__box .ui-switch__circle {
    transform: translateX(1em);
  }

  &__input:focus-visible + .ui-switch__box {
    box-shadow: 0 0 0 0.2em darkgrey, 0 0 0 0.2em darkgrey;
  }

  &__box {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 2em;
    height: 1.1em;
    overflow: hidden;
    box-shadow: 0 0 0 0.1em darkgrey;
    border-radius: 0.5em;
    background-color: darkgray;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    cursor: pointer;
  }

  &__circle {
    display: block;
    width: 1em;
    height: 1em;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
    transform: translateX(0px);
  }
}
</style>
