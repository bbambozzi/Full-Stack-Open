import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    users: usersReducer,
  },
});
export default store;
