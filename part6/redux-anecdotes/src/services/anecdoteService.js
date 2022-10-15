import axios from "axios";
import { useDispatch } from "react-redux";

const baseUrl = "http://localhost:3001/anecdotes";
const getAllAnecdotes =
  (baseUrl,
  async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  });

const setAllAnecdotes =
  (baseUrl,
  async (newNotes) => {
    const response = await axios.post(baseUrl, newNotes);
    return response.data;
  });

const addNewAnecdote =
  (baseUrl,
  async (newAnecdotes) => {
    const response = await axios.post(baseUrl, newAnecdotes);
    return response.data;
  });

const changeAnecdote =
  (baseUrl,
  async (anecdoteToUpdate) => {
    const response = await axios.put(
      `${baseUrl}/${anecdoteToUpdate.id}`,
      anecdoteToUpdate
    );
    return response.data;
  });
export default {
  addNewAnecdote,
  setAllAnecdotes,
  getAllAnecdotes,
  changeAnecdote,
};
