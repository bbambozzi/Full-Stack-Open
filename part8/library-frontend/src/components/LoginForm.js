import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

const LoginForm = (props) => {
  const setToken = props.setToken;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, loginData] = useMutation(LOGIN);

  useEffect(() => {
    if (loginData.data) {
      const token = loginData.data.login.value;
      setToken(token);
      localStorage.setItem("graphql-library-login", token);
      console.log(`Token has been set to ${token}`);
    }
  }, [loginData.data]); // eslint-disable-line

  const onLogin = async (e) => {
    e.preventDefault();
    await loginMutation({ variables: { username, password } });
    setPassword("");
    setUsername("");
  };

  if (!props.show) {
    return null;
  }

  // Lifting the state up with this
  return (
    <>
      <>
        <p>Username</p>
        <input onChange={(e) => setUsername(e.target.value)}></input>
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)}></input>
      </>
      <button onClick={(e) => onLogin(e)}>Log In</button>
    </>
  );
};

export default LoginForm;
