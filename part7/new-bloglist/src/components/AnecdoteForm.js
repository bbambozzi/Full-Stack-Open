import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author] = useState(localStorage.getItem("user"));
  const handleSubmit = () => {
    dispatch(addAnecdote({ url, title, author }));
    setTitle("");
    setUrl("");
  };
  return (
    <>
      {author ? (
        <Box component="form">
          <>
            <Typography>Logged in as {author}</Typography>
            <Typography>Title</Typography>
            <TextField
              variant="outlined"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </>
          <>
            <Typography>Url</Typography>
            <TextField
              variant="outlined"
              type="text"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </>
          <br />
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      ) : (
        <Typography>Please log in.</Typography>
      )}
    </>
  );
};

export default AnecdoteForm;
