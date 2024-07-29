import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialSetPartsState";
import { getLegoSetParts } from "../apiActions/getLegoSetParts";

export const setPartsSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    resetParts: (state) => {
      state.list = initialState.list;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLegoSetParts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLegoSetParts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.list && state.list.results) {
          state.list.results = state.list.results.concat(
            action.payload.results
          );
        } else {
          state.list = action.payload;
        }
        state.list.next = action.payload.next;
      })
      .addCase(getLegoSetParts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetParts } = setPartsSlice.actions;


export default setPartsSlice.reducer;
