import {
  TOGGLE_PROFILE_OPTIONS,
  TOGGLE_CREATING_ACCOUNT
} from "./../actionCreators/index";
const initialState = { displayProfileMenu: false, creatingAccount: false };

const profile = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PROFILE_OPTIONS:
      return Object.assign({}, state, {
        displayProfileMenu: !state.displayProfileMenu
      });
    case TOGGLE_CREATING_ACCOUNT:
      return Object.assign({}, state, {
        creatingAccount: !state.creatingAccount
      });
    default:
      return state;
  }
};

export default profile;
