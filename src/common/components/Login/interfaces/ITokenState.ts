import { IToken, ITokenError } from "./IToken";

export interface ITokenState {
  token?: IToken;
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: ITokenError;
}
