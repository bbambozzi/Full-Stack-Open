import { useSelector, useDispatch } from "react-redux";
import { newAnecdote, vote } from "../reducers/anecdoteReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const voteAnecdote = (id) => {
    dispatch(vote(id));
  };

  const sortAllAnecdotes = (allNotes) => {
    const ans = allNotes.sort((a, b) => {
      return a.votes < b.votes ? 1 : -1;
    });
    return ans;
  };

  const handleNewAnecdote = (event) => {
    event.preventDefault();
    const val = "".concat(event.target.anecdote.value);
    dispatch(newAnecdote(val));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {sortAllAnecdotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
