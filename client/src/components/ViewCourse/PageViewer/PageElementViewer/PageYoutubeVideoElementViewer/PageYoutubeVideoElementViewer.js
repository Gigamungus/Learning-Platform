import React from "react";
import "./PageYoutubeVideoElementViewer.css";

const PageYoutubeVideoElementViewer = ({ videoURL }) => {
  if (videoURL.indexOf("https://www.youtube.com/") !== 0) {
    return "bad URL";
  } else if (videoURL.indexOf("https://www.youtube.com/embed/") !== 0) {
    videoURL = videoURL.split("watch?v=");
    videoURL = [videoURL[0], "embed/", videoURL[1]].join("");
  }
  return (
    <div className="PageYoutubeVideoElementViewer">
      <iframe
        title={videoURL}
        src={videoURL}
      />
    </div>
  );
};

export default PageYoutubeVideoElementViewer;
