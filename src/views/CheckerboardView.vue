<script setup lang="ts">
import { useStore } from "@/store";
import UiModal from "@/ui/UiModal.vue";
import { computed, ComputedRef, provide } from "vue";
import UiTooltip from "@/ui/UiTooltip.vue";
import { ITooltip } from "@/interfaces/tooltip.interface";
import { IFlatId, IFlatsWithFilter } from "@/interfaces/flats.interface";
import FlatDetail from "@/components/FlatDetail.vue";
import { useSwitcher } from "@/hooks/useSwitcher";
import UiSvgIcon from "@/ui/UiSvgIcon.vue";
import { LocationQueryRaw, useRoute, useRouter } from "vue-router";
import CheckerboardHousesList from "@/components/checkerboard/CheckerboardHousesList.vue";
import LegendTable from "@/components/LegendTable.vue";
import { IFiltersTarget } from "@/interfaces/filters.interface";
import FilterPanel from "@/components/FilterPanel.vue";
import { flatsInjectionSymbol } from "@/lib/injectionSymbols/flat";

const store = useStore();
const router = useRouter();

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

store.setFilters();

const route = useRoute();

const filters = computed<IFiltersTarget>(() =>
  store.filters.map((filter) => {
    switch (filter.type) {
      case "switch": {
        return {
          ...filter,
          value: Object.prototype.hasOwnProperty.call(route.query, filter.code),
        };
      }
      case "range": {
        if (
          Object.prototype.hasOwnProperty.call(route.query, filter.code) &&
          route.query[filter.code]
        ) {
          const [min, max] =
            decodeURI(route.query[filter.code] as string)?.split(",") || [];

          if (!isNaN(+min) && !isNaN(+max)) {
            return {
              ...filter,
              min: +min,
              max: +max,
            };
          }
        }
        return {
          ...filter,
          min: filter.minLimit,
          max: filter.maxLimit,
        };
      }
      case "checkbox": {
        if (!Object.prototype.hasOwnProperty.call(route.query, filter.code)) {
          return {
            ...filter,
            values: [],
          };
        }

        const values = (
          decodeURI(route.query[filter.code] as string)?.split(",") || []
        ).filter((item) => filter.items.includes(item));

        return {
          ...filter,
          values,
        };
      }
      default: {
        // В случае добавления нового типа фильтра тут будет ошибка
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const neverFilter: never = filter;
        return filter;
      }
    }
  })
);

const getUrlParamsFromFilter = (
  filtersValues: IFiltersTarget
): LocationQueryRaw => {
  const queryObj: {
    [key: string]: string | null;
  } = {};

  filtersValues.forEach((filter) => {
    switch (filter.type) {
      case "checkbox":
        if (filter.values.length) {
          queryObj[filter.code] = encodeURI(filter.values.join(","));
        }
        break;
      case "range":
        if (
          filter.min &&
          filter.max &&
          (filter.min !== filter.minLimit || filter.max !== filter.maxLimit)
        ) {
          queryObj[filter.code] = encodeURI([filter.min, filter.max].join(","));
        }
        break;
      case "switch":
        if (filter.value) {
          queryObj[filter.code] = null;
        }
        break;
    }
  });

  return queryObj;
};

const onFilterChange = async (value: IFiltersTarget) => {
  const query = getUrlParamsFromFilter(value);
  await router.push({ path: route.path, query });
};

const onFilterReset = () => {
  router.push({ path: route.path, query: {} });
};

const groupedEntrances = computed(() => store.groupedEntrances);

const notEmptyFilters = computed(() =>
  filters.value.filter((filter) => {
    switch (filter.type) {
      case "switch":
        if (filter.value) {
          return true;
        }
        break;
      case "range":
        if (filter.min !== filter.minLimit || filter.max !== filter.maxLimit) {
          return true;
        }
        break;
      case "checkbox":
        if (filter.values.length) {
          return true;
        }
        break;
      default: {
        // В случае добавления нового типа фильтра тут будет ошибка
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const neverFilter: never = filter;
        return filter;
      }
    }

    return false;
  })
);

const filteredFlats = computed<IFlatsWithFilter>(() => {
  if (!notEmptyFilters.value.length) {
    return store.flats;
  }

  const copyFlats = JSON.parse(JSON.stringify(store.flats)) as IFlatsWithFilter;

  for (const copyFlatsKey in copyFlats) {
    const flat = copyFlats[copyFlatsKey as IFlatId];

    for (const filter of notEmptyFilters.value) {
      const flatItem = flat[filter.code];
      if (!flatItem) {
        break;
      }

      switch (filter.type) {
        case "switch":
          if (!flat[filter.code]) {
            flat.disabled = true;
          }
          break;
        case "range":
          if (filter.min > flatItem || filter.max < flatItem) {
            flat.disabled = true;
          }
          break;
        case "checkbox":
          if (!filter.values.includes(String(flatItem))) {
            flat.disabled = true;
          }
          break;
        default: {
          // В случае добавления нового типа фильтра тут будет ошибка
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const neverFilter: never = filter;
          return filter;
        }
      }
    }
  }

  return copyFlats;
});

provide<ComputedRef<IFlatsWithFilter>>(flatsInjectionSymbol, filteredFlats);
</script>

<template>
  <div class="filter-panel">
    <FilterPanel
      :filters="filters"
      @change="onFilterChange"
      @reset="onFilterReset"
    />
  </div>

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

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  z-index: 999;
}

.filter-panel {
  margin-bottom: 1em;
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
