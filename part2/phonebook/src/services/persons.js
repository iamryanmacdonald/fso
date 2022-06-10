import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const create = (newPerson) => axios.post(BASE_URL, newPerson);

const getAll = () => axios.get(BASE_URL);

const remove = (id) => axios.delete(BASE_URL + "/" + id);

export default {
  create,
  getAll,
  remove,
};
