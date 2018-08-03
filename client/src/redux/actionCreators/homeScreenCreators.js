import { RESET_PAGE } from "./index";
import { LOADING_COURSES, LOADED_COURSES } from ".";

export const resetHomeScreen = () => ({
  type: RESET_PAGE.HOMESCREEN
});

export const loadingCourses = () => ({
  type: LOADING_COURSES
});

export const loadedCourses = courses => ({
  type: LOADED_COURSES,
  courses
});
