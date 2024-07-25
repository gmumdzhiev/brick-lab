import { ILegoSet, ILegoSetError } from "./ILegoSet";

export interface ISetState {
  list?: ILegoSet;
  status?: "loading" | "succeeded" | "failed";
  error?: ILegoSetError;
}
