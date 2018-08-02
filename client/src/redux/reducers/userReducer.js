import { SIGNING_IN, USER_SIGNED_IN } from "./../actionCreators";
import cookieParser from "./../../functions/cookie-parser";

const jwt = cookieParser(document.cookie).user;

const initialState = {
  userLoggedIn: Boolean(jwt),
  userLoggingIn: false,
  authJWT: jwt
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return Object.assign({}, state, { userLoggingIn: true });
    case USER_SIGNED_IN:
      document.cookie = `user=${action.JWT}`;
      return Object.assign({}, state, {
        userLoggingIn: false,
        userLoggedIn: true,
        authJWT: action.JWT
      });
    default:
      return state;
  }
};

export default user;
