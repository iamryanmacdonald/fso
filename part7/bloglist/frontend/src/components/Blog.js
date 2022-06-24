const Blog = ({ blog }) =>
  blog ? (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  ) : null;

export default Blog;
