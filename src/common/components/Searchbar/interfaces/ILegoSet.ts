export interface IAPILegoSet {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

export interface ILegoSet {
  setNum: string;
  name: string;
  year: number;
  themeId: number;
  numParts: number;
  setImgUrl: string;
  setUrl: string;
  lastModifiedDt: string;
}

export interface ILegoSetError {
  message: string;
}
