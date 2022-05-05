import { IBrand } from "./helpers/brand.interface";

export interface IFlats {
  [key: IFlatId]: IFlat;
}

// Брендирование
export type IFlatId = IBrand<string, "flatId">;

interface IFlat {
  id: IFlatId;
  cost: number;
  type: "Нежилые помещения" | "Квартира" | "Паркинг";
  floor: number;
  number: string;
  square: number;
  status: "Договор" | "Выданы ключи" | "Бронь";
  subsidy: boolean;
  marginal: boolean;
  renovation: boolean;
  installment: boolean;
  article: null;
  state: null;
  plan_type: string | null;
}
