import { Typography, Grid } from "@mui/material";
import AnecdoteCard from "./AnecdoteCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Anecdotes = () => {
  const anecs = useSelector((state) => state.anecdotes);
  return (
    <div>
      <>
        <br />
        <Typography variant="h4">Anecdotes</Typography>
        <br />
      </>
      <div>
        <Grid container spacing={2}>
          {anecs.map((a) => {
            return (
              <Grid item md={12} key={a.id}>
                <AnecdoteCard anecdote={a} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Anecdotes;
