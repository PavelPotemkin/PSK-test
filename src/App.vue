<script setup lang="ts">
import { useLoading } from "@/hooks/useLoading";
import { onMounted } from "vue";
import { useStore } from "@/store";
import UiLoader from "@/ui/UiLoader.vue";

const store = useStore();
const { error, fetchData, isLoading } = useLoading(store.fetchCheckerboard);

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>

  <div v-else-if="isLoading" class="loader">
    <UiLoader />
  </div>

  <main class="main" v-else>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1440px;
  margin: auto;
  padding: 3em;
}

.loader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}
</style>
