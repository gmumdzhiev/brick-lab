import { ICreatePartsList, ICreatePartsListError } from "./ICreatePartsList";

export interface ICreatePartsListState {
  list: ICreatePartsList | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ICreatePartsListError | undefined;
}
