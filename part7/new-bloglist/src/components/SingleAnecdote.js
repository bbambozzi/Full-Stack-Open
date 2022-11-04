import { Typography, Button, Link, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { likeAnecdote, commentAnecdote } from "../reducers/anecdoteSlice";
const SingleAnecdote = () => {
  const [anec, setAnec] = useState(null);
  const dispatch = useDispatch();
  const anecdoteId = Number(useParams().id);
  const anecs = useSelector((state) => state.anecdotes);
  const users = useSelector((state) => state.users);
  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setAnec(anecs.find((a) => a.id === anecdoteId));
  }, [anecs]);

  const handleSubmitComment = () => {
    dispatch(commentAnecdote({ comment: comment, id: anecdoteId }));
    setComment("");
  };

  useEffect(() => {
    if (anec == null || users == null) {
      return;
    }
    setUserId(users.find((u) => u.user === anec.author).id);
  }, [users, anec]);

  const handleAnecdoteLike = () => {
    dispatch(likeAnecdote(Number(anec.id)));
    console.log("triggered");
  };

  const navigate = useNavigate();
  const navigateToUserId = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <>
      {anec ? (
        <>
          <>
            <Typography variant="h5">{anec.title}</Typography>
          </>
          <>
            <Typography variant="body1">
              {"Find out more at "}
              <Link href={anec.url}>{anec.url}</Link>
            </Typography>
          </>
          <>
            <Typography>
              {`Likes: ${anec.likes}`}
              <Button
                variant="outlined"
                onClick={() => {
                  handleAnecdoteLike(anec.id);
                }}
              >
                👍
              </Button>
            </Typography>
          </>
          <>
            <Link
              component="button"
              onClick={() => {
                navigateToUserId();
              }}
            >
              <Typography variant="body2">by {anec.author}</Typography>
            </Link>
            <>
              <br />
              <>
                <Typography variant="h6" marginTop="0.5em">
                  Comments :
                </Typography>
                <ul>
                  {anec.comments.length ? (
                    <>
                      {anec.comments.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </>
                  ) : (
                    <>
                      <Typography variant="body2">
                        No Comments yet! Be the first to comment.
                      </Typography>
                    </>
                  )}
                </ul>
                <Typography variant="h7">Comment</Typography>
                <br />
                <TextField
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></TextField>
                <br />
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleSubmitComment();
                  }}
                >
                  Submit
                </Button>
              </>
            </>
          </>
        </>
      ) : (
        <Typography variant="h5">Anecdote not found 😥</Typography>
      )}
    </>
  );
};

export default SingleAnecdote;
