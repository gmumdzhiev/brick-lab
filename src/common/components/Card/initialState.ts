import { IPartsListState } from "./interfaces/IPartsListState";

export const initialState: IPartsListState = {
  partsList: null,
  status: "idle",
  error: undefined,
};
