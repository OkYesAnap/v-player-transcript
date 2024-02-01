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

    const {videoProps, setVideoProps, playerRef, setDuration, setCurrentTime, setDeletedTranscriptions} = useContext(PlayerContext);

    const onExample1Click = (example: VideoProps) => {
        setVideoProps(example);
        playerRef.current?.seekTo(0);
        playerRef.current?.getInternalPlayer().pauseVideo();
        setDuration(0);
        setCurrentTime(0);
        setDeletedTranscriptions([]);
    }

    const {example1, example2, example3} = EXAMPLES

    const isDisabled = ((example:VideoProps):boolean => example.Id === videoProps.Id)

    return (<StyledExampleBar>
        <StyledExampleButton disabled={isDisabled(example1)} onClick={() => onExample1Click(example1)}>Example 1</StyledExampleButton>
        <StyledExampleButton disabled={isDisabled(example2)} onClick={() => onExample1Click(example2)}>Example 2</StyledExampleButton>
        <StyledExampleButton disabled={isDisabled(example3)} onClick={() => onExample1Click(example3)}>Example 3</StyledExampleButton>
    </StyledExampleBar>)
}
export default VideoPlayerExamplesBar;