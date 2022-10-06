import React from "react";
import PropTypes from "prop-types";
const Notification = (props) => {
  const message = props.message;
  if (message) {
    return (
      <>
        <h1 className="notification">Notification! {message}</h1>
      </>
    );
  }
  return null;
};

Notification.propTypes = {
  message: PropTypes.string || PropTypes.bool,
};

export default Notification;
