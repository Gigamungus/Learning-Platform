import { SIGNING_IN, USER_SIGNED_IN } from "./index";
import secret from "./../../config/secrets";

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
