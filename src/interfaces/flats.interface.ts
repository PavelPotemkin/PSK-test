import { IBrand } from "./helpers/brand.interface";

export interface IFlats {
  [key: IFlatId]: IFlat;
}

// Брендирование
export type IFlatId = IBrand<string, "flatId">;

export interface IFlat<P extends string | null = string | null> {
  id: IFlatId;
  cost: number;
  type: "Нежилые помещения" | "Квартира" | "Паркинг";
  floor: number;
  number: string;
  square: number;
  status: "Выданы ключи" | "Договор" | "Бронь" | "Оформление" | "Свободна";
  subsidy: boolean;
  marginal: boolean;
  renovation: boolean;
  installment: boolean;
  article: null;
  state: null;
  plan_type: P;
}

export interface IFlatsWithFilter {
  [key: IFlatId]: IFlatWithFilter;
}

export type IFlatWithFilter = IFlat & {
  disabled?: boolean;
};
