import { Container } from "@mui/system";
import { Router, Link, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import Anecdotes from "./components/Anecdotes";
import BasicMenu from "./components/BasicMenu";
import SingleAnecdote from "./components/SingleAnecdote";
import Users from "./components/Users";

function App() {
  return (
    <>
      <div>
        <BasicMenu />
        <Typography variant="h3">Work in Progress!</Typography>
      </div>
      <div>
        <Routes>
          <Route path="/anecdotes" element={<Anecdotes />}></Route>
          <Route path="/anecdotes/:id" element={<SingleAnecdote />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;