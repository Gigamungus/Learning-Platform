import React, { Component } from "react";
import Input from "./../../Input/Input";
import Button from "./../../Button/Button";

class CourseCreatorDashboard extends Component {
  constructor(props) {
    super(props);
    this.courseId = this.props.match.params.courseId;
  }
  titleChangeHelper(e) {
    this.props.editCourseTitle(e.target.value);
  }
  descriptionChangeHelper(e) {
    this.props.editCourseDescription(e.target.value);
  }
  componentDidMount() {
    this.props.loadCourse(this.courseId, this.props.JWT);
    this.persistentLoadCourse = setInterval(() => {
      this.props.loadCourse(this.courseId, this.props.JWT);
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.persistentLoadCourse);
    this.props.resetSelf();
  }
  render() {
    if (this.props.userMayNotViewCourse) {
      clearInterval(this.persistentLoadCourse);
      return <div>this course has been made private.</div>;
    } else if (this.props.loadedCourse) {
      clearInterval(this.persistentLoadCourse);
      console.log(this.props.course);
      let course = this.props.course;
      //create the actual page here

      let privacyToggle = course.public ? (
        <Button
          text="make course private"
          color="red"
          onClick={this.props.toggleCoursePrivacy}
        />
      ) : (
        <Button
          text="make course public"
          color="green"
          onClick={this.props.toggleCoursePrivacy}
        />
      );

      let page = (
        <div className="CourseCreatorDashboard">
          <Input
            placeholder="course title"
            value={course.title}
            onChange={this.titleChangeHelper.bind(this)}
          />
          <Input
            placeholder="course description"
            value={course.description}
            onChange={this.descriptionChangeHelper.bind(this)}
          />
          {privacyToggle}
        </div>
      );

      return page;

      //write code above here
    } else {
      return <div>loading</div>;
    }
  }
}

export default CourseCreatorDashboard;
