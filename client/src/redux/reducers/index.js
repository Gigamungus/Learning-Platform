import { combineReducers } from "redux";
import sidebar from "./sidebarReducer";
import user from "./userReducer";
import profile from "./profileMenuReducer";

export default combineReducers({
  sidebar,
  user,
  profile
});
