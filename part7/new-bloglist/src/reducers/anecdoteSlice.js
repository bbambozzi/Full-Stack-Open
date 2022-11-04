import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  {
    author: "Edgar Dijkstra",
    title: "Go To Statement Considered Harmful",
    likes: 10,
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    id: 0,
    comments: [],
  },
  {
    author: "Satoshi Nakamoto",
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
    url: "https://bitcoin.org/bitcoin.pdf",
    likes: 9,
    id: 1,
    comments: [],
  },
  {
    author: "Roy Thomas Fielding",
    title:
      "Architectural Styles and the Design of Network-based Software Architectures",
    url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf",
    likes: 5,
    id: 2,
    comments: [],
  },
  {
    author: "Edgar Dijkstra",
    title: "A Note on Two Problems in Connexion with Graphs",
    likes: 3,
    url: "http://www-m3.ma.tum.de/foswiki/pub/MN0506/WebHome/dijkstra.pdf",
    id: 4,
    comments: [],
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote: (state, action) => {
      const newAnecdote = {
        ...action.payload,
        id: state.length + 1,
        likes: 0,
        comments: [],
      };
      if (
        null == newAnecdote.author ||
        newAnecdote.url == null ||
        newAnecdote.title == null
      ) {
        return state;
      }
      const newState = state.concat(newAnecdote);
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
      const id = action.payload;
      const anec = state.find((a) => a.id === id);
      if (anec === undefined) {
        return state;
      }
      const newAnecdote = { ...anec, likes: anec.likes + 1 };
      const newState = state.filter((anec) => anec.id !== id);
      newState.push(newAnecdote);
      return newState;
    },
    commentAnecdote: (state, action) => {
      const payload = action.payload;
      const anecdoteId = Number(payload.id);
      const comment = payload.comment;
      if (comment === undefined || anecdoteId === undefined) {
        console.log(`comment ${comment} anecdoteId = ${anecdoteId}`);
        return state;
      }
      const anecdoteToComment = state.find((a) => a.id === anecdoteId);
      if (!anecdoteToComment) {
        console.log(`comment failed: did not find anecdote in db`);
        return state;
      }
      const newAnecdote = {
        ...anecdoteToComment,
        comments: anecdoteToComment.comments.concat(comment),
      };
      let newState = state.filter((anec) => anec.id !== anecdoteId);
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
  commentAnecdote,
} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
