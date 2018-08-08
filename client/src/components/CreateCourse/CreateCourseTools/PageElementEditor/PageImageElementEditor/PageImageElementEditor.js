import React from "react";
import "./PageImageElementEditor.css";

const PageImageElementEditor = ({ imageURL }) => {
  return (
    <div className="PageImageElementEditor">
      <img src={imageURL} alt="course element editor" />
    </div>
  );
};
export default PageImageElementEditor;
