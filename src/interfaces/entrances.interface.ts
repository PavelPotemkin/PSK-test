import { IHouseId } from "./houses.interface";
import { IFloor } from "./floor.interface";
import { IBrand } from "./helpers/brand.interface";

export type IEntrances = IEntrance[];

// Брендирование
export type IEntranceId = IBrand<string, "entranceId">;

interface IEntrance {
  id: IEntranceId;
  house_id: IHouseId;
  title: string;
  floors: IFloor[];
}
