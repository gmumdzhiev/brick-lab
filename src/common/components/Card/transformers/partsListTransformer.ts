import { IAPIPartsList, IPartsList, IPartsListResults } from "../interfaces/IPartsList";

export const partsListTransformer = (data: IAPIPartsList): IPartsList => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((result): IPartsListResults => ({
      id: result.id,
      isBuildable: result.is_buildable,
      name: result.name,
      numParts: result.num_parts,
    })),
  };
};