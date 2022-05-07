import { defineStore } from "pinia";
import { IFlats } from "@/interfaces/flats.interface";
import { IHouses } from "@/interfaces/houses.interface";
import {
  IGroupedEntrancesAcc,
  IEntrances,
} from "@/interfaces/entrances.interface";
import { CheckerboardService } from "@/services/checkerboard.service";

export const useStore = defineStore("main", {
  state: () => {
    return {
      flats: {} as IFlats,
      houses: [] as IHouses,
      entrances: [] as IEntrances,
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
    async fetchData() {
      try {
        const { flats, houses, entrances } = await CheckerboardService.getAll();
        this.flats = flats;
        this.houses = houses;
        this.entrances = entrances;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
