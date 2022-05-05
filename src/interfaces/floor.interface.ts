import { FlatId } from "./flats.interface";

export interface Floor {
  floor: number;
  flats: {
    id: FlatId;
    number: number;
  }[];
}
