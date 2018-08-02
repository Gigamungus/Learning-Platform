import { SIGNIN_USER } from "./index";

export const signinUser = (username, password) => {
  return dispatch => {
    fetch(`${window.location.host}/api/loginuser`, {
      method: "POST",
      "content-type": "application/json",
      body: {
        username,
        password
      }
    })
      .then(data => data.json())
      .then(data => console.log(data));
  };
};
