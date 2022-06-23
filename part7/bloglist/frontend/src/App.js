import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const blogFormRef = useRef();

  const addBlog = (newBlog) => {
    dispatch(createBlog(newBlog));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");

      setNotification({
        message: `Logged in as ${user.name}`,
        type: "notification",
      });

      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    } catch (err) {
      setNotification({ message: err.response.data.error, type: "error" });

      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    blogService.setToken(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      {notificationBar()}
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const notificationBar = () => {
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

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog));
  };

  useEffect(() => {
    const user_token = window.localStorage.getItem("user");

    if (user_token) {
      const user = JSON.parse(user_token);
      setUser(user);
      blogService.setToken(user.token);
    }

    dispatch(initializeBlogs());
  }, [dispatch]);

  return user ? (
    <div>
      <h2>blogs</h2>
      {notificationBar()}
      <div>
        {user.name} logged in <button onClick={logout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
      ))}
    </div>
  ) : (
    loginForm()
  );
};

export default App;
