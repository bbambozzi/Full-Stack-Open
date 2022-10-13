import { useSelector, useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";
import {
  showNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleNewAnecdote = (event) => {
    event.preventDefault();
    const val = "".concat(event.target.anecdote.value);
    dispatch(createAnecdote(val));
    dispatch(
      showNotification({
        message: "You have added the new note",
        content: event.target.anecdote.value,
      })
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
