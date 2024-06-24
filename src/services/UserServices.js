import axios from "./axios";

const fetchAllUser = (page) => {
  return axios.get(`api/users?page=${page}`);
};

const createUser = (payload) => {
  return axios.post(`api/users`, payload);
};

export { fetchAllUser,createUser };
