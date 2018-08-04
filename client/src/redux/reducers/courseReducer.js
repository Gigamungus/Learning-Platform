import {
  CREATE_COURSE_SKELETON,
  RESET_PAGE,
  LOAD_COURSE_TO_EDIT
} from "../actionCreators/index";

const initialState = {
  creatingCourseSkeleton: false,
  createdCourseSkeleton: false,
  editingCourseId: undefined,
  loadingCourseToEdit: false,
  loadedCourseToEdit: false,
  courseToEditTopLevel: undefined,
  userMayNotViewCourse: false
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COURSE_SKELETON.CREATING:
      return Object.assign({}, state, {
        creatingCourseSkeleton: true,
        createdCourseSkeleton: false,
        editingCourseId: undefined
      });
    case CREATE_COURSE_SKELETON.CREATED:
      return Object.assign({}, state, {
        creatingCourseSkeleton: false,
        createdCourseSkeleton: true,
        editingCourseId: action.courseId
      });
    case RESET_PAGE.COURSE_SKELETON_CREATOR:
      return Object.assign({}, state, {
        createdCourseSkeleton: false,
        creatingCourseSkeleton: false
      });

    case LOAD_COURSE_TO_EDIT.LOADING:
      return Object.assign({}, state, {
        loadingCourseToEdit: true,
        loadedCourseToEdit: false
      });
    case LOAD_COURSE_TO_EDIT.LOADED:
      return Object.assign({}, state, {
        loadingCourseToEdit: false,
        loadedCourseToEdit: true,
        courseToEditTopLevel: action.course
      });
    case LOAD_COURSE_TO_EDIT.BAD_CREDENTIALS:
      return Object.assign(
        state,
        {},
        {
          loadingCourseToEdit: false,
          loadedCourseToEdit: false,
          userMayNotViewCourse: true
        }
      );
    case RESET_PAGE.COURSE_CREATOR_DASHBOARD:
      return initialState;
    default:
      return state;
  }
};

export default course;
