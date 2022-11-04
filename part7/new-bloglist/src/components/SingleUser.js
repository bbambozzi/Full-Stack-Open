import { Link, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Button } from "@mui/material";

const SingleUser = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const users = useSelector((state) => state.users);
  const anecs = useSelector((state) => state.anecdotes);
  const user = users.find((u) => u.id === id);
  const userAnecdotes = anecs.filter((a) => a.author === user.user);
  const navigateToAnecdote = (id) => {
    navigate(`/anecdotes/${id}`);
  };

  return (
    <>
      <>
        <Typography variant="h6" marginBottom="1em">
          {user.user}'s Anecdotes:
        </Typography>
      </>
      <>
        <Stack spacing={2}>
          {userAnecdotes.map((a) => (
            <Paper variant="elevation" key={a.id}>
              <Typography>{a.title}</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  navigateToAnecdote(a.id);
                }}
              >
                Visit
              </Button>
            </Paper>
          ))}
        </Stack>
      </>
    </>
  );
};

export default SingleUser;
