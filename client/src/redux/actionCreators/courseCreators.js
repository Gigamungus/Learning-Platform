import secret from "../../config/secrets";
import { loadingCourses, loadedCourses } from "./homeScreenCreators";
import {
  CREATE_COURSE_SKELETON,
  RESET_PAGE,
  LOAD_COURSE_TO_EDIT,
  EDIT_COURSE
} from "./index";

const apiLocation = secret.apiLocation;

export const fetchRelevantCourses = numberOfCourses => {
  return dispatch => {
    dispatch(loadingCourses());
    fetch(`${apiLocation}/api/getrelevantcourses/${numberOfCourses}`)
      .then(data => data.json())
      .then(data => {
        if (data.error) {
        } else {
          dispatch(loadedCourses(data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createCourseSkeleton = jwt => {
  return dispatch => {
    dispatch(creatingCourseSkeleton());
    fetch(`${apiLocation}/api/createcourse`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${jwt}`
      }
    })
      .then(data => data.json())
      .then(data => dispatch(createdCourseSkeleton(data._id)));
  };
};

export const creatingCourseSkeleton = () => ({
  type: CREATE_COURSE_SKELETON.CREATING
});

export const createdCourseSkeleton = courseId => ({
  type: CREATE_COURSE_SKELETON.CREATED,
  courseId
});

export const resetCourseSkeletonCreator = () => ({
  type: RESET_PAGE.COURSE_SKELETON_CREATOR
});

export const loadCourseToEdit = (courseId, JWT) => {
  return dispatch => {
    dispatch(loadingCourseToEdit());
    fetch(`${apiLocation}/api/getcourse/${courseId}`, {
      headers: {
        Authorization: JWT
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          dispatch(loadingCourseError());
        } else {
          dispatch(loadedCourseToEdit(data));
        }
      });
  };
};

export const loadingCourseToEdit = () => ({
  type: LOAD_COURSE_TO_EDIT.LOADING
});

export const loadedCourseToEdit = course => ({
  type: LOAD_COURSE_TO_EDIT.LOADED,
  course
});

export const loadingCourseError = error => ({
  type: LOAD_COURSE_TO_EDIT.BAD_CREDENTIALS,
  error
});

export const resetCourseCreatorDashboard = () => ({
  type: RESET_PAGE.COURSE_CREATOR_DASHBOARD
});

export const editCourseTitle = newTitle => ({
  type: EDIT_COURSE.TITLE,
  newTitle
});

export const editCourseDescription = newDescription => ({
  type: EDIT_COURSE.DESCRIPTION,
  newDescription
});

export const toggleCoursePrivacy = () => ({
  type: EDIT_COURSE.PRIVACY
});

export const editCourseImage = newImage => ({
  type: EDIT_COURSE.IMAGE,
  newImage
});

export const saveCourseChanges = (courseId, JWT, courseEdit) => {
  return dispatch => {
    fetch(`${apiLocation}/api/editCourse/${courseId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${JWT}`
      },
      body: JSON.stringify({
        JWT,
        courseEdit
      })
    })
      .then(data => data.json())
      .then(data => console.log(data));
  };
};
