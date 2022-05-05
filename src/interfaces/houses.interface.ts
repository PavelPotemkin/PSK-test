import { Brand } from "./helpers/brand.interface";

// Брендирование
export type HouseId = Brand<string, "houseId">;

export type Houses = HouseId[];
