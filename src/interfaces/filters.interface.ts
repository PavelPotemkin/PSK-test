import { IFlat } from "@/interfaces/flats.interface";

export type IFilters = IFilter[];

type IFilter = IFilterCheckbox | IFilterRange | IFilterSwitch;

type filterTypes = "range" | "checkbox" | "switch";

interface IFilterBase<T extends filterTypes> {
  type: T;
  code: keyof IFlat;
  name: string;
}

type IFilterRange = IFilterBase<"range"> & {
  minLimit: number;
  maxLimit: number;
};

type IFilterCheckbox = IFilterBase<"checkbox"> & {
  items: string[];
};

type IFilterSwitch = IFilterBase<"switch">;

export type IFiltersTarget = IFilterTarget[];

type IFilterTarget =
  | (IFilterCheckbox & {
      values: string[];
    })
  | (IFilterRange & {
      min: number;
      max: number;
    })
  | (IFilterSwitch & {
      value: boolean;
    });
