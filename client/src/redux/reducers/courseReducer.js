import { CREATE_COURSE_SKELETON, RESET_PAGE } from "../actionCreators";

const initialState = {
  creatingCourseSkeleton: false,
  createdCourseSkeleton: false,
  editingCourseId: undefined
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
    default:
      return state;
  }
};

export default course;
