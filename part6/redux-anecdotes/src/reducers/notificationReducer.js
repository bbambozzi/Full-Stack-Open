import { createSlice } from "@reduxjs/toolkit";

const initialState = { content: null, message: null };

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      return {
        message: action.payload.message,
        content: action.payload.content,
      };
    },
    clearNotification: (state, action) => {
      return {
        message: null,
        content: null,
      };
    },
  },
});

export const { showNotification, clearNotification } = notification.actions;
export default notification.reducer;
