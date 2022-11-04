import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const AnecdoteCard = ({ anecdote }) => {
  const navigate = useNavigate();
  const handleNavigation = (anecdoteId) => {
    navigate(`/anecdotes/${anecdoteId}`);
  };
  return (
    <Card key={anecdote.id} variant="outlined">
      <Typography variant="h6">{anecdote.author}</Typography>
      <CardContent>
        <Typography variant="body1">{anecdote.title}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            handleNavigation(Number(anecdote.id));
          }}
        >
          More!
        </Button>
      </CardActions>
    </Card>
  );
};
export default AnecdoteCard;
