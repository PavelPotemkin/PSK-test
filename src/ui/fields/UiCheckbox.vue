<script lang="ts" setup>
import UiSvgIcon from "@/ui/UiSvgIcon.vue";

defineProps<{
  modelValue: {
    type: boolean;
    required: true;
  };
}>();

const emit = defineEmits(["update:modelValue"]);

const onChange = (value: boolean) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <label class="ui-checkbox">
    <input
      class="ui-checkbox__input visually-hidden"
      type="checkbox"
      :checked="modelValue"
      @change="onChange($event.target.checked)"
    />

    <span class="ui-checkbox__box">
      <UiSvgIcon class="ui-checkbox__icon" iconName="check" />
    </span>

    <slot />
  </label>
</template>

<style lang="scss" scoped>
.ui-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: fit-content;
  cursor: pointer;
  padding: 0.1em 0;

  &__icon {
    display: none;
  }

  &__input:checked {
    & ~ .ui-checkbox__box .ui-checkbox__icon {
      position: absolute;
      fill: white;
      display: block;
    }

    & ~ .ui-checkbox__box {
      background-color: darkgray;
    }
  }

  &__input:focus-visible + .ui-checkbox__box {
    box-shadow: 0 0 0 0.05em darkgrey, 0 0 0 0.05em darkgrey;
  }

  &__box {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    overflow: hidden;
    border: 0.1em solid darkgrey;
    background-color: white;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
}
</style>
