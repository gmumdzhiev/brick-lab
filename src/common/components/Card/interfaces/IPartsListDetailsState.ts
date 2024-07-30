import { IPartsListDetails, IPartsListDetailsError } from "./IPartsListDetails";

export interface IPartsListDetailsState {
  list: IPartsListDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: IPartsListDetailsError | undefined;
}
