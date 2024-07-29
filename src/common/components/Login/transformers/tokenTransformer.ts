import { IAPIToken, IToken } from "../interfaces/IToken";

export const tokenTransformer = (data: IAPIToken): IToken => ({
  userToken: data.user_token,
});
