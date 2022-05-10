<script setup lang="ts">
import { IFlat } from "@/interfaces/flats.interface";
import { useStore } from "@/store";
import { computed } from "vue";
import CheckerboardFlatDisplay from "@/components/checkerboard/CheckerboardFlatDisplay.vue";

const store = useStore();
const props = defineProps<{
  flat: IFlat;
  disabled?: boolean;
}>();

const emit = defineEmits(["open"]);

let timer: number | undefined;

const showTooltip = (el: HTMLElement, flat: IFlat) => {
  if (props.disabled) {
    return;
  }

  timer = setTimeout(() => {
    const { top, left } = offset(el);
    store.setTooltipData({
      isShow: true,
      text: `Тип: ${flat.type}; Статус: ${flat.status}`,
      position: {
        top: top + el.offsetHeight + 2,
        left,
      },
    });
  }, 300);
};

const hideTooltip = () => {
  if (props.disabled) {
    return;
  }

  clearTimeout(timer);
  store.setTooltipData({
    isShow: false,
  });
};

function offset(el: HTMLElement) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = document.documentElement.scrollLeft,
    scrollTop = document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

const classObj = computed(() => ({
  "flat-display_focusable": !props.disabled,
  "flat-display_disabled": props.disabled,
}));

const emitOpen = () => {
  if (props.disabled) {
    return;
  }

  emit("open", props.flat);
};
</script>

<template>
  <div
    @mouseenter="showTooltip($el, flat)"
    @mouseleave="hideTooltip"
    @focus="showTooltip($el, flat)"
    @blur="hideTooltip"
    @keydown.enter="emitOpen"
    @click="emitOpen"
    :class="classObj"
    tabindex="0"
  >
    <CheckerboardFlatDisplay :flat="flat" />
  </div>
</template>

<style lang="scss" scoped>
.flat-display {
  &_focusable {
    &:hover,
    &:focus {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  &_disabled {
    opacity: 0.4;
  }
}
</style>
