import VideoPlayerBlock from "./VideoPlayerBlock";
import VideoPlayerTranscriptionsBlock from "./VideoPlayerTranscriptionsBlock";
import React from "react";
import styled from "styled-components";

const StyledVideoPlayerAndTranscriptionsWrapper = styled.div`
  width: 100%;
  display: flex
`;

const VideoPlayerAndTranscriptionsWrapper = () => {
    return (
        <StyledVideoPlayerAndTranscriptionsWrapper>
            <VideoPlayerBlock/>
            <VideoPlayerTranscriptionsBlock/>
        </StyledVideoPlayerAndTranscriptionsWrapper>)
}

export default VideoPlayerAndTranscriptionsWrapper;