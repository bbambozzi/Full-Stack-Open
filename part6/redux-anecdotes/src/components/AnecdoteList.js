import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdotesReducer";
import { getFilter } from "../reducers/filterReducer";
import {
  showNotification,
  clearNotification,
} from "../reducers/notificationReducer";
export const AnecdoteList = () => {
  const allAnecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);

  const voteAnecdote = (id) => {
    dispatch(upvoteAnecdote(id));
    const foundNoteContent = allAnecdotes.find((n) => n.id === id).content;
    dispatch(
      showNotification({
        content: foundNoteContent,
        message: "You have voted for",
      })
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const sortAllAnecdotes = (allAnecdotes) => {
    const allAnecs = [
      ...allAnecdotes.filter((a) => a.content.includes(filter)),
    ];
    const ans = allAnecs.sort((a, b) => {
      return a.likes < b.likes ? 1 : -1;
    });
    return [...ans];
  };

  return (
    <>
      {sortAllAnecdotes(allAnecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.likes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
