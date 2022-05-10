<script setup lang="ts">
import UiSvgIcon from "@/ui/UiSvgIcon.vue";
import { computed, nextTick, ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  width?: number;
}>();

const emit = defineEmits(["update:modelValue", "close"]);

const element = ref<HTMLElement | null>(null);

watch(
  () => props.modelValue,
  (value) => {
    nextTick(() => {
      if (value) {
        element.value && element.value.focus();
      }
    });
  }
);

const closeModal = () => {
  emit("close", false);
  emit("update:modelValue", false);
};

const styleObj = computed(() => ({
  width: `${props.width}px`,
}));
</script>

<template>
  <div v-if="modelValue" class="ui-modal" @click="closeModal">
    <div
      ref="element"
      class="ui-modal__content"
      :style="styleObj"
      tabindex="0"
      @click.stop
    >
      <h2 class="ui-modal__title"><slot name="header" /></h2>

      <div class="ui-modal__inner">
        <slot name="default" v-bind="{ closeModal }" />
      </div>

      <div class="ui-modal__footer">
        <slot name="footer" />
      </div>

      <UiSvgIcon
        class="ui-modal__icon"
        iconName="close"
        @click="closeModal"
        tabindex="0"
        @keydown.enter="closeModal"
      />
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
  z-index: 9999;

  &__title {
    margin-bottom: 1em;
  }

  &__content {
    position: relative;
    padding: 1em 3em 1em 1em;
    background-color: lightgrey;
    cursor: default;
    outline: none;
  }

  &__footer {
    margin-top: 1em;
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
