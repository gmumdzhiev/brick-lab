import { IAddPartsToList, IAddPartsToListError } from "./IAddPartsToList";

export interface IAddPartsToListState {
  list: IAddPartsToList[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: IAddPartsToListError | undefined;
}
