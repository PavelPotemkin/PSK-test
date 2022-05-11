<script setup lang="ts">
import { useSwitcher } from "@/hooks/useSwitcher";
import UiModal from "@/ui/UiModal.vue";
import { IFlat, IFlatId } from "@/interfaces/flats.interface";
import { useStore } from "@/store";
import getBooleanValueCorrectText from "@/helpers/getBooleanValueCorrectText";
import { computed, ref } from "vue";
import UiLoader from "@/ui/UiLoader.vue";
import CheckerboardFlatDisplay from "@/components/checkerboard/CheckerboardFlatDisplay.vue";
import UiButton from "@/ui/UiButton.vue";

const { isShow: isLegendShow, show: showLegend } = useSwitcher();

const store = useStore();

const flatsOptionsMap = new Map<keyof IFlat, Set<IFlat[keyof IFlat]>>();

const optionsDescription: {
  [key in keyof Partial<IFlat>]: string;
} = {
  type: "Тип помещения",
  status: "Статус помещения",
  subsidy: "Субсидированная",
  marginal: "Маржинальная",
  renovation: "С ремонтом",
  installment: "С рассрочкой",
};

const optionsKeys = computed(() => Array.from(flatsOptionsMap.keys()));

const baseFlat: IFlat = {
  id: "" as IFlatId,
  installment: false,
  renovation: false,
  subsidy: false,
  marginal: false,
  plan_type: "1К",
  square: 10,
  number: "1",
  floor: 1,
  status: "Договор",
  type: "Квартира",
  article: null,
  cost: 10000,
  state: null,
};

const getBooleanValueCorrectTextFn = getBooleanValueCorrectText;

const isLegendLoaded = ref(false);

const onLegendShow = () => {
  showLegend();
  if (isLegendLoaded.value) {
    return;
  }

  const whiteListOptions = Object.keys(optionsDescription);

  Object.values(store.flats).forEach((flat) => {
    const flatsKeys = Object.keys(flat);
    flatsKeys.forEach((flatsKey) => {
      const key = flatsKey as keyof IFlat;

      // елси ключ не в списке нужных для показа или он falsy - не добавлять его в легенду
      if (!whiteListOptions.includes(key) || !flat[key]) {
        return;
      }

      if (flatsOptionsMap.has(key)) {
        flatsOptionsMap.get(key)?.add(flat[key]);
      } else {
        flatsOptionsMap.set(key, new Set<IFlat[keyof IFlat]>().add(flat[key]));
      }
    });
  });

  isLegendLoaded.value = true;
};
</script>

<template>
  <UiButton class="legend-btn" @click="onLegendShow">
    Посмотреть легенду
  </UiButton>

  <UiModal v-model="isLegendShow">
    <template v-slot:header> Легенда </template>

    <template v-slot:default>
      <UiLoader v-if="!isLegendLoaded" />
      <div v-else class="legend">
        <div
          v-for="optionKey in optionsKeys"
          :key="optionKey"
          class="legend__option"
        >
          <h4 class="legend__option-title">
            {{ optionsDescription[optionKey] }}
          </h4>

          <div
            v-for="flatOption in flatsOptionsMap.get(optionKey)"
            :key="flatOption"
            class="legend__value"
          >
            <CheckerboardFlatDisplay
              class="legend__flat"
              :flat="{
                ...baseFlat,
                [optionKey]: flatOption,
              }"
            />

            {{
              typeof flatOption === "boolean"
                ? getBooleanValueCorrectTextFn(flatOption)
                : flatOption
            }}
          </div>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<style lang="scss" scoped>
.legend-btn {
  margin-bottom: 2em;
}

.legend {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;

  &__option {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  &__value {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  &__flat {
    background-color: white;
  }
}
</style>
