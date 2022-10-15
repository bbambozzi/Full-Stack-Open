import { useSelector, useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleNewAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAnecdote(event.target.anecdote.value));
    dispatch(
      setNotification(`You have added '${event.target.anecdote.value}'`, 5000)
    );
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
