import {
  RESET_PAGE,
  LOADING_COURSES,
  LOADED_COURSES
} from "./../actionCreators/index";
const initialState = {
  loadingCourses: false,
  loadedCourses: false,
  courses: undefined
};

const homeScreen = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_COURSES:
      return Object.assign({}, state, {
        loadingCourses: true,
        loadedCourses: false
      });
    case LOADED_COURSES:
      return Object.assign({}, state, {
        loadingCourses: false,
        loadedCourses: true,
        courses: action.courses
      });
    case RESET_PAGE.HOMESCREEN:
      return initialState;
    default:
      return state;
  }
};

export default homeScreen;
