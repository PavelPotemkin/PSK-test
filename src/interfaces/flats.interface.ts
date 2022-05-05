import { Brand } from "./helpers/brand.interface";

export interface Flats {
  [key: FlatId]: Flat;
}

// Брендирование
export type FlatId = Brand<string, "flatId">;

interface Flat {
  cost: number;
  type: "Нежилые помещения" | "Квартира" | "Паркинг";
  floor: number;
  number: string;
  square: number;
  status: "Договор" | "Выданы ключи" | "Бронь";
  id: "1a40a8bd-935c-11e9-a548-00155d015d00";
  subsidy: boolean;
  marginal: boolean;
  renovation: boolean;
  installment: boolean;
  article: null;
  state: null;
  plan_type: string | null;
}
