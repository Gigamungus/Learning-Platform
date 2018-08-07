import { GET_PAGE_CONTENT } from "./../actionCreators/index";

const initialState = {
  loadingPageContent: false,
  loadedPageContent: false,
  pageContent: undefined
};

const page = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_CONTENT.GETTING_CONTENT:
      return Object.assign({}, state, {
        loadingPageContent: true,
        loadedPageContent: false
      });

    case GET_PAGE_CONTENT.GOT_CONTENT:
      return Object.assign({}, state, {
        loadingPageContent: false,
        loadedPageContent: true,
        pageContent: action.content
      });

    default:
      return state;
  }
};

export default page;
