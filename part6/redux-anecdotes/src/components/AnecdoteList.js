import { useSelector, useDispatch } from "react-redux";
import { likeAnecdote } from "../reducers/anecdotesReducer";
import { getFilter } from "../reducers/filterReducer";
import { setNotification } from "../reducers/notificationReducer";
export const AnecdoteList = () => {
  const allAnecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);

  const voteAnecdote = (id) => {
    dispatch(likeAnecdote(id));
    const foundNoteContent = allAnecdotes.find((n) => n.id === id).content;
    dispatch(setNotification(`You have voted for : ${foundNoteContent}`, 5000));
  };

  const sortAllAnecdotes = (allAnecdotes) => {
    console.log("sorting!");
    const allAnecs = [
      ...allAnecdotes.filter((a) => a.content.includes(filter)),
    ];
    const ans = allAnecs.sort((a, b) => {
      return a.votes < b.votes ? 1 : -1;
    });
    return [...ans];
  };

  return (
    <>
      {sortAllAnecdotes(allAnecdotes).map((anecdote) => (
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
