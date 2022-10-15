// simpe reducer that just sets a filter value
import { createSlice } from "@reduxjs/toolkit";

const initialState = { filter: "" };
const filterReducer = createSlice({
  initialState,
  name: "filter",
  reducers: {
    setFilter: (state, action) => {
      const newFilter = action.payload;
      return {
        filter: newFilter,
      };
    },
    clearFilter: (state, event) => {
      return {
        filter: "",
      };
    },
    getFilter: (state) => {
      return state;
    },
  },
});

export const { setFilter, clearFilter, getFilter } = filterReducer.actions;

export default filterReducer.reducer;
