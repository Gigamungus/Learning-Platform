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

export const updateSectionDescription = (
  position,
  newDescription,
  sectionId,
  JWT
) => {
  return dispatch => {
    dispatch(updatingSectionDescription(position));
    return fetch(`${apiLocation}/api/updatesectiondescription/${sectionId}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${JWT}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        newDescription
      })
    })
      .then(data => {
        if (data.status === 404) {
          return { error: "could not reach route" };
        } else {
          return data.json();
        }
      })
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          dispatch(updatedSectionDescription(position, data.newDescription));
        }
      });
  };
};

export const updatingSectionDescription = sectionPosition => ({
  type: EDITABLE_SECTION.UPDATING_DESCRIPTION,
  sectionPosition
});

export const updatedSectionDescription = (sectionPosition, description) => ({
  type: EDITABLE_SECTION.UPDATED_DESCRIPTION,
  sectionPosition,
  description
});

export const createNewPage = (position, pageName, sectionId, JWT) => {
  return dispatch => {
    dispatch(creatingNewPage(position));
    fetch(`${apiLocation}/api/createnewpage`, {
      method: "POST",
      headers: {
        authorization: `bearer ${JWT}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        pageName,
        sectionId
      })
    })
      .then(data => {
        if (data.status === 404) {
          return { error: "could not reach route" };
        } else {
          return data.json();
        }
      })
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          dispatch(createdNewPage(position, data));
        }
      });
  };
};

export const creatingNewPage = position => ({
  type: EDITABLE_SECTION.CREATING_NEW_PAGE,
  position
});

export const createdNewPage = (position, page) => ({
  type: EDITABLE_SECTION.CREATED_NEW_PAGE,
  position,
  page
});
