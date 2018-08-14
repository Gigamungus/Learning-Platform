import secret from "../../config/secrets";
import { GET_PAGE_CONTENT, EDIT_PAGE } from "./index";

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
          console.log(pageId, JWT);
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

export const editPage = (pageId, JWT, newTitle, newDescription, newElement) => {
  return dispatch => {
    if (newTitle) dispatch(changingPageTitle());
    if (newDescription) dispatch(changingPageDescription());
    if (newElement) dispatch(addingPageElement());
    fetch(`${apiLocation}/api/editpage/${pageId}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${JWT}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        pageTitle: newTitle,
        pageDescription: newDescription,
        newElement
      })
    })
      .then(data => {
        if (data.status === 404) {
          return { error: "cannot reach route" };
        } else {
          return data.json();
        }
      })
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          if (newTitle) dispatch(changedPageTitle(data.pageTitle));
          if (newDescription)
            dispatch(changedPageDescription(data.pageDescription));
          if (newElement) dispatch(addedPageElement(data.elements));
        }
      });
  };
};

export const changingPageTitle = () => ({
  type: EDIT_PAGE.EDITING_PAGE_TITLE
});

export const changedPageTitle = newTitle => ({
  type: EDIT_PAGE.EDITED_PAGE_TITLE,
  newTitle
});

export const changingPageDescription = () => ({
  type: EDIT_PAGE.EDITING_DESCRIPTION
});

export const changedPageDescription = newDescription => ({
  type: EDIT_PAGE.EDITED_DESCRIPTION,
  newDescription
});

export const addingPageElement = () => ({
  type: EDIT_PAGE.ADDING_ELEMENT
});

export const addedPageElement = newElements => ({
  type: EDIT_PAGE.ADDED_ELEMENT,
  newElements
});

export const changeContentToAddType = newType => ({
  type: EDIT_PAGE.CHANGE_CONTENT_TYPE,
  newType
});
