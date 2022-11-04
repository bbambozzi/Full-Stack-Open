import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Container } from "@mui/system";
import store from "./reducers/store";
import { ThemeProvider as ThemeWrapper, createTheme } from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeWrapper theme={theme}>
      <Container>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </Container>
    </ThemeWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
