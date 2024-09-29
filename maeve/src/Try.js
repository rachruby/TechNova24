// src/VideoStream.js
import React from 'react';

const VideoStream = () => {
    return (
        <div>
            <h1>Live Video Stream</h1>
            <img
                src="http://localhost:5001/video_feed"
                alt="Streaming video"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    );
};

export default VideoStream;
