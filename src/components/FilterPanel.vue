<script lang="ts" setup>
import { IFilters } from "@/interfaces/filters.interface";
import UiCheckbox from "@/ui/fields/UiCheckbox.vue";
import UiRange from "@/ui/fields/UiRange.vue";
import UiSwitch from "@/ui/fields/UiSwitch.vue";

const props = defineProps<{
  filters: IFilters;
}>();

console.log(props);
</script>

<template>
  <div class="filter-panel">
    <template v-for="filter in filters">
      <UiCheckbox
        v-if="filter.type === 'checkbox'"
        v-model="filter.value"
        :key="filter.code"
      >
        {{ filter.name }}
      </UiCheckbox>

      <UiRange
        v-else-if="filter.type === 'range'"
        v-model:min="filter.min"
        v-model:max="filter.max"
        :min-limit="filter.minLimit"
        :max-limit="filter.maxLimit"
        :key="filter.code"
      >
        {{ filter.name }}
      </UiRange>

      <UiSwitch
        v-if="filter.type === 'switch'"
        v-model="filter.value"
        :key="filter.code"
      >
        {{ filter.name }}
      </UiSwitch>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
