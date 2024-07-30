// thunks/getPartsListDetails.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAPIPartsListDetails,
  IPartsListDetails,
} from "../interfaces/IPartsListDetails";
import { partsListDetailsTransformer } from "../transformers/getPartsListDetailsTransformer";

export interface IPartListParams {
  userToken: string;
  listId: number;
  page?: number;
  pageSize?: number;
  incPartDetails?: number;
  incColorDetails?: number;
}

export const getPartsListDetails = createAsyncThunk<
  IPartsListDetails,
  IPartListParams,
  { rejectValue: { message: string } }
>(
  "partsList/getDetails",
  async (
    {
      userToken,
      listId,
      page = 1,
      pageSize = 10,
      incPartDetails = 1,
      incColorDetails = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      const url = `https://rebrickable.com/api/v3/users/${userToken}/partlists/${listId}/parts/?page=${page}&page_size=${pageSize}&inc_part_details=${incPartDetails}&inc_color_details=${incColorDetails}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `key ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: `Error ${response.status}: ${errorData.message || "An error occurred"}`,
        });
      }

      const data: IAPIPartsListDetails = await response.json();
      return partsListDetailsTransformer(data);
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue({
        message: errorMessage,
      });
    }
  }
);
