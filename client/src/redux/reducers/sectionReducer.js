import {
  LOAD_SECTIONS,
  EDIT_COURSE,
  EDITABLE_SECTION
} from "./../actionCreators/index";
import { createdNewPage } from "../actionCreators/sectionCreators";
const initialState = {
  courseName: "",
  sections: [],
  loadingSections: false,
  loadedSections: false
};

const initialSectionState = {
  expanded: false,
  loadingSectionContent: false,
  loadedSectionContent: false,
  sectionContent: undefined,
  creatingNewPage: false
};

const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SECTIONS.LOADING:
      return Object.assign({}, state, {
        loadingSections: true,
        loadedSections: false
      });
    case LOAD_SECTIONS.LOADED:
      let sections = action.sections.map((sect, index) => {
        return Object.assign(
          {},
          sect,
          {
            position: index
          },
          initialSectionState
        );
      });
      return Object.assign({}, state, {
        loadingSections: false,
        loadedSections: true,
        sections: sections,
        courseName: action.courseTitle
      });
    case EDIT_COURSE.ADDED_SECTION:
      let newSections = state.sections.slice();
      let newSection = Object.assign(
        {},
        action.section,
        {
          position: newSections.length
        },
        initialSectionState
      );

      newSections.push(newSection);
      return Object.assign({}, state, {
        sections: newSections
      });

    case EDITABLE_SECTION.TOGGLE_SECTION:
      let toggledSections = state.sections.slice();
      toggledSections[action.position].expanded = !toggledSections[
        action.position
      ].expanded;

      let newState = Object.assign({}, state, { sections: toggledSections });
      return newState;

    case LOAD_SECTIONS.LOADING_SECTION_CONTENT:
      let loadingSectionContentState = Object.assign({}, state);

      loadingSectionContentState.sections[
        action.sectionPosition
      ].loadedSectionContent = false;

      loadingSectionContentState.sections[
        action.sectionPosition
      ].loadingSectionContent = true;

      return loadingSectionContentState;

    case LOAD_SECTIONS.LOADED_SECTION_CONTENT:
      let loadedSectionContentState = Object.assign({}, state);

      loadedSectionContentState.sections[
        action.sectionPosition
      ].loadedSectionContent = true;

      loadedSectionContentState.sections[
        action.sectionPosition
      ].loadingSectionContent = false;

      loadedSectionContentState.sections[
        action.sectionPosition
      ].sectionContent =
        action.sectionContent;

      return loadedSectionContentState;

    case EDITABLE_SECTION.UPDATING_DESCRIPTION:
      let updatingDescriptionState = Object.assign({}, state);

      updatingDescriptionState.sections[
        action.sectionPosition
      ].sectionContent.loadingDescription = true;

      updatingDescriptionState.sections[
        action.sectionPosition
      ].sectionContent.loadedDescription = false;

      return updatingDescriptionState;
    case EDITABLE_SECTION.UPDATED_DESCRIPTION:
      let updatedDescriptionState = Object.assign({}, state);

      updatedDescriptionState.sections[
        action.sectionPosition
      ].sectionContent.loadingDescription = false;

      updatedDescriptionState.sections[
        action.sectionPosition
      ].sectionContent.loadedDescription = true;

      updatedDescriptionState.sections[
        action.sectionPosition
      ].sectionContent.description =
        action.description;

      return updatedDescriptionState;

    case EDITABLE_SECTION.CREATING_NEW_PAGE:
      let creatingNewPageState = Object.assign({}, state);

      creatingNewPageState.sections[action.position].creatingNewPage = true;

      return creatingNewPageState;

    case EDITABLE_SECTION.CREATED_NEW_PAGE:
      let createdNewPageState = Object.assign({}, state);

      createdNewPageState.sections[action.position].creatingNewPage = false;

      createdNewPageState.sections[action.position].sectionContent.pages.push(
        action.page
      );

    default:
      return state;
  }
};

export default sectionReducer;
