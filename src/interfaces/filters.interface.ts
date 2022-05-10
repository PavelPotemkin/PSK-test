import { IHouses } from "@/interfaces/houses.interface";
import { IFlat } from "@/interfaces/flats.interface";

export interface IFilters {
  house: IHouses;
  cost: {
    min: number;
    max: number;
  };
  square: {
    min: number;
    max: number;
  };
  status: IFlat["status"][];
  plan_type: IFlat["plan_type"][];
  subsidy: IFlat["subsidy"];
  marginal: IFlat["marginal"];
  renovation: IFlat["renovation"];
  installment: IFlat["installment"];
}
