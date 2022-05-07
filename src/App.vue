<script setup lang="ts">
import { useStore } from "@/store";
import { useLoading } from "@/hooks/useLoading";
import UiLoader from "@/ui/UiLoader.vue";
import UiModal from "@/ui/UiModal.vue";
import CheckerboardHousesList from "@/components/checkerboard/CheckerboardHousesList.vue";
import { computed, onMounted } from "vue";
import UiTooltip from "@/ui/UiTooltip.vue";
import { ITooltip } from "@/interfaces/tooltip.interface";
import { IFlatId } from "@/interfaces/flats.interface";

const store = useStore();
const { error, fetchData, isLoading } = useLoading(store.fetchCheckerboard);

onMounted(() => fetchData());

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
</script>

<template>
  <UiTooltip v-if="tooltipData.isShow" class="tooltip" :style="tooltipStyle">
    {{ tooltipData.text }}
  </UiTooltip>

  <UiModal :model-value="isShowSelectedFlat" @close="closeSelectedFlat">
    {{ selectedFlatId }}
  </UiModal>

  <div v-if="error">
    {{ error }}
  </div>
  <div v-else-if="isLoading" class="loader">
    <UiLoader />
  </div>
  <div class="checkerboard" v-else>
    <CheckerboardHousesList :houses="groupedEntrances" />
  </div>
</template>

<style scoped>
.checkerboard {
  padding: 3em;
}

.loader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.tooltip {
  position: absolute;
  z-index: 999;
}
</style>
