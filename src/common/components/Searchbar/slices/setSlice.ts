import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialSetState";
import { getLegoSet } from "../apiActions/getLegoSet";

export const setSlice = createSlice({
  name: "set",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLegoSet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLegoSet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.error = undefined;
      })
      .addCase(getLegoSet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default setSlice.reducer;
