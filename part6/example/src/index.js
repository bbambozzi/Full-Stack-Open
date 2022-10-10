import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, configureStore } from "redux"; // This is deprecated, but illustrates an example

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

function App() {
  return (
    <>
      <h1>The Good App</h1>
      <h2>Current value is {store.getState()}</h2>
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>0</button>
    </>
  );
}
export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => root.render(<App />);
renderApp();

/* import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
