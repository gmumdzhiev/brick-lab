import {
  IAPICreatePartsList,
  ICreatePartsList,
} from "../interfaces/ICreatePartsList";

export const createPartsListTransformer = (
  data: IAPICreatePartsList
): ICreatePartsList => {
  return {
    id: data.id,
    isBuildable: data.is_buildable,
    name: data.name,
    numParts: data.num_parts,
  };
};
