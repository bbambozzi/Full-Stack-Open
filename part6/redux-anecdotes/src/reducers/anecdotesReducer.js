import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const generateId = () => {
  const seed = Math.random() * 99999999;
  return Math.round(seed);
};

const contentToObject = (content) => {
  return { content, likes: 0, id: generateId() };
};

const anecdotes = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const anec = action.payload;
      state.push(anec);
    },
    upvoteAnecdote: (state, action) => {
      const id = action.payload;
      const found = state.find((a) => a.id === id);
      const newAnecdote = { ...found, likes: found.likes + 1 };
      return state.map((anec) => {
        return anec.id !== id ? anec : { ...newAnecdote };
      });
    },
    setAnecdotes: (state, action) => {
      const allAnecdotes = action.payload;
      return allAnecdotes;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch, getState) => {
    const allAnecdotes = await anecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(allAnecdotes));
  };
};

export const getAllAnecdotes = () => {
  return async (dispatch, getState) => {
    const allAnecdotes = await anecdoteService.getAllAnecdotes;
    dispatch(setAnecdotes(allAnecdotes));
  };
};

export const addAnecdote = (anecdoteContent) => {
  return async (dispatch, getState) => {
    let anecdote = {
      content: anecdoteContent,
      votes: 0,
      id: generateId().toString(),
    };
    await anecdoteService.addNewAnecdote(anecdote);
    dispatch(createAnecdote(anecdote));
  };
};

export const likeAnecdote = (anecdoteID) => {
  return async (dispatch, getState) => {
    let newAnecdote = getState().anecdotes.find(
      (anec) => anec.id === anecdoteID
    );
    newAnecdote = { ...newAnecdote, votes: newAnecdote.votes + 1 };
    await anecdoteService.changeAnecdote(newAnecdote);
    const allAnecs = getState().anecdotes.map((a) =>
      a.id === anecdoteID ? newAnecdote : a
    );
    dispatch(upvoteAnecdote(anecdoteID));
    dispatch(setAnecdotes(allAnecs));
  };
};

export const { createAnecdote, upvoteAnecdote, setAnecdotes } =
  anecdotes.actions;
export default anecdotes.reducer;
