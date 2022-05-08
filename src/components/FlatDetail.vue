<script setup lang="ts">
import { IFlat, IFlatId } from "@/interfaces/flats.interface";
import { useStore } from "@/store";
import getNameOfRoomPlanType from "@/helpers/getNameOfRoomPlanType";
import constants from "@/lib/constants";

const props = defineProps<{
  flatId: IFlatId;
}>();
const store = useStore();

const flat: IFlat = store.flats[props.flatId];
const getNameOfRoomPlanTypeFn = getNameOfRoomPlanType;
const getBooleanValueCorrectText = (value: boolean) => (value ? "Да" : "Нет");
const AREA_UNIT_SQUARE = constants.AREA_UNIT_SQUARE;
</script>

<template>
  <div class="flat">
    <h2 class="flat__title">{{ getNameOfRoomPlanTypeFn(flat.plan_type) }}</h2>
    <span> Тип: {{ flat.type }} </span>
    <span> Статус: {{ flat.status }} </span>
    <span>
      Субсидированная: {{ getBooleanValueCorrectText(flat.subsidy) }}
    </span>
    <span> Маржинальная: {{ getBooleanValueCorrectText(flat.marginal) }} </span>
    <span> С ремонтом: {{ getBooleanValueCorrectText(flat.renovation) }} </span>
    <span>
      С рассрочкой: {{ getBooleanValueCorrectText(flat.installment) }}
    </span>
    <span> Номер этажа: {{ flat.floor }} </span>
    <span> Номер: {{ flat.number }} </span>
    <span> Площадь: {{ flat.square }} {{ AREA_UNIT_SQUARE }} </span>
  </div>
</template>

<style lang="scss" scoped>
.flat {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  font-size: 1.1em;

  &__title {
    margin-bottom: 0.5em;
  }
}
</style>
