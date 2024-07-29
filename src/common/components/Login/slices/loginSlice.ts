import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { getUserToken } from "../apiActions/getUserToken";
import { IToken } from "../interfaces/IToken";

export const loginSLice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearToken(state) {
      state.status = "idle";
      state.token = undefined;
      state.error = undefined;
    },
    setToken(state, action: PayloadAction<IToken>) {
      state.status = "succeeded";
      state.token = action.payload;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUserToken.fulfilled,
        (state, action: PayloadAction<IToken>) => {
          state.status = "succeeded";
          state.token = action.payload;
          state.error = undefined;
        }
      )
      .addCase(getUserToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearToken, setToken } = loginSLice.actions;

export default loginSLice.reducer;
