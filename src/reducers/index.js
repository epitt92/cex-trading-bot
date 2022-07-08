import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import exchange from "./exchange";

export default combineReducers({
  auth,
  message,
  exchange
});