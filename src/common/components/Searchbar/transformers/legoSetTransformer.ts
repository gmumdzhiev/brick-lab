import { IAPILegoSet, ILegoSet } from "../interfaces/ILegoSet";

export const legoSetTransformer = (apiAttributes: IAPILegoSet): ILegoSet => ({
  setNum: apiAttributes.set_num,
  name: apiAttributes.name,
  year: apiAttributes.year,
  themeId: apiAttributes.theme_id,
  numParts: apiAttributes.num_parts,
  setImgUrl: apiAttributes.set_img_url,
  setUrl: apiAttributes.set_url,
  lastModifiedDt: apiAttributes.last_modified_dt,
});
