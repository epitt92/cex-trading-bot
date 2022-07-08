import axios from "axios";
import authHeader from "./auth-header";
import config from "./config"

const API_URL = config.endpoint()+"/api/signal/";

const getList = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};


export default {
  getList
};