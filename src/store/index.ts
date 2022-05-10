import { defineStore } from "pinia";
import { IFlat, IFlatId, IFlats } from "@/interfaces/flats.interface";
import { IHouses } from "@/interfaces/houses.interface";
import {
  IEntrances,
  IGroupedEntrancesAcc,
} from "@/interfaces/entrances.interface";
import { CheckerboardService } from "@/services/checkerboard.service";
import { ITooltip } from "@/interfaces/tooltip.interface";
import { IFilters } from "@/interfaces/filters.interface";

export const useStore = defineStore("main", {
  state: () => {
    return {
      flats: {} as IFlats,
      houses: [] as IHouses,
      entrances: [] as IEntrances,
      tooltip: {} as ITooltip,
      currentFlatId: null as IFlatId | null,
      filters: [] as IFilters,
    };
  },
  getters: {
    availableEntrances(state): IEntrances {
      return state.entrances.filter((entrance) =>
        state.houses.includes(entrance.house_id)
      );
    },
    groupedEntrances(): IGroupedEntrancesAcc {
      return this.availableEntrances.reduce<IGroupedEntrancesAcc>(
        (acc, currentValue) => {
          if (acc[currentValue.house_id]) {
            acc[currentValue.house_id].push(currentValue);
          } else {
            acc[currentValue.house_id] = [currentValue];
          }

          return acc;
        },
        {}
      );
    },
  },
  actions: {
    setFilters() {
      const { minSquare, maxSquare, minCost, maxCost, plan_type, status } =
        Object.values(this.flats).reduce(
          (acc, flat) => {
            if (!acc.minSquare || flat.square < acc.minSquare) {
              acc.minSquare = Math.floor(flat.square);
            }
            if (!acc.maxSquare || flat.square > acc.maxSquare) {
              acc.maxSquare = Math.ceil(flat.square);
            }

            if (!acc.minCost || flat.cost < acc.minCost) {
              acc.minCost = Math.floor(flat.cost);
            }
            if (!acc.maxCost || flat.cost > acc.maxCost) {
              acc.maxCost = Math.ceil(flat.cost);
            }

            if (flat.plan_type && !acc.plan_type.includes(flat.plan_type)) {
              acc.plan_type.push(flat.plan_type);
            }

            if (flat.status && !acc.status.includes(flat.status)) {
              acc.status.push(flat.status);
            }

            return acc;
          },
          {
            minSquare: null,
            maxSquare: null,
            minCost: null,
            maxCost: null,
            plan_type: [],
            status: [],
          } as {
            minSquare: number | null;
            maxSquare: number | null;
            minCost: number | null;
            maxCost: number | null;
            plan_type: IFlat<string>["plan_type"][];
            status: IFlat["status"][];
          }
        );

      this.filters = [
        {
          type: "checkbox",
          code: "status",
          name: "Статус:",
          items: status,
        },
        {
          type: "checkbox",
          code: "plan_type",
          name: "Планировка:",
          items: plan_type,
        },
        {
          type: "range",
          code: "square",
          name: "Площадь:",
          minLimit: minSquare as number,
          maxLimit: maxSquare as number,
        },
        {
          type: "range",
          code: "cost",
          name: "Стоимость:",
          minLimit: minCost as number,
          maxLimit: maxCost as number,
        },
        {
          type: "switch",
          code: "subsidy",
          name: "Субсидированная",
        },
        {
          type: "switch",
          code: "marginal",
          name: "Маржинальная",
        },
        {
          type: "switch",
          code: "renovation",
          name: "С ремонтом",
        },
        {
          type: "switch",
          code: "installment",
          name: "С рассрочкой",
        },
      ];
    },
    async fetchCheckerboard() {
      try {
        const { flats, houses, entrances } = await CheckerboardService.getAll();
        this.flats = flats;
        this.houses = houses;
        this.entrances = entrances;
      } catch (error) {
        console.log(error);
      }
    },
    setTooltipData(data: ITooltip) {
      this.tooltip = data;
    },
    changeCurrentFlatId(flatId: IFlatId | null) {
      this.currentFlatId = flatId;
    },
  },
});
