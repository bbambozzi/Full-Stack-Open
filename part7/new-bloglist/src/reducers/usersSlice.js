import { createSlice } from "@reduxjs/toolkit";

// This should be done in the backend, this is a quick sketch to get operational and produce a Proof of concept.
const initialState = [
  {
    user: "Edgar Dijkstra",
    id: 0,
  },
  {
    user: "Satoshi Nakamoto",
    id: 1,
  },
  {
    user: "Roy Thomas Fielding",
    id: 2,
  },
];

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    getAll: (state) => {
      return state;
    },
    createUser: (state, action) => {
      if (state.find((u) => u.user === action.payload)) {
        return state;
      }
      const newUser = action.payload;
      const newState = state.concat({ user: newUser });
      console.log(`new state is ${newState}`);
      return newState;
    },
    deleteUser: (state, action) => {
      const target = action.payload;
      const newUsers = state.filter((u) => u.user !== target);
      return newUsers;
    },
  },
});

export default userSlice.reducer;

export const { getAll, createUser, deleteUser } = userSlice.actions;
