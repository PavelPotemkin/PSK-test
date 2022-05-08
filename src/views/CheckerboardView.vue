<script setup lang="ts">
import { useStore } from "@/store";
import UiModal from "@/ui/UiModal.vue";
import { computed } from "vue";
import UiTooltip from "@/ui/UiTooltip.vue";
import { ITooltip } from "@/interfaces/tooltip.interface";
import { IFlatId } from "@/interfaces/flats.interface";
import FlatDetail from "@/components/FlatDetail.vue";
import { useSwitcher } from "@/hooks/useSwitcher";
import UiSvgIcon from "@/ui/UiSvgIcon.vue";
import { useRouter } from "vue-router";
import CheckerboardHousesList from "@/components/checkerboard/CheckerboardHousesList.vue";
import LegendTable from "@/components/LegendTable.vue";

const store = useStore();
const router = useRouter();

const groupedEntrances = computed(() => store.groupedEntrances);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const selectedFlatId = computed<IFlatId | null>(() => store.currentFlatId);
const isShowSelectedFlat = computed<boolean>(() => !!store.currentFlatId);
const closeSelectedFlat = () => store.changeCurrentFlatId(null);

const tooltipData = computed<ITooltip>(() => store.tooltip);
const tooltipStyle = computed(() =>
  tooltipData.value.isShow
    ? {
        top: tooltipData.value.position.top + "px",
        left: tooltipData.value.position.left + "px",
      }
    : false
);

const copyFlatLink = () => {
  if (!selectedFlatId.value) {
    return;
  }

  const url = new URL(
    `${window.location.origin}/detail/${selectedFlatId.value}`
  );

  navigator.clipboard.writeText(url.href).then(
    () => ShowSuccessCopyModal(),
    () => ShowErrorCopyModal()
  );
};

const openInNewPage = () => {
  if (!selectedFlatId.value) {
    return;
  }

  router.push({ name: "detail", params: { id: selectedFlatId.value } });
};

const { isShow: isShowSuccessCopyModal, show: ShowSuccessCopyModal } =
  useSwitcher();
const { isShow: isShowErrorCopyModal, show: ShowErrorCopyModal } =
  useSwitcher();
</script>

<template>
  <LegendTable />

  <CheckerboardHousesList :houses="groupedEntrances" />

  <UiTooltip v-if="tooltipData.isShow" class="tooltip" :style="tooltipStyle">
    {{ tooltipData.text }}
  </UiTooltip>

  <UiModal :model-value="isShowSelectedFlat" @close="closeSelectedFlat">
    <FlatDetail :flat-id="selectedFlatId" />

    <div class="room-links">
      <button
        class="room-link"
        @keydown.enter="copyFlatLink"
        @click="copyFlatLink()"
      >
        Скопировать ссылку на квартиру

        <UiSvgIcon iconName="copy-link" />
      </button>

      <button
        class="room-link"
        @keydown.enter="openInNewPage"
        @click="openInNewPage()"
      >
        Открыть в новой вкладке

        <UiSvgIcon iconName="open-link" />
      </button>
    </div>

    <UiModal v-model="isShowSuccessCopyModal">
      Копирование ссылки прошло успешно
    </UiModal>

    <UiModal v-model="isShowErrorCopyModal">
      Ошибка копирования ссылки
    </UiModal>
  </UiModal>
</template>

<style scoped>
.tooltip {
  position: absolute;
  z-index: 999;
}

.room-links {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.room-link {
  display: flex;
  gap: 0.5em;
  width: fit-content;
  padding: 0.5em 0;
  text-decoration: underline;
  cursor: pointer;
}
</style>
