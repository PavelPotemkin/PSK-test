import { IBrand } from "./helpers/brand.interface";

// Брендирование
export type IHouseId = IBrand<string, "houseId">;

export type IHouses = IHouseId[];
