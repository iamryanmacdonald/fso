import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === "") return null;

  let color;

  switch (notification.type) {
    case "error":
      color = "red";
      break;
    case "notification":
      color = "green";
      break;
    default:
      color = "black";
  }

  return (
    <div
      style={{
        background: "lightgray",
        borderRadius: "5px",
        borderStyle: "solid",
        color,
        fontSize: "20px",
        marginBottom: "20px",
        padding: "10px",
      }}
      id="notification"
    >
      {notification.message}
    </div>
  );
};

export default Notification;
