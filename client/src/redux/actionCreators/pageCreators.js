import secret from "../../config/secrets";
import { GET_PAGE_CONTENT } from "./index";

const apiLocation = secret.apiLocation;

export const getPageContent = (pageId, JWT) => {
  return dispatch => {
    dispatch(gettingPageContent());
    return fetch(`${apiLocation}/api/getpagecontent/${pageId}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${JWT}`
      }
    })
      .then(data => {
        if (data.status === 404) {
          return { error: "could not reach route" };
        } else {
          return data.json();
        }
      })
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          dispatch(gotPageContent(data));
        }
      });
  };
};

export const gettingPageContent = () => ({
  type: GET_PAGE_CONTENT.GETTING_CONTENT
});

export const gotPageContent = content => ({
  type: GET_PAGE_CONTENT.GOT_CONTENT,
  content
});
