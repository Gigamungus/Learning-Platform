import { LOADED_COURSES, LOADING_COURSES } from "../actionCreators";

const initialState = {
  loadingCourses: false,
  loadedCourses: false,
  courses: undefined
};

const course = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default course;
