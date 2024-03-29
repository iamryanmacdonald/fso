import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const addComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content });

  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const remove = async (blog) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);

  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { addComment, create, getAll, remove, setToken };
