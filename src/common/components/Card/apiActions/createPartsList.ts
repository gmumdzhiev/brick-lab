import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseNotOkReject } from "../../../utils/api/responseNotOkReject/responseNotOkReject";
import {
  IAPICreatePartsList,
  ICreatePartsList,
  ICreatePartsListError,
} from "../interfaces/ICreatePartsList";
import { createPartsListTransformer } from "../transformers/createPartsListTransformer";

interface CreatePartsListParams {
  userToken: string;
  isBuildable: boolean;
  name: string;
  numParts: number;
}

export const createPartsList = createAsyncThunk<
  ICreatePartsList,
  CreatePartsListParams,
  { rejectValue: ICreatePartsListError }
>(
  "partsList/create",
  async ({ userToken, isBuildable, name, numParts }, { rejectWithValue }) => {
    try {
      const url = `https://rebrickable.com/api/v3/users/${userToken}/partlists/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `key ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          is_buildable: String(isBuildable),
          name: name,
          num_parts: String(numParts),
        }),
      });

      if (!response.ok) {
        return rejectWithValue(
          responseNotOkReject("POST create parts list", response.status)
        );
      }

      const data: IAPICreatePartsList = await response.json();

      if (data) {
        return createPartsListTransformer(data);
      }

      return data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue({
        message: `An error occurred: ${errorMessage}`,
      });
    }
  }
);
