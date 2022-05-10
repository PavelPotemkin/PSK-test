<script lang="ts" setup>
import { IFiltersTarget } from "@/interfaces/filters.interface";
import UiCheckbox from "@/ui/fields/UiCheckbox.vue";
import UiRange from "@/ui/fields/UiRange.vue";
import UiSwitch from "@/ui/fields/UiSwitch.vue";
import { computed, reactive, watch } from "vue";
import UiModal from "@/ui/UiModal.vue";
import { useSwitcher } from "@/hooks/useSwitcher";
import UiButton from "@/ui/UiButton.vue";

const props = defineProps<{
  filters: IFiltersTarget;
}>();

const emit = defineEmits<{
  (e: "change", filters: IFiltersTarget): void;
  (e: "reset"): void;
}>();

const filters = reactive(JSON.parse(JSON.stringify(props.filters)));

watch(
  () => props.filters,
  (value) => {
    Object.assign(filters, value);
  }
);

const { isShow: isFilterShow, show: showFilter } = useSwitcher();

const save = () => {
  emit("change", filters);
};
const reset = () => {
  emit("reset");
};
</script>

<template>
  <div>
    <UiButton @click="showFilter"> Открыть фильтр </UiButton>

    <UiModal v-model="isFilterShow" content-class="filter-modal" :width="400">
      <template v-slot:header> Фильтры </template>

      <template v-slot:default>
        <div class="filter-panel">
          <template v-for="filter in filters">
            <div v-if="filter.type === 'checkbox'" :key="filter.code">
              <h4>
                {{ filter.name }}
              </h4>

              <UiCheckbox
                v-for="item in filter.items"
                v-model="filter.values"
                :value="item"
                :key="item"
              >
                {{ item }}
              </UiCheckbox>
            </div>

            <UiRange
              v-else-if="filter.type === 'range'"
              v-model:min="filter.min"
              v-model:max="filter.max"
              :min-limit="filter.minLimit"
              :max-limit="filter.maxLimit"
              :key="filter.code"
            >
              <h4>
                {{ filter.name }}
              </h4>
            </UiRange>

            <UiSwitch
              v-if="filter.type === 'switch'"
              v-model="filter.value"
              :key="filter.code"
            >
              <h4>
                {{ filter.name }}
              </h4>
            </UiSwitch>
          </template>
        </div>
      </template>

      <template v-slot:footer>
        <div class="filter-footer">
          <UiButton @click="save"> Сохранить </UiButton>

          <UiButton @click="reset"> Сбросить </UiButton>
        </div>
      </template>
    </UiModal>
  </div>
</template>

<style lang="scss" scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>
