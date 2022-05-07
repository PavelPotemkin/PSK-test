<script setup lang="ts">
import { IFlat, IFlatId } from "@/interfaces/flats.interface";
import { useStore } from "@/store";
import CheckerboardCeil from "@/components/checkerboard/CheckerboardCeil.vue";
import { computed } from "vue";

const store = useStore();
const props = defineProps<{
  flatId: IFlatId;
}>();

const flat: IFlat = store.flats[props.flatId];

const classObj = computed(() => ({
  flat_status_booking: flat.status === "Бронь",
  flat_status_contract: flat.status === "Договор",
  flat_status_keys: flat.status === "Выданы ключи",

  flat_subsidy: flat.subsidy,
  flat_marginal: flat.marginal,
  flat_renovation: flat.renovation,
  flat_installment: flat.installment,
}));

const isShowTriangle =
  flat.installment || flat.renovation || flat.marginal || flat.subsidy;

let timer: number | undefined;

const onFocus = (el: HTMLElement, flat: IFlat) => {
  timer = setTimeout(() => {
    const { top, left } = offset(el);
    store.setTooltipData({
      isShow: true,
      text: flat.type,
      position: {
        top: top + el.offsetHeight + 2,
        left,
      },
    });
  }, 500);
};

const onBlur = () => {
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

const onFocusEnter = () => {
  console.log("onFocusEnter");
};
</script>

<template>
  <CheckerboardCeil>
    <div
      v-if="flat.type === 'Квартира'"
      class="flat_room flat_focusable body-1 text-white"
      :class="classObj"
      @focus="onFocus($el, flat)"
      @blur="onBlur"
      @keydown.enter="onFocusEnter"
      tabindex="0"
    >
      {{ flat.plan_type }}

      <div v-if="isShowTriangle" class="flat__triangle"></div>
    </div>

    <div
      v-else-if="flat.type === 'Нежилые помещения'"
      class="flat_empty flat_focusable"
      @focus="onFocus($el, flat)"
      @blur="onBlur"
      @keydown.enter="onFocusEnter"
      tabindex="0"
    ></div>
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
  }

  &_subsidy .flat__triangle {
    border-color: transparent red transparent transparent;
  }

  &_marginal .flat__triangle {
    border-color: transparent purple transparent transparent;
  }

  &_renovation .flat__triangle {
    border-color: transparent brown transparent transparent;
  }

  &_installment .flat__triangle {
    border-color: transparent khaki transparent transparent;
  }

  &_focusable {
    &:hover,
    &:focus {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  &__triangle {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.7em 0.7em 0;
  }
}
</style>
