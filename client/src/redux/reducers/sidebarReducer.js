//actions
import { TOGGLE_SIDEBAR } from "./../actionCreators";

let initialScreenWidth = window.innerWidth;
const initialState = { sidebarVisible: initialScreenWidth >= 768 };

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarVisible: !state.sidebarVisible
      });
    default:
      return state;
  }
};

export default sidebar;
