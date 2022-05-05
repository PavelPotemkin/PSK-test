<script setup lang="ts">
import UiSvgIcon from "@/ui/UiSvgIcon.vue";

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <div v-if="modelValue" class="ui-modal" @click="closeModal">
    <div class="ui-modal__content" @click.stop>
      <div class="ui-modal__inner">
        <slot v-bind="{ closeModal }" />
      </div>

      <UiSvgIcon class="ui-modal__icon" iconName="close" @click="closeModal" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &__content {
    position: relative;
    min-width: 400px;
    min-height: min(80vh, 200px);
    padding: 1em;
    background-color: lightgrey;
    cursor: default;
  }

  &__icon {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 1.5em;
    cursor: pointer;
  }
}
</style>
