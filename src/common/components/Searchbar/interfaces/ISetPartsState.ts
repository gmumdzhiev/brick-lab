import { ILegoSetParts, ILegoSetPartsError } from "./ILegoSetParts";

export interface ISetPartsState {
  list?: ILegoSetParts;
  status?: "loading" | "succeeded" | "failed";
  error?: ILegoSetPartsError;
}
