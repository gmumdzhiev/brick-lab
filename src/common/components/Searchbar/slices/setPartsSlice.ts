import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialSetPartsState";
import { getLegoSetParts } from "../apiActions/getLegoSetParts";

export const setPartsSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLegoSetParts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLegoSetParts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getLegoSetParts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default setPartsSlice.reducer
