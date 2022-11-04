// load all users
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

const countUserAnecdotes = (user, anecdotes) => {
  const foundAnecdotes = anecdotes.reduce((acc, anec) => {
    return anec.author === user ? acc + 1 : acc;
  }, 0);
  return foundAnecdotes;
};

const Users = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const anecdotes = useSelector((state) => state.anecdotes);

  const navigateToUserId = (id) => {
    id = Number(id);
    navigate(`/users/${id}`);
  };
  return (
    <>
      <Typography variant="h5">Users</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.user}>
                <TableCell component="th" scope="row">
                  <Link
                    component="button"
                    underline="hover"
                    onClick={() => {
                      navigateToUserId(u.id);
                    }}
                  >
                    <Typography variant="body2">{u.user}</Typography>
                  </Link>
                </TableCell>
                <TableCell>{countUserAnecdotes(u.user, anecdotes)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
