import { LOAD_SECTIONS, EDIT_COURSE } from "./../actionCreators/index";
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
      return Object.assign({}, state, {
        loadingSections: false,
        loadedSections: true,
        sections: action.sections,
        courseName: action.courseTitle
      });
    case EDIT_COURSE.ADDED_SECTION:
      console.log(action);
      let newSections = state.sections.slice();
      newSections.push(action.section);
      return Object.assign({}, state, {
        sections: newSections
      });
    default:
      return state;
  }
};

export default sectionReducer;
