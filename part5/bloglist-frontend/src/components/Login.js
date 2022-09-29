import { useState, useEffect } from "react";
import loginService from "../services/login";

const LoginForm = (props) => {
  const DisplayTemporaryNotification = props.DisplayTemporaryNotification;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const response = await loginService
      .login({ username, password })
      .catch((_) => {
        DisplayTemporaryNotification(`Incorrent username or password`);
      });
    if (response) {
      window.localStorage.setItem("blogAppUser", JSON.stringify(response));
      window.location.reload(true);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <>
        <form onSubmit={handleLoginSubmit}>
          <>
            <>
              <p>Username</p>
              <input onChange={handleUsernameChange}></input>
              <p>Password</p>
              <input onChange={handlePasswordChange}></input>
            </>
            <>
              <button type="submit">Submit!</button>
            </>
          </>
        </form>
        <></>
      </>
    </>
  );
};

export default LoginForm;
