import { GET_PAGE_CONTENT, EDIT_PAGE } from "./../actionCreators/index";

const initialState = {
  loadingPageContent: false,
  loadedPageContent: false,
  pageContent: undefined,
  editingTitle: false,
  editingDescription: false,
  addingElement: false,
  contentToAddType: "text"
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

    case EDIT_PAGE.EDITING_PAGE_TITLE:
      return Object.assign({}, state, {
        editingTitle: true
      });

    case EDIT_PAGE.EDITED_PAGE_TITLE:
      return Object.assign({}, state, {
        editingTitle: false,
        pageContent: Object.assign({}, state.pageContent, {
          pageTitle: action.newTitle
        })
      });

    case EDIT_PAGE.EDITING_DESCRIPTION:
      return Object.assign({}, state, {
        editingDescription: true
      });

    case EDIT_PAGE.EDITED_DESCRIPTION:
      return Object.assign({}, state, {
        editingDescription: false,
        pageContent: Object.assign({}, state.pageContent, {
          pageDescription: action.newDescription
        })
      });

    case EDIT_PAGE.ADDING_ELEMENT:
      return Object.assign({}, state, {
        addingElement: true
      });

    case EDIT_PAGE.ADDED_ELEMENT:
      return Object.assign({}, state, {
        addingElement: false,
        pageContent: Object.assign({}, state.pageContent, {
          elements: action.newElements
        })
      });

    case EDIT_PAGE.CHANGE_CONTENT_TYPE:
      return Object.assign({}, state, {
        contentToAddType: action.newType
      });

    default:
      return state;
  }
};

export default page;
