import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { useApolloClient } from "@apollo/client";
const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("graphql-library-login")
  );
  const logout = () => {
    setToken(null);
    client.clearStore();
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : (
          <button onClick={() => setPage("login")}>log in</button>
        )}
        {token ? (
          <button onClick={() => setPage("recommended")}>recommended</button>
        ) : null}
      </div>
      {token ? (
        <NewBook show={page === "add"} />
      ) : (
        <LoginForm show={page === "login"} setToken={setToken} />
      )}
      {token ? <button onClick={logout}>Log Out</button> : null}

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      {token && page === "recommended" ? (
        <Recommended show={page === "recommended"} />
      ) : null}
    </div>
  );
};

export default App;
