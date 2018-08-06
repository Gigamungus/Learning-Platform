import secret from "../../config/secrets";
import { LOAD_SECTIONS, EDIT_COURSE, EDITABLE_SECTION } from "./index";

const apiLocation = secret.apiLocation;

export const getCourseSections = (courseId, JWT) => {
  return dispatch => {
    dispatch(loadingCourseSections());
    return fetch(`${apiLocation}/api/getcourse/${courseId}`, {
      method: "GET",
      headers: {
        authorization: JWT
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
        } else {
          dispatch(
            loadedCourseSections(data.courseContent.sections, data.title)
          );
        }
      });
  };
};

export const loadingCourseSections = () => ({
  type: LOAD_SECTIONS.LOADING
});

export const loadedCourseSections = (sections, courseTitle) => ({
  type: LOAD_SECTIONS.LOADED,
  sections,
  courseTitle
});

export const addNewCourseSection = (title, courseId, JWT) => {
  return dispatch => {
    fetch(`${apiLocation}/api/createnewcoursesection`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${JWT}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title,
        courseId,
        JWT
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
        } else {
          dispatch(addedSection(data));
        }
      });
  };
};

export const addedSection = section => ({
  type: EDIT_COURSE.ADDED_SECTION,
  section
});

export const toggleEditableSectionExpanded = position => ({
  type: EDITABLE_SECTION.TOGGLE_SECTION,
  position
});

export const loadSectionContent = (sectionId, position, JWT) => {
  return dispatch => {
    dispatch(loadingSectionContent(position));
    return fetch(`${apiLocation}/api/loadsectioncontent/${sectionId}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${JWT}`
      }
    })
      .then(data => {
        if (data.status === 404) {
          return { error: "failed to fetch" };
        } else {
          return data.json();
        }
      })
      .then(data => {
        if (data.error) {
        } else {
          console.log("loaded");
          dispatch(loadedSectionContent(position, data));
        }
      });
  };
};

export const loadingSectionContent = sectionPosition => ({
  type: LOAD_SECTIONS.LOADING_SECTION_CONTENT,
  sectionPosition
});

export const loadedSectionContent = (sectionPosition, sectionContent) => ({
  type: LOAD_SECTIONS.LOADED_SECTION_CONTENT,
  sectionPosition,
  sectionContent
});
