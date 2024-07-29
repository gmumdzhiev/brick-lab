export interface IAPIAddPartsToList {
  part_num: string;
  quantity: number;
  color_id: number;
}

export interface IAddPartsToList {
  partNum: string;
  quantity: number;
  colorId: number;
}

export interface IAddPartsToListError {
  message: string;
}
