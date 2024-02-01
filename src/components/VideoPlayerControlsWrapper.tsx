import React, {useContext} from "react";
import {formatDuration} from "../utils/formatDuration";
import VideoPlayerControlsProgressBar from "./VideoPlayerControlsProgressBar";
import {PlayerContext} from "../playerContext/PlayerContext";
import VideoPlayerControlsStartStop from "./VideoPlayerControlsStartStop";
import VideoPlayerControlsDensityOfMarks from "./VideoPlayerControlsDensityOfMarks";
import styled from "styled-components";
import VideoPlayerExamplesBar from "./VideoPlayerExamplesBar";

const StyledDuration = styled.div`
  font-size: 0.8em;
  width: 8%;
  margin: 0 1rem 0 0.2rem;
`;

const StyledControlsBar = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00005e;
  padding: 1rem;
`;

const VideoPlayerControlsWrapper: React.FC = () => {
    const {currentTime} = useContext(PlayerContext);
    return (
        <>
            <StyledControlsBar>
                <VideoPlayerExamplesBar/>
                <VideoPlayerControlsStartStop/>
                <StyledDuration>{formatDuration(Number(currentTime))}</StyledDuration>
                <VideoPlayerControlsDensityOfMarks/>
            </StyledControlsBar>
            <VideoPlayerControlsProgressBar/>
        </>
    )
}

export default VideoPlayerControlsWrapper