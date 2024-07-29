import {
  IAddPartsToList,
  IAPIAddPartsToList,
} from "../interfaces/IAddPartsToList";

export const addPartsToListTransformer = (
  data: IAPIAddPartsToList[]
): IAddPartsToList[] => {
  return data.map((part) => ({
    partNum: part.part_num,
    quantity: part.quantity,
    colorId: part.color_id,
  }));
};
