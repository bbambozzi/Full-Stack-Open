import { useSelector, useDispatch } from "react-redux";
import { newAnecdote, vote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const andotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleNewAnecdote = (event) => {
    event.preventDefault();
    const val = "".concat(event.target.anecdote.value);
    dispatch(newAnecdote(val));
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
