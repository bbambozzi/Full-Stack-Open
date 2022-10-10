import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { newAnecdote, vote } from "./reducers/anecdoteReducer";

const App = () => {
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
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
