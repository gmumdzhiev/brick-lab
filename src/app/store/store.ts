import { configureStore } from "@reduxjs/toolkit";
import {
  setPartsReducer,
  setReducer,
} from "../../common/components/Searchbar/reducers";
import { loginReducer } from "../../common/components/Login/reducers";
import {
  createPartsListReducer,
  partsReducer,
  partsToListReducer,
} from "../../common/components/Card/reducers";

export const store = configureStore({
  reducer: {
    sets: setReducer,
    parts: setPartsReducer,
    login: loginReducer,
    partsList: partsReducer,
    createdPartsList: createPartsListReducer,
    partsToList: partsToListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
