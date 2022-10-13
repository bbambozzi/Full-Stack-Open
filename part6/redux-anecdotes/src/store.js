// redux store

import anecdotesReducer from "./reducers/anecdotesReducer";
import notificationReducer from "./reducers/notificationReducer";

import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});
