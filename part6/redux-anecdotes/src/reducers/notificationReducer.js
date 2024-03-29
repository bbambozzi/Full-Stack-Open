import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state, action) => {
      return null;
    },
  },
});

export const setNotification = (message, timeout) => {
  return async (dispatch, getState) => {
    if (getState().notification) {
      dispatch(clearNotification());
    }
    dispatch(showNotification(message));
    setTimeout(() => {
      if (getState().notification === message) {
        dispatch(clearNotification());
      }
    }, timeout);
  };
};

export const { showNotification, clearNotification } = notification.actions;
export default notification.reducer;
