import { combineReducers } from "redux";
import sidebar from "./sidebarReducer";
import user from "./userReducer";
import profile from "./profileMenuReducer";
import course from "./courseReducer";
import homeScreen from "./homeScreenReducer";
import section from "./sectionReducer";

export default combineReducers({
  sidebar,
  user,
  profile,
  course,
  homeScreen,
  section
});
