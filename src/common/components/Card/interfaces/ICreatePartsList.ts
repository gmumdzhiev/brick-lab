export interface IAPICreatePartsList {
  id: number;
  is_buildable: boolean;
  name: string;
  num_parts: number;
}

export interface ICreatePartsList {
  id: number;
  isBuildable: boolean;
  name: string;
  numParts: number;
}

export interface ICreatePartsListError {
  message: string;
}
