import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialGetPartsListState";
import { getPartsListDetails } from "../apiActions/getPartsListDetails";

export const getPartsListDetailsSlice = createSlice({
  name: "get-parts-list-details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPartsListDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPartsListDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.error = undefined;
      })
      .addCase(getPartsListDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getPartsListDetailsSlice.reducer;
