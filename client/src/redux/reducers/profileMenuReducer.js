import { TOGGLE_PROFILE_OPTIONS } from "./../actionCreators/index";
const initialState = { displayProfileMenu: false };

const profile = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PROFILE_OPTIONS:
      return Object.assign({}, state, {
        displayProfileMenu: !state.displayProfileMenu
      });
    default:
      return state;
  }
};

export default profile;
