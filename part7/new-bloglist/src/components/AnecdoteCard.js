import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
const AnecdoteCard = ({ anecdote }) => {
  return (
    <Card key={anecdote.id} variant="outlined">
      <Typography variant="h6">{anecdote.author}</Typography>
      <CardContent>
        <Typography variant="body1">{anecdote.title}</Typography>
      </CardContent>
      <CardActions>
        <Button>More!</Button>
      </CardActions>
    </Card>
  );
};
export default AnecdoteCard;
