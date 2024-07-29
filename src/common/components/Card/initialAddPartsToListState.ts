import { IAddPartsToListState } from "./interfaces/IAddPartsToListState";

export const initialState: IAddPartsToListState = {
  list: null,
  status: "idle",
  error: undefined,
};
