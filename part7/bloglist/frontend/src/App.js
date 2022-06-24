import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import { useField } from "./hooks";
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { clearUser, setUser } from "./reducers/userReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const password = useField("password");
  const username = useField("username");

  const blogFormRef = useRef();

  const addBlog = (newBlog) => {
    dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: username.attributes.value,
        password: password.attributes.value,
      });

      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
      username.reset();
      password.reset();

      dispatch(
        setNotification({
          message: `Logged in as ${user.name}`,
          type: "notification",
        })
      );
    } catch (err) {
      dispatch(
        setNotification({ message: err.response.data.error, type: "error" })
      );
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    dispatch(clearUser());
    blogService.setToken(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      {notificationBar()}
      <div>
        username
        <input {...username.attributes} id="username" />
      </div>
      <div>
        password
        <input {...password.attributes} id="password" />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const notificationBar = () => {};

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog));
  };

  useEffect(() => {
    const user_token = window.localStorage.getItem("user");

    if (user_token) {
      const user = JSON.parse(user_token);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }

    dispatch(initializeBlogs());
  }, [dispatch]);

  const matchedUserId = useMatch("/users/:id");
  console.log(matchedUserId);
  const matchedUser = matchedUserId
    ? users.find((checkUser) => checkUser.id === matchedUserId.params.id)
    : null;

  return user ? (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in <button onClick={logout}>logout</button>
      </div>
      <Routes>
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              <br />
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
              ))}
            </>
          }
        />
      </Routes>
    </div>
  ) : (
    loginForm()
  );
};

export default App;
