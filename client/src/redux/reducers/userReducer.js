import {
  SIGNING_IN,
  USER_SIGNED_IN,
  LOGOUT_USER,
  CREATE_USER_ERRORS
} from "../actionCreators";
import cookieParser from "../../functions/cookie-parser";

const jwt = cookieParser(document.cookie).user;

const initialState = {
  userLoggedIn: Boolean(jwt),
  userLoggingIn: false,
  authJWT: jwt,
  loginError: "",
  signupError: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return Object.assign({}, state, { userLoggingIn: true });
    case USER_SIGNED_IN:
      document.cookie = `user=${action.JWT}; path=/`;
      return Object.assign({}, state, {
        userLoggingIn: false,
        userLoggedIn: true,
        authJWT: action.JWT
      });
    case LOGOUT_USER:
      document.cookie = `user=; path=/`;
      return Object.assign({}, state, { userLoggedIn: false, authJWT: "" });
    case CREATE_USER_ERRORS.PASSWORD_MISMATCH:
      return Object.assign({}, state, { signupError: "password missmatch" });
    case CREATE_USER_ERRORS.INVALID_USERNAME:
      return Object.assign({}, state, { signupError: "invalid username" });
    case CREATE_USER_ERRORS.USERNAME_TAKEN:
      return Object.assign({}, state, {
        signupError: "username taken"
      });
    default:
      return state;
  }
};

export default user;
