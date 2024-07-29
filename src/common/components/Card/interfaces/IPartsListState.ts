import { IPartsList, IPartsListError } from "./IPartsList";

export interface IPartsListState {
    partsList: IPartsList | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: IPartsListError | undefined;
  }
  