<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import CheckerboardItem from "@/components/checkerboard/CheckerboardItem.vue";
import { useLoading } from "@/hooks/useLoading";
import UiLoader from "@/ui/UiLoader.vue";
import UiModal from "@/ui/UiModal.vue";
import { useSwitcher } from "@/hooks/useSwitcher";
import { ICheckerboard } from "@/interfaces/checkerboard.interface";

const store = useStore();

// Чтобы искуственно замедлить загрузку для тестового показа лоадера
const longLoadedFetchData = async () => {
  await Promise.all([
    store.fetchData(),
    new Promise((resolve) => setTimeout(() => resolve(""), 1000)),
  ]);
};

const { error, fetchData, isLoading } = useLoading(longLoadedFetchData);
fetchData();

const checkerboard = computed<ICheckerboard>(() => ({
  flats: store.flats,
  houses: store.houses,
  entrances: store.entrances,
}));

const { isShow: isModalShow, show: showModal, hide: hideModal } = useSwitcher();
</script>

<template>
  <button @click="showModal">showModal</button>

  <button @click="hideModal">hideModal</button>

  <UiModal v-model="isModalShow"> hello </UiModal>

  <div v-if="error">
    {{ error }}
  </div>
  <div v-else-if="isLoading" class="loader">
    <UiLoader />
  </div>
  <div v-else>
    <CheckerboardItem
      v-for="entrance in checkerboard.entrances"
      :key="entrance.id"
      :entrance="entrance"
    />
  </div>
</template>

<style scoped>
.loader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}
</style>
