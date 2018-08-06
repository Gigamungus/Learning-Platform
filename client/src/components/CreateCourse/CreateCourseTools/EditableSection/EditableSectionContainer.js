import { connect } from "react-redux";
import EditableSection from "./EditableSection";
import {
  toggleEditableSectionExpanded,
  loadSectionContent,
  updateSectionDescription
} from "./../../../../redux/actionCreators/sectionCreators";

const mapStateToProps = (state, ownProps) => {
  let position = ownProps.sectionPosition;
  return {
    position,
    sectionId: state.section.sections[position]._id,
    expanded: state.section.sections[position].expanded,
    loadingSectionContent:
      state.section.sections[position].loadingSectionContent,
    loadedSectionContent: state.section.sections[position].loadedSectionContent,
    sectionContent: state.section.sections[position].sectionContent,
    sectionTitle: state.section.sections[position].sectionTitle,
    loadingSectionDescription: state.section.sections[position]
      .loadedSectionContent
      ? state.section.sections[position].sectionContent.loadingDescription
      : false,
    loadedSectionDescription: state.section.sections[position]
      .loadedSectionContent
      ? state.section.sections[position].sectionContent.loadedDescription
      : false,
    JWT: state.user.authJWT
  };
};

const mapDispatchToProps = dispatch => ({
  toggleSelfExpanded: position =>
    dispatch(toggleEditableSectionExpanded(position)),
  loadSectionContent: (sectionId, position, JWT) =>
    dispatch(loadSectionContent(sectionId, position, JWT)),
  updateDescription: (position, newDescription, sectionId, JWT) =>
    dispatch(
      updateSectionDescription(
        position,
        newDescription,
        sectionId,
        JWT
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableSection);
