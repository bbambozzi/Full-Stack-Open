import React, { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ DisplayTemporaryNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const response = await loginService
      .login({ username, password })
      .catch(() => {
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
              <input
                onChange={handleUsernameChange}
                data-testid="usernameInput"
              ></input>
              <p>Password</p>
              <input
                onChange={handlePasswordChange}
                data-testid="passwordInput"
              ></input>
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

LoginForm.propTypes = {
  DisplayTemporaryNotification: PropTypes.func.isRequired,
};

export default LoginForm;
