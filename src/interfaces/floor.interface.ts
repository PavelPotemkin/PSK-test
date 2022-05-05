import { IFlatId } from "./flats.interface";

export interface IFloor {
  floor: number;
  flats: {
    id: IFlatId;
    number: number;
  }[];
}
