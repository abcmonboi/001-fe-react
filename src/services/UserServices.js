import axios from "./axios";

const fetchAllUser = (page) => {
  return axios.get(`api/users?page=${page}`);
};

const createUser = (payload) => {
  return axios.post(`api/users`, payload);
};

const updateUser = (payload) => {   
  return axios.put(`api/users/2`, payload);
};
export { fetchAllUser, createUser, updateUser };
