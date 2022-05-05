import { HouseId } from "./houses.interface";
import { Floor } from "./floor.interface";
import { Brand } from "./helpers/brand.interface";

export type Entrances = Entrance[];

// Брендирование
export type EntranceId = Brand<string, "entranceId">;

interface Entrance {
  id: EntranceId;
  house_id: HouseId;
  title: string;
  floors: Floor[];
}
