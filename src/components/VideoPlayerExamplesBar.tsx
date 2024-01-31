import React, {useContext} from "react";
import {Button} from "antd";
import styled from "styled-components";
import {PlayerContext} from "../playerContext/PlayerContext";
import {EXAMPLES, VideoProps} from "../constants/examples";

const StyledExampleBar = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`
const StyledExampleButton = styled(Button)`
  margin: 0 0.3rem;
`

const VideoPlayerExamplesBar: React.FC = () => {

    const {setVideoProps, playerRef, setDuration, setCurrentTime, setDeletedTranscriptions} = useContext(PlayerContext);

    const onExample1Click = (example: VideoProps) => {
        setVideoProps(example);
        playerRef.current?.seekTo(0);
        playerRef.current?.getInternalPlayer().pauseVideo();
        setDuration(0);
        setCurrentTime(0);
        setDeletedTranscriptions([]);
    }

    return (<StyledExampleBar>
        <StyledExampleButton onClick={() => onExample1Click(EXAMPLES.example1)}>Example 1</StyledExampleButton>
        <StyledExampleButton onClick={() => onExample1Click(EXAMPLES.example2)}>Example 2</StyledExampleButton>
        <StyledExampleButton onClick={() => onExample1Click(EXAMPLES.example3)}>Example 3</StyledExampleButton>
    </StyledExampleBar>)
}
export default VideoPlayerExamplesBar;