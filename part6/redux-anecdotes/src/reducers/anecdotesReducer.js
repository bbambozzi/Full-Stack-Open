import { createSlice } from "@reduxjs/toolkit";

const generateId = () => {
  const seed = Math.random() * 99999999;
  return Math.round(seed);
};

const contentToObject = (content) => {
  return { content, likes: 0, id: generateId() };
};

const allAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

let initialState = [];

for (let anec of allAnecdotes) {
  initialState.push(contentToObject(anec));
}

const anecdotes = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      const content = action.payload;
      state.push(contentToObject(content));
    },
    upvoteAnecdote: (state, action) => {
      const id = action.payload;
      const found = state.find((a) => a.id === id);
      const newAnecdote = { ...found, likes: found.likes + 1 };
      return state.map((anec) => {
        return anec.id !== id ? anec : { ...newAnecdote };
      });
    },
  },
});

export const { createAnecdote, upvoteAnecdote } = anecdotes.actions;
export default anecdotes.reducer;
