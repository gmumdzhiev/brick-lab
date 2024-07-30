import {
  IAPIPartsListDetails,
  IAPIResult,
  IPartsListDetails,
  IResult,
  IExternalIds,
  IAPIExternalIds,
} from "../interfaces/IPartsListDetails";

const transformExternalIds = (
  apiExternalIds: IAPIExternalIds | undefined
): IExternalIds => ({
  BrickLink: {
    extIds: apiExternalIds?.BrickLink?.ext_ids ?? [],
    extDescrs: apiExternalIds?.BrickLink?.ext_descrs ?? [],
  },
  BrickOwl: {
    extIds: apiExternalIds?.BrickOwl?.ext_ids ?? [],
    extDescrs: apiExternalIds?.BrickOwl?.ext_descrs ?? [],
  },
  LEGO: {
    extIds: apiExternalIds?.LEGO?.ext_ids ?? [],
    extDescrs: apiExternalIds?.LEGO?.ext_descrs ?? [],
  },
  Peeron: {
    extIds: apiExternalIds?.Peeron?.ext_ids ?? [],
    extDescrs: apiExternalIds?.Peeron?.ext_descrs ?? [],
  },
  LDraw: {
    extIds: apiExternalIds?.LDraw?.ext_ids ?? [],
    extDescrs: apiExternalIds?.LDraw?.ext_descrs ?? [],
  },
});

export const partsListDetailsTransformer = (
  apiData: IAPIPartsListDetails
): IPartsListDetails => {
  const transformResult = (apiResult: IAPIResult): IResult => ({
    listId: apiResult.list_id,
    quantity: apiResult.quantity,
    part: {
      partNum: apiResult.part.part_num,
      name: apiResult.part.name,
      partCatId: apiResult.part.part_cat_id,
      partUrl: apiResult.part.part_url,
      partImgUrl: apiResult.part.part_img_url,
      externalIds: transformExternalIds(apiResult.part.external_ids),
      printOf: apiResult.part.print_of,
    },
    color: {
      id: apiResult.color.id,
      name: apiResult.color.name,
      rgb: apiResult.color.rgb,
      isTrans: apiResult.color.is_trans,
      externalIds: transformExternalIds(apiResult.color.external_ids),
    },
  });

  return {
    count: apiData.count,
    next: apiData.next,
    previous: apiData.previous,
    results: apiData.results.map(transformResult),
  };
};
