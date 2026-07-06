import React from "react";

const VideoCallFrame = ({ roomUrl, title }) => {
  return (
    <iframe
      src={roomUrl}
      title={title}
      allow="camera; microphone; fullscreen; display-capture; autoplay"
      className="w-full h-full border-0"
    />
  );
};

export default VideoCallFrame;
