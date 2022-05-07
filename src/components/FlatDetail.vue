<script setup lang="ts">
import { IFlat, IFlatId } from "@/interfaces/flats.interface";
import { useStore } from "@/store";
import getNameOfRoomPlanType from "@/helpers/getNameOfRoomPlanType";
import constants from "@/lib/constants";
import UiSvgIcon from "@/ui/UiSvgIcon.vue";
import UiModal from "@/ui/UiModal.vue";
import { useSwitcher } from "@/hooks/useSwitcher";

const props = defineProps<{
  flatId: IFlatId;
}>();
const store = useStore();

const flat: IFlat = store.flats[props.flatId];
const getNameOfRoomPlanTypeFn = getNameOfRoomPlanType;
const getBooleanValueCorrectText = (value: boolean) => (value ? "Да" : "Нет");
const AREA_UNIT_SQUARE = constants.AREA_UNIT_SQUARE;

const copyFlatLink = () => {
  const url = new URL(window.location.origin);
  url.searchParams.set("flat-id", props.flatId);

  navigator.clipboard.writeText(url.href).then(
    () => ShowSuccessCopyModal(),
    () => ShowErrorCopyModal()
  );
};

const { isShow: isShowSuccessCopyModal, show: ShowSuccessCopyModal } =
  useSwitcher();
const { isShow: isShowErrorCopyModal, show: ShowErrorCopyModal } =
  useSwitcher();
</script>

<template>
  <div class="flat">
    <span> Планировка: {{ getNameOfRoomPlanTypeFn(flat.plan_type) }} </span>
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
    <span> Номер квартиры: {{ flat.number }} </span>
    <span> Площадь квартиры: {{ flat.square }} {{ AREA_UNIT_SQUARE }} </span>

    <button
      class="flat__room-link"
      @keydown.enter="copyFlatLink"
      @click="copyFlatLink"
    >
      Скопировать ссылку на квартиру

      <UiSvgIcon iconName="copy-link" />
    </button>

    <UiModal v-model="isShowSuccessCopyModal">
      Копирование ссылки прошло успешно
    </UiModal>

    <UiModal v-model="isShowErrorCopyModal">
      Ошибка копирования ссылки
    </UiModal>
  </div>
</template>

<style lang="scss" scoped>
.flat {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  font-size: 1.1em;

  &__room-link {
    display: flex;
    gap: 0.5em;
    width: fit-content;
    padding: 0.5em 0;
    margin: 0.5em 0;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
