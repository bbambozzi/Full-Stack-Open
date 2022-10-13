import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const content = useSelector((state) => state.notification.content);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: content ? "" : "none",
  };
  return (
    <div style={style}>
      {message ? message : "nothing"} : {content ? content : "nothing"}
    </div>
  );
};

export default Notification;
