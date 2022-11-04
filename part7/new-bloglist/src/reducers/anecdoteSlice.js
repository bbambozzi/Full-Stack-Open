import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  {
    author: "Edgar Dijkstra",
    title: "Go To Statement Considered Harmful",
    likes: 10,
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    id: 0,
  },
  {
    author: "Satoshi Nakamoto",
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
    url: "https://bitcoin.org/bitcoin.pdf",
    likes: 9,
    id: 1,
  },
  {
    author: "Roy Thomas Fielding",
    title:
      "Architectural Styles and the Design of Network-based Software Architectures",
    url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf",
    likes: 5,
    id: 2,
  },
  {
    author: "Edgar Dijkstra",
    title: "A Note on Two Problems in Connexion with Graphs",
    likes: 3,
    url: "http://www-m3.ma.tum.de/foswiki/pub/MN0506/WebHome/dijkstra.pdf",
    id: 4,
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote: (state, payload) => {
      const newState = state.push(payload.payload);
      return newState;
    },
    removeAnecdote: (state, payload) => {
      const newAnecdotes = state.filter((anec) => anec.id !== payload.payload);
      return newAnecdotes;
    },
    getAnecdotes: (state) => state,
    removeAllAnecdotes: () => {
      return [];
    },
    likeAnecdote: (state, action) => {
      console.log(`got payload ${action.payload}`);
      const id = action.payload;
      const anec = state.find((a) => a.id === id);
      if (!anec) {
        return state;
      }
      const newAnecdote = { ...anec, likes: anec.likes + 1 };
      const newState = state.filter((anec) => anec.id !== id);
      newState.push(newAnecdote);
      return newState;
    },
  },
});
export const {
  addAnecdote,
  removeAllAnecdotes,
  removeAnecdote,
  getAnecdotes,
  likeAnecdote,
} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
