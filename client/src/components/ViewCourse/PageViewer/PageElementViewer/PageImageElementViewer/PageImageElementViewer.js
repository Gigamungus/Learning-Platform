import React from "react";
import "./PageImageElementViewer.css";

const PageImageElementViewer = ({ imageURL }) => {
  return (
    <div className="PageImageElementViewer">
      <img src={imageURL} alt="course element viewer" />
    </div>
  );
};
export default PageImageElementViewer;
