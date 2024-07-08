import axios from "./axios";

const fetchAllUser = (page) => {
  return axios.get(`api/users?page=${page}`);
};

const createUser = (payload) => {
  return axios.post(`api/users`, payload);
};

const updateUser = (payload) => {
  return axios.put(`api/users/${payload.id}`, payload);
};
const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`);
};
const loginApi = (payload) => {
  return axios.post(`api/login`, payload);
};
export { fetchAllUser, createUser, updateUser, deleteUser, loginApi };
