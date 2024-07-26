import {
  IAPIColor,
  IAPIExternalIdDetails,
  IAPIPart,
  IAPIResult,
  IColor,
  IExternalIdDetails,
  ILegoSetParts,
  IPart,
  IResult,
} from "../interfaces/ILegoSetParts";

// Transformer for ExternalIdDetails
const externalIdDetailsTransformer = (
  apiDetails: IAPIExternalIdDetails
): IExternalIdDetails => ({
  extIds: apiDetails.ext_ids,
  extDescrs: apiDetails.ext_descrs,
});

// Transformer for Color
const colorTransformer = (apiColor: IAPIColor): IColor => ({
  id: apiColor.id,
  name: apiColor.name,
  rgb: apiColor.rgb,
  isTrans: apiColor.is_trans,
  externalIds: {
    BrickLink: externalIdDetailsTransformer(apiColor.external_ids.BrickLink),
    BrickOwl: externalIdDetailsTransformer(apiColor.external_ids.BrickOwl),
    LEGO: externalIdDetailsTransformer(apiColor.external_ids.LEGO),
    Peeron: externalIdDetailsTransformer(apiColor.external_ids.Peeron),
    LDraw: externalIdDetailsTransformer(apiColor.external_ids.LDraw),
  },
});

// Transformer for Part
const partTransformer = (apiPart: IAPIPart): IPart => ({
  partNum: apiPart.part_num,
  name: apiPart.name,
  partCatId: apiPart.part_cat_id,
  partUrl: apiPart.part_url,
  partImgUrl: apiPart.part_img_url,
  externalIds: {
    BrickLink: apiPart.external_ids.BrickLink,
    BrickOwl: apiPart.external_ids.BrickOwl,
    Brickset: apiPart.external_ids.Brickset,
    LDraw: apiPart.external_ids.LDraw,
    LEGO: apiPart.external_ids.LEGO,
  },
  printOf: apiPart.print_of,
});

// Transformer for Result
const resultTransformer = (apiResult: IAPIResult): IResult => ({
  id: apiResult.id,
  invPartId: apiResult.inv_part_id,
  part: partTransformer(apiResult.part),
  color: colorTransformer(apiResult.color),
  setNum: apiResult.set_num,
  quantity: apiResult.quantity,
  isSpare: apiResult.is_spare,
  elementId: apiResult.element_id,
  numSets: apiResult.num_sets,
});

// Transformer for LegoSetParts
export const legoSetPartsTransformer = (apiAttributes: {
  count: number;
  next: string | null;
  previous: string | null;
  results: IAPIResult[];
}): ILegoSetParts => ({
  count: apiAttributes.count,
  next: apiAttributes.next,
  previous: apiAttributes.previous,
  results: apiAttributes.results.map(resultTransformer),
});
