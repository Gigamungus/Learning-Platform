import secret from "../../config/secrets";
import { loadingCourses, loadedCourses } from "./homeScreenCreators";

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
