import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { clearUser } from "../reducers/userReducer";
import blogService from "../services/blogs";

const Navigation = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("user");
    dispatch(clearUser());
    blogService.setToken(null);
  };

  return (
    <div style={{ background: "lightgray", padding: 5 }}>
      <Link to="/" style={{ paddingRight: 5 }}>
        blogs
      </Link>
      <Link to="/users" style={{ paddingRight: 5 }}>
        users
      </Link>
      {user.name} logged in <button onClick={logout}>logout</button>
    </div>
  );
};

export default Navigation;
