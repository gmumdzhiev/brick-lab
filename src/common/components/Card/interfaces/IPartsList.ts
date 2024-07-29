export interface IAPIPartsListResults {
  id: number;
  is_buildable: boolean;
  name: string;
  num_parts: number;
}

export interface IAPIPartsList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IAPIPartsListResults[];
}

export interface IPartsListResults {
  id: number;
  isBuildable: boolean;
  name: string;
  numParts: number;
}

export interface IPartsList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPartsListResults[];
}

export interface IPartsListError {
  message: string;
}
