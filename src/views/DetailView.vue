<script setup lang="ts">
import FlatDetail from "@/components/FlatDetail.vue";
import { useRoute } from "vue-router";
import { IFlatId } from "@/interfaces/flats.interface";

const route = useRoute();
const flatId = route.params.id as IFlatId;
</script>

<template>
  <FlatDetail class="flat-detail" :flat-id="flatId" />
</template>

<style lang="scss" scoped>
.flat-detail {
  font-size: 1.5em;
}
</style>
