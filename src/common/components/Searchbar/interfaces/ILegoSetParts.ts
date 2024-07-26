export interface ExternalIds {
    BrickLink: string[];
    BrickOwl: string[];
    Brickset: string[];
    LDraw: string[];
    LEGO: string[];
  }
  
  export interface ColorExternalIds {
    BrickLink: IExternalIdDetails;
    BrickOwl: IExternalIdDetails;
    LEGO: IExternalIdDetails;
    Peeron: IExternalIdDetails;
    LDraw: IExternalIdDetails;
  }
  
  export interface ILegoSetParts {
    count: number;
    next: string | null;
    previous: string | null;
    results: IResult[];
  }
  
  export interface ILegoSetPartsError {
    message: string;
  }
  
  export interface IExternalIdDetails {
    extIds: (number | null)[];
    extDescrs: string[][];
  }
  
  export interface IColor {
    id: number;
    name: string;
    rgb: string;
    isTrans: boolean;
    externalIds: ColorExternalIds;
  }
  
  export interface IPart {
    partNum: string;
    name: string;
    partCatId: number;
    partUrl: string;
    partImgUrl: string;
    externalIds: ExternalIds;
    printOf: string | null;
  }
  
  export interface IResult {
    id: number;
    invPartId: number;
    part: IPart;
    color: IColor;
    setNum: string;
    quantity: number;
    isSpare: boolean;
    elementId: string;
    numSets: number;
  }
  
  // API Interfaces
  
  export interface IAPIExternalIdDetails {
    ext_ids: (number | null)[];
    ext_descrs: string[][];
  }
  
  export interface IAPIColor {
    id: number;
    name: string;
    rgb: string;
    is_trans: boolean;
    external_ids: IAPIColorExternalIds;
  }
  
  export interface IAPIPart {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_url: string;
    part_img_url: string;
    external_ids: ExternalIds;
    print_of: string | null;
  }
  
  export interface IAPIResult {
    id: number;
    inv_part_id: number;
    part: IAPIPart;
    color: IAPIColor;
    set_num: string;
    quantity: number;
    is_spare: boolean;
    element_id: string;
    num_sets: number;
  }
  
  export interface IAPIColorExternalIds {
    BrickLink: IAPIExternalIdDetails;
    BrickOwl: IAPIExternalIdDetails;
    LEGO: IAPIExternalIdDetails;
    Peeron: IAPIExternalIdDetails;
    LDraw: IAPIExternalIdDetails;
  }