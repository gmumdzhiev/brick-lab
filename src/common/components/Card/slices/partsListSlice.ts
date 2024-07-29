import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { getPartsList } from "../apiActions/getPartsList";
import { IPartsList, IPartsListError } from "../interfaces/IPartsList";

export const partsListSlice = createSlice({
  name: "parts-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPartsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getPartsList.fulfilled,
        (state, action: PayloadAction<IPartsList>) => {
          state.status = "succeeded";
          state.partsList = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        getPartsList.rejected,
        (state, action: PayloadAction<IPartsListError | undefined>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default partsListSlice.reducer;
