import secret from "../../config/secrets";
import { loadingCourses, loadedCourses } from "./homeScreenCreators";
import { CREATE_COURSE_SKELETON, RESET_PAGE } from "./index";

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
