import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [user] = useState(localStorage.getItem("user"));
  const onRedirectToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {user ? (
        <>
          <>
            <Typography variant="body2">Logged in as {user}</Typography>
          </>
          <>
            <Typography variant="h5">Create new Anecdote!</Typography>
          </>
        </>
      ) : (
        <>
          <Typography variant="body2">User not found</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              onRedirectToLogin();
            }}
          >
            Log In
          </Button>
        </>
      )}
    </>
  );
};

export default Create;
