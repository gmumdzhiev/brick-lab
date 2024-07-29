import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseNotOkReject } from "../../../utils/api/responseNotOkReject/responseNotOkReject";
import { errorStatusAndExceptionDefault } from "../../../utils/api/errorStatusAndExceptionDefault/errorStatusAndExceptionDefault";
import {
  IAPIPartsList,
  IPartsList,
  IPartsListError,
} from "../interfaces/IPartsList";
import { partsListTransformer } from "../transformers/partsListTransformer";

interface GetPartsListParams {
  userToken: string;
  page: number;
  pageSize: number;
}

export const getPartsList = createAsyncThunk<
  IPartsList,
  GetPartsListParams,
  { rejectValue: IPartsListError }
>(
  "partsList/get",
  async ({ userToken, page, pageSize }, { rejectWithValue }) => {
    try {
      const url = new URL(
        `https://rebrickable.com/api/v3/users/${userToken}/partlists/`
      );
      url.searchParams.append("page", page.toString());
      url.searchParams.append("page_size", pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `key ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue(
          responseNotOkReject("GET parts list", response.status)
        );
      }

      const data: IAPIPartsList = await response.json();

      if (data) {
        return partsListTransformer(data);
      }

      return rejectWithValue(
        errorStatusAndExceptionDefault(
          "Get parts list",
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
  }
);
