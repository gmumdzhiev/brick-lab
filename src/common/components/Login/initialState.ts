import { ITokenState } from "./interfaces/ITokenState";

export const initialState: ITokenState = {
  token: undefined,
  status: "idle",
  error: undefined,
};
