import { IAddPartsToList, IAPIAddPartsToList } from "../interfaces/IAddPartsToList";

export const addPartsToListReverseTransformer = (parts: IAddPartsToList[]): IAPIAddPartsToList[] => {
  return parts.map(part => ({
    part_num: part.partNum,
    quantity: part.quantity,
    color_id: part.colorId,
  }));
};