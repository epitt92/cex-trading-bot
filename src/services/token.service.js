import axios from "axios";
import authHeader from "./auth-header";
import config from "./config"

const API_URL = config.endpoint()+"/api/tokenset/";

const getList = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};

const getItem = (hopperId) => {
  return axios.get(API_URL + "detail?id="+hopperId, { headers: authHeader() });
};
const deleteItem = (hopperId) => {
  return axios.get(API_URL + "delete?id="+hopperId, { headers: authHeader() });
};
const addItem = (hopperId,data) => {
  return axios.post(API_URL + "add",data, { headers: authHeader() });
};
const updateItem = (hopperId,data) => {
  return axios.post(API_URL + "edit?id"+hopperId,data, { headers: authHeader() });
};

export default {
  getList,
  getItem,
  deleteItem,
  addItem,
  updateItem
};