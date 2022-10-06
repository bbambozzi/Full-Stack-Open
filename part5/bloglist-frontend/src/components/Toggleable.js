//toggleable component
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Toggleable = (props) => {
  const [visible, setVisibile] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisibile(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} data-testid="divThatHides">
        {props.children}
        <button style={showWhenVisible} onClick={toggleVisibility}>
          Hide
        </button>
      </div>
    </>
  );
};

Toggleable.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.any,
};

export default Toggleable;
