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

export default Notification;
