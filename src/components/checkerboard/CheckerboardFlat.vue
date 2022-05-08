<script setup lang="ts">
import { IFlat } from "@/interfaces/flats.interface";
import { useStore } from "@/store";
import CheckerboardCeil from "@/components/checkerboard/CheckerboardCeil.vue";
import { computed } from "vue";

const store = useStore();
const props = defineProps<{
  flat: IFlat;
  disabled?: boolean;
  hideTooltip?: boolean;
}>();

const emit = defineEmits(["open"]);

let timer: number | undefined;

const showTooltip = (el: HTMLElement, flat: IFlat) => {
  if (props.hideTooltip || props.disabled) {
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
  if (props.hideTooltip || props.disabled) {
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
  flat_focusable: !props.disabled,
  flat_disabled: props.disabled,
}));

const classObjInner = computed(() => ({
  flat_status_booking: props.flat.status === "Бронь",
  flat_status_contract: props.flat.status === "Договор",
  flat_status_keys: props.flat.status === "Выданы ключи",
  flat_status_registration: props.flat.status === "Оформление",
  flat_status_free: props.flat.status === "Свободна",

  flat_subsidy: props.flat.subsidy,
  flat_marginal: props.flat.marginal,
  flat_renovation: props.flat.renovation,
  flat_installment: props.flat.installment,
}));

const emitOpen = () => {
  emit("open", props.flat);
};
</script>

<template>
  <CheckerboardCeil
    @mouseenter="showTooltip($el, flat)"
    @mouseleave="hideTooltip"
    @focus="showTooltip($el, flat)"
    @blur="hideTooltip"
    @keydown.enter="emitOpen"
    @click="emitOpen"
    :class="classObj"
    tabindex="0"
  >
    <div
      v-if="flat.type === 'Квартира'"
      class="flat_room body-1 text-white"
      :class="classObjInner"
    >
      {{ flat.plan_type }}

      <div v-if="flat.subsidy" class="flat__triangle_subsidy"></div>
      <div v-if="flat.marginal" class="flat__triangle_marginal"></div>
      <div v-if="flat.renovation" class="flat__triangle_renovation"></div>
      <div v-if="flat.installment" class="flat__triangle_installment"></div>
    </div>

    <div v-else-if="flat.type === 'Нежилые помещения'" class="flat_empty"></div>
  </CheckerboardCeil>
</template>

<style lang="scss" scoped>
.flat {
  &_room {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_empty {
    width: 70%;
    height: 70%;
    background-color: lightgrey;
  }

  &_status {
    &_booking {
      background-color: orange;
    }

    &_contract {
      background-color: darkgrey;
    }

    &_keys {
      background-color: green;
    }

    &_registration {
      background-color: cornflowerblue;
    }

    &_free {
      background-color: deeppink;
    }
  }

  &__triangle_subsidy {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 0.7em 0.7em;
    border-color: transparent transparent purple transparent;
  }

  &__triangle_marginal {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.7em 0 0 0.7em;
    border-color: transparent transparent transparent blue;
  }

  &__triangle_renovation {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.7em 0.7em 0;
    border-color: transparent green transparent transparent;
  }

  &__triangle_installment {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.7em 0.7em 0 0;
    border-color: khaki transparent transparent transparent;
  }

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
