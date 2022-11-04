import { Typography, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { likeAnecdote } from "../reducers/anecdoteSlice";
const SingleAnecdote = () => {
  const [anec, setAnec] = useState(null);
  const dispatch = useDispatch();
  const anecdoteId = Number(useParams().id);
  const anecs = useSelector((state) => state.anecdotes);
  useEffect(() => {
    setAnec(anecs.find((a) => a.id === anecdoteId));
  }, [anecs]);
  const handleAnecdoteLike = (id) => {
    dispatch(likeAnecdote(Number(id)));
  };

  const navigate = useNavigate();
  const navigateToUserId = (id) => {
    id = Number(id);
    navigate(`/users/${id}`);
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
                navigateToUserId(anec.id);
              }}
            >
              <Typography variant="body2">by {anec.author}</Typography>
            </Link>
          </>
        </>
      ) : (
        <Typography variant="h5">Anecdote not found 😥</Typography>
      )}
    </>
  );
};

export default SingleAnecdote;
