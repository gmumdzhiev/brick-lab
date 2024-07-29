import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initialCreateListState";
import { createPartsList } from "../apiActions/createPartsList";
import {
  ICreatePartsList,
  ICreatePartsListError,
} from "../interfaces/ICreatePartsList";

export const createPartsListSlice = createSlice({
  name: "create-parts-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPartsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createPartsList.fulfilled,
        (state, action: PayloadAction<ICreatePartsList>) => {
          state.status = "succeeded";
          state.list = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        createPartsList.rejected,
        (state, action: PayloadAction<ICreatePartsListError | undefined>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default createPartsListSlice.reducer;
