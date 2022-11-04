import { Typography, Paper, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const SingleAnecdote = () => {
  const anecdoteId = Number(useParams().id);
  const anecs = useSelector((state) => state.anecdotes);
  const anec = anecs.find((a) => a.id === anecdoteId);

  // TODO, the author should link to the specific username website;
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
            <Typography variant="body2">by {anec.author}</Typography>
          </>
        </>
      ) : (
        <Typography variant="h5">Anecdote not found 😥</Typography>
      )}
    </>
  );
};

export default SingleAnecdote;
