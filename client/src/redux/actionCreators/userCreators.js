import {
  SIGNING_IN,
  USER_SIGNED_IN,
  LOGOUT_USER,
  CREATE_USER_ERRORS,
  TOGGLE_CREATING_ACCOUNT
} from "./index";
import secret from "./../../config/secrets";

export const signupUser = (username, password, password2) => {
  if (password !== password2) {
    return {
      type: CREATE_USER_ERRORS.PASSWORD_MISMATCH
    };
  } else if (username.length < 2 || username.length > 16) {
    return {
      type: CREATE_USER_ERRORS.INVALID_USERNAME
    };
  } else {
    return dispatch => {
      fetch(`${secret.apiLocation}/api/createuser`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then(data => data.json())
        .then(data => {
          if (data.error) {
            if (data.error === "username taken") {
              dispatch({
                type: CREATE_USER_ERRORS.USERNAME_TAKEN
              });
            }
          } else {
            dispatch({
              type: TOGGLE_CREATING_ACCOUNT
            });
          }
        });
    };
  }
};

export const signinUser = (username, password) => {
  return dispatch => {
    dispatch(signingIn());
    fetch(`${secret.apiLocation}/api/loginuser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
        } else {
          dispatch(userSignedIn(data.jwt));
        }
      });
  };
};

export const signingIn = () => ({
  type: SIGNING_IN
});

export const userSignedIn = JWT => ({
  type: USER_SIGNED_IN,
  JWT
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});
