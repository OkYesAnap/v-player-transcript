import VideoPlayerBlock from "./VideoPlayerBlock";
import VIdeoPlayerTranscriptionsBlock from "./VIdeoPlayerTranscriptionsBlock";
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
            <VIdeoPlayerTranscriptionsBlock/>
        </StyledVideoPlayerAndTranscriptionsWrapper>)
}

export default VideoPlayerAndTranscriptionsWrapper;