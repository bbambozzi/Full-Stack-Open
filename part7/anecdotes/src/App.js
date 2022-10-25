import { useState } from "react";
import { useMatch, Route, Routes, Link } from "react-router-dom";
import { useField } from "./hooks/useField";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const Notification = (props) => {
  return <h3>{props.message}</h3>;
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>Anecdote</h2>
      <ul>
        <li key={anecdote.id}>{anecdote.content}</li>
      </ul>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = ({ toggleNotification, addNew }) => {
  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, resetInfo] = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleNotification(`The anecdoete "${content.value}" has been created!`);
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const deleteAll = () => {
    resetAuthor();
    resetContent();
    resetInfo();
    return null;
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={deleteAll} type="reset">
          delete
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const singleAnecdoteMatch = useMatch("/anecdotes/:id");

  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const singleAnecdote = singleAnecdoteMatch
    ? anecdotes.find((a) => a.id === Number(singleAnecdoteMatch.params.id))
    : null;

  const [notification, setNotification] = useState("");

  const showTemporaryNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <div>
        <Menu />
        {notification ? <Notification message={notification} /> : null}
      </div>
      <Routes>
        <Route
          element={<SingleAnecdote anecdote={singleAnecdote} />}
          path="/anecdotes/:id"
        />
        <Route element={<Menu />} path="/menu" />
        <Route element={<AnecdoteList anecdotes={anecdotes} />} path="/" />
        <Route element={<About />} path="/about" />
        <Route
          element={
            <CreateNew
              addNew={addNew}
              toggleNotification={showTemporaryNotification}
            />
          }
          path="/create"
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
