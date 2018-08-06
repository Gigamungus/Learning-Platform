import {
  LOAD_SECTIONS,
  EDIT_COURSE,
  EDITABLE_SECTION
} from "./../actionCreators/index";
const initialState = {
  courseName: "",
  sections: [],
  loadingSections: false,
  loadedSections: false
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
        return Object.assign({}, sect, {
          position: index,
          expanded: false,
          loadingSectionContent: false,
          loadedSectionContent: false,
          sectionContent: undefined
        });
      });
      return Object.assign({}, state, {
        loadingSections: false,
        loadedSections: true,
        sections: sections,
        courseName: action.courseTitle
      });
    case EDIT_COURSE.ADDED_SECTION:
      let newSections = state.sections.slice();
      let newSection = Object.assign({}, action.section, {
        position: newSections.length,
        expanded: false,
        loadingSectionContent: false,
        loadedSectionContent: false,
        sectionContent: undefined
      });

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

    default:
      return state;
  }
};

export default sectionReducer;
