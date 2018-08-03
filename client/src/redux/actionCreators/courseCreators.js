import secret from "./../../config/secrets";
import { LOADING_COURSES, LOADED_COURSES } from "./index";

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

export const loadingCourses = () => ({
  type: LOADING_COURSES
});

export const loadedCourses = courses => ({
  type: LOADED_COURSES,
  courses
});
