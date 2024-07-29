// getUserToken.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseNotOkReject } from "../../../utils/api/responseNotOkReject/responseNotOkReject";
import { errorStatusAndExceptionDefault } from "../../../utils/api/errorStatusAndExceptionDefault/errorStatusAndExceptionDefault";
import { IAPIToken, IToken, ITokenError } from "../interfaces/IToken";
import { tokenTransformer } from "../transformers/tokenTransformer";

interface GetUserTokenParams {
  username: string;
  password: string;
}

export const getUserToken = createAsyncThunk<
  IToken,
  GetUserTokenParams,
  { rejectValue: ITokenError }
>("userToken/get", async ({ username, password }, { rejectWithValue }) => {
  try {
    const url = `https://rebrickable.com/api/v3/users/_token/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `key ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }),
    });

    if (!response.ok) {
      return rejectWithValue(
        responseNotOkReject("POST user token", response.status)
      );
    }

    const data: IAPIToken = await response.json();

    if (data) {
      return tokenTransformer(data);
    }

    return rejectWithValue(
      errorStatusAndExceptionDefault(
        "Get user token",
        "fetch_error",
        response.status,
        "🙊"
      )
    );
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue({
      message: `An error occurred: ${errorMessage}`,
    });
  }
});
