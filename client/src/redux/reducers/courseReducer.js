import {
  CREATE_COURSE_SKELETON,
  RESET_PAGE,
  LOAD_COURSE_TO_EDIT,
  EDIT_COURSE,
  VIEW_COURSE
} from "../actionCreators/index";

const initialState = {
  creatingCourseSkeleton: false,
  createdCourseSkeleton: false,
  editingCourseId: undefined,
  loadingCourseToEdit: false,
  loadedCourseToEdit: false,
  loadingSectionToView: false,
  loadedSectionToView: false,
  sectionsToView: undefined,
  courseToEditTopLevel: undefined,
  userMayNotViewCourse: false
};

const defaultSectionToView = {
  _id: undefined,
  sectionTitle: undefined,
  loadingPages: false,
  loadedPages: false,
  pages: undefined
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COURSE_SKELETON.CREATING:
      return Object.assign({}, state, {
        creatingCourseSkeleton: true,
        createdCourseSkeleton: false,
        editingCourseId: undefined
      });
    case CREATE_COURSE_SKELETON.CREATED:
      return Object.assign({}, state, {
        creatingCourseSkeleton: false,
        createdCourseSkeleton: true,
        editingCourseId: action.courseId
      });
    case RESET_PAGE.COURSE_SKELETON_CREATOR:
      return Object.assign({}, state, {
        createdCourseSkeleton: false,
        creatingCourseSkeleton: false
      });

    case LOAD_COURSE_TO_EDIT.LOADING:
      return Object.assign({}, state, {
        loadingCourseToEdit: true,
        loadedCourseToEdit: false
      });
    case LOAD_COURSE_TO_EDIT.LOADED:
      return Object.assign({}, state, {
        loadingCourseToEdit: false,
        loadedCourseToEdit: true,
        courseToEditTopLevel: action.course
      });
    case LOAD_COURSE_TO_EDIT.BAD_CREDENTIALS:
      return Object.assign(
        state,
        {},
        {
          loadingCourseToEdit: false,
          loadedCourseToEdit: false,
          userMayNotViewCourse: true
        }
      );
    case RESET_PAGE.COURSE_CREATOR_DASHBOARD:
      return initialState;

    case EDIT_COURSE.TITLE:
      return Object.assign({}, state, {
        courseToEditTopLevel: Object.assign({}, state.courseToEditTopLevel, {
          title: action.newTitle
        })
      });
    case EDIT_COURSE.DESCRIPTION:
      return Object.assign({}, state, {
        courseToEditTopLevel: Object.assign({}, state.courseToEditTopLevel, {
          description: action.newDescription
        })
      });
    case EDIT_COURSE.PRIVACY:
      return Object.assign({}, state, {
        courseToEditTopLevel: Object.assign({}, state.courseToEditTopLevel, {
          public: !state.courseToEditTopLevel.public
        })
      });
    case EDIT_COURSE.IMAGE:
      return Object.assign({}, state, {
        courseToEditTopLevel: Object.assign({}, state.courseToEditTopLevel, {
          thumbnailImg: action.newImage
        })
      });

    case VIEW_COURSE.GETTING_SECTIONS:
      return Object.assign({}, state, {
        loadingSectionToView: true,
        loadedSectionToView: false
      });

    case VIEW_COURSE.GOT_SECTIONS:
      let sections = action.sections.slice();
      sections = sections.map(section =>
        Object.assign({}, defaultSectionToView, section)
      );
      return Object.assign({}, state, {
        loadingSectionToView: false,
        loadedSectionToView: true,
        sectionsToView: sections
      });

    case VIEW_COURSE.EXPAND_SECTION:
      sections = state.sectionsToView.slice();
      sections[action.position].expanded = !sections[action.position].expanded;

      return Object.assign({}, state, {
        sectionsToView: sections
      });

    case VIEW_COURSE.LOADING_PAGES_TO_VIEW:
      let loadingPagesToViewState = Object.assign({}, state);
      loadingPagesToViewState.sectionsToView[
        action.position
      ].loadingPages = true;

      return loadingPagesToViewState;

    case VIEW_COURSE.LOADED_PAGES_TO_VIEW:
      let loadedPagesToViewState = Object.assign({}, state);

      loadedPagesToViewState.sectionsToView[
        action.position
      ].loadingPages = false;

      loadedPagesToViewState.sectionsToView[action.position].loadedPages = true;

      loadedPagesToViewState.sectionsToView[action.position].pages =
        action.pages;

      return loadedPagesToViewState;

    default:
      return state;
  }
};

export default course;
