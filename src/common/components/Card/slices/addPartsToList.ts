import { createSlice } from "@reduxjs/toolkit";
import { addPartsToList } from "../apiActions/addPartsToList";
import { initialState } from "../initialAddPartsToListState";

export const addPartsToListSlice = createSlice({
  name: "add-parts-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPartsToList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPartsToList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.error = undefined;
      })
      .addCase(addPartsToList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default addPartsToListSlice.reducer;
