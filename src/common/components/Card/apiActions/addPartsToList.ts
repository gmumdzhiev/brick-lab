import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAddPartsToList,
  IAddPartsToListError,
  IAPIAddPartsToList,
} from "../interfaces/IAddPartsToList";
import { addPartsToListTransformer } from "../transformers/addPartsToListTransformer";
import { addPartsToListReverseTransformer } from "../transformers/addPartsToListReverseTransformer";

export interface AddPartsToListParams {
  userToken: string;
  listId: number;
  parts: IAddPartsToList[];
}

export const addPartsToList = createAsyncThunk<
  IAddPartsToList[],
  AddPartsToListParams,
  { rejectValue: IAddPartsToListError }
>(
  "partsList/addParts",
  async ({ userToken, listId, parts }, { rejectWithValue }) => {
    try {
      const url = `https://rebrickable.com/api/v3/users/${userToken}/partlists/${listId}/parts/`;
      const apiFormattedParts = addPartsToListReverseTransformer(parts);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `key ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiFormattedParts),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: `Error ${response.status}: ${errorData.message || "An error occurred"}`,
        });
      }

      const data: IAPIAddPartsToList[] = await response.json();
      if (data) {
        return addPartsToListTransformer(data);
      }

      return [];
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
