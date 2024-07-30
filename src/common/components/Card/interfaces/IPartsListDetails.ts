export interface IExternalIds {
  BrickLink: {
    extIds: number[];
    extDescrs: string[][];
  };
  BrickOwl: {
    extIds: number[];
    extDescrs: string[][];
  };
  LEGO: {
    extIds: number[];
    extDescrs: string[][];
  };
  Peeron: {
    extIds: number[];
    extDescrs: string[][];
  };
  LDraw: {
    extIds: number[];
    extDescrs: string[][];
  };
}

export interface IColor {
  id: number;
  name: string;
  rgb: string;
  isTrans: boolean;
  externalIds: IExternalIds;
}

export interface IPart {
  partNum: string;
  name: string;
  partCatId: number;
  partUrl: string;
  partImgUrl: string;
  externalIds: IExternalIds;
  printOf: null;
}

export interface IResult {
  listId: number;
  quantity: number;
  part: IPart;
  color: IColor;
}

export interface IPartsListDetails {
  count: number;
  next: null;
  previous: null;
  results: IResult[];
}

export interface IPartsListDetailsError {
    message: string;
}

// API

export interface IAPIExternalIds {
  BrickLink: {
    ext_ids: number[];
    ext_descrs: string[][];
  };
  BrickOwl: {
    ext_ids: number[];
    ext_descrs: string[][];
  };
  LEGO: {
    ext_ids: number[];
    ext_descrs: string[][];
  };
  Peeron: {
    ext_ids: number[];
    ext_descrs: string[][];
  };
  LDraw: {
    ext_ids: number[];
    ext_descrs: string[][];
  };
}

export interface IAPIColor {
  id: number;
  name: string;
  rgb: string;
  is_trans: boolean;
  external_ids: IAPIExternalIds;
}

export interface IAPIPart {
  part_num: string;
  name: string;
  part_cat_id: number;
  part_url: string;
  part_img_url: string;
  external_ids: IAPIExternalIds;
  print_of: null;
}

export interface IAPIResult {
  list_id: number;
  quantity: number;
  part: IAPIPart;
  color: IAPIColor;
}

export interface IAPIPartsListDetails {
  count: number;
  next: null;
  previous: null;
  results: IAPIResult[];
}
