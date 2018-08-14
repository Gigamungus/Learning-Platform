import { connect } from "react-redux";
import SectionViewer from "./SectionViewer";
import { toggleSectionViewerExpanded } from "./../../../redux/actionCreators/sectionCreators";

const mapStateToProps = (state, ownProps) => {
  let position = ownProps.position;
  let sectionId = ownProps.sectionId;
  let sectionTitle = ownProps.sectionTitle;
  let courseId = ownProps.courseId;

  return {
    position,
    sectionId,
    sectionTitle,
    courseId,
    expanded: state.course.sectionsToView[position].expanded
  };
};

const mapDispatchToProps = dispatch => ({
  toggleSelfExpanded: position =>
    dispatch(toggleSectionViewerExpanded(position))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionViewer);
