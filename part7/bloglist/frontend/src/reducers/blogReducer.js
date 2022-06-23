import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
  },
});

export const { appendBlog, removeBlog, setBlogs } = blogSlice.actions;

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);

      dispatch(appendBlog(newBlog));

      dispatch(
        setNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          type: "notification",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "error",
        })
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog);

      dispatch(removeBlog(blog));

      dispatch(
        setNotification({
          message: `${blog.title} by ${blog.author} removed`,
          type: "notification",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "error",
        })
      );
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
