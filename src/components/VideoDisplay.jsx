import React from 'react';

const VideoDisplay = ({ videoRef, canvasRef, isStarted, onPlay }) => {
  return (
    <div className="video-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ display: isStarted ? 'block' : 'none' }}
        onPlay={onPlay}
      />
      <canvas
        ref={canvasRef}
        style={{ display: isStarted ? 'block' : 'none' }}
      />
    </div>
  );
};

export default VideoDisplay;