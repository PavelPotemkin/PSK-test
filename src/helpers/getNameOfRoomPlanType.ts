import { IFlat } from "@/interfaces/flats.interface";

export default function getNameOfRoomPlanType(
  planType: IFlat["plan_type"]
): string {
  if (!planType) {
    return "Нет";
  }
  let result = "";

  if (planType === "C") {
    result = "Студия";
  } else if (Number.isInteger(+planType[0])) {
    result += `${+planType[0]}-комнатная`;

    if (planType[1] === "E") {
      result += ` евро`;
    }

    result += ` квартира`;
  } else {
    result = planType;
  }

  return result;
}
