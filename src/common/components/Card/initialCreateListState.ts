import { ICreatePartsListState } from "./interfaces/ICreatePartsListState";

export const initialState: ICreatePartsListState = {
  list: null,
  status: "idle",
  error: undefined,
};
