import { defineStore } from "pinia";
import { IFlats } from "@/interfaces/flats.interface";
import { IHouses } from "@/interfaces/houses.interface";
import { IEntrances } from "@/interfaces/entrances.interface";
import { CheckerboardService } from "@/services/checkerboard.service";

export const useStore = defineStore("main", {
  state: () => {
    return {
      flats: {} as IFlats,
      houses: [] as IHouses,
      entrances: [] as IEntrances,
    };
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
