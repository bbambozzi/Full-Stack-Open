import { createSlice } from "@reduxjs/toolkit";

// TODO encrypt passwords with bcrypt
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
      const newUser = action.payload;
      state.append({ user: newUser });
      return state;
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
