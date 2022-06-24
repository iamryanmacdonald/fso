import { useDispatch } from "react-redux";

import { useField } from "../hooks";
import { createComment } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const content = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createComment(blog.id, content.attributes.value));

    content.reset();
  };

  return blog ? (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input {...content.attributes} /> <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Blog;
