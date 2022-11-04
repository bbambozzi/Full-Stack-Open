import { Container } from "@mui/system";
import { Router, Link, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import Anecdotes from "./components/Anecdotes";
import BasicMenu from "./components/BasicMenu";
import SingleAnecdote from "./components/SingleAnecdote";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import Login from "./components/Login";
import Create from "./components/Create";
import AnecdoteForm from "./components/AnecdoteForm";

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
          <Route path="/users/:id" element={<SingleUser />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<AnecdoteForm />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
