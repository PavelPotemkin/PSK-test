import { IFlats } from "@/interfaces/flats.interface";
import { IHouses } from "@/interfaces/houses.interface";
import { IEntrances } from "@/interfaces/entrances.interface";

export interface ICheckerboard {
  flats: IFlats;
  houses: IHouses;
  entrances: IEntrances;
}
