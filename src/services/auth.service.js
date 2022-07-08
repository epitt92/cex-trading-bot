import axios from "axios";
import config from "./config"

const API_URL = config.endpoint()+"/api/auth/";

const register = (username, email, password,ref) => {
  if(ref){
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      ref
    });    
  }else{
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });    
  }

};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("exchange");
};

export default {
  register,
  login,
  logout,
};