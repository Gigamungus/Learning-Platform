import { combineReducers } from "redux";
import sidebar from "./sidebarReducer";
import user from "./userReducer";
import profile from "./profileMenuReducer";
import course from "./courseReducer";

export default combineReducers({
  sidebar,
  user,
  profile,
  course
});
