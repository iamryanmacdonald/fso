import { useField } from "../hooks";

const BlogForm = ({ createBlog }) => {
  const author = useField("text");
  const title = useField("text");
  const url = useField("text");

  const handleCreate = async (event) => {
    event.preventDefault();

    createBlog({
      author: author.attributes.value,
      title: title.attributes.value,
      url: url.attributes.value,
    });

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input {...title.attributes} id="title" />
        </div>
        <div>
          author:
          <input {...author.attributes} id="author" />
        </div>
        <div>
          url:
          <input {...url.attributes} id="url" />
        </div>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
