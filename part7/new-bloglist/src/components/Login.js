import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../reducers/usersSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createUser(username));
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          <Typography>You are already logged in as {user}!</Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleLogout();
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <Box component="form" noValidate autoComplete="off">
          <Typography>Username</Typography>
          <TextField
            variant="outlined"
            type="text"
            onChange={onUsernameChange}
          />
          <br />
          <Typography>Password</Typography>
          <TextField type="password" onChange={onPasswordChange} />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit!
          </Button>
        </Box>
      )}
    </>
  );
};

export default Login;
