import React, {useContext} from "react";
import {Button} from "antd";
import styled from "styled-components";
import {PlayerContext} from "../playerContext/PlayerContext";
import {EXAMPLES, VideoProps} from "../constants/examples";
import {preventTranscriptCollisions} from "../utils/transcriptionUtils";

const StyledExampleBar = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`
const StyledExampleButton = styled(Button)`
  margin: 0 0.3rem;
`

const VideoPlayerExamplesBar: React.FC = () => {

    const {
        videoProps,
        setVideoProps,
        playerRef,
        setDuration,
        setCurrentTime,
        setDeletedTranscriptions
    } = useContext(PlayerContext);

    const onExample1Click = (example: VideoProps) => {
        setVideoProps({
            Id: example.Id,
            transcriptions: {
                ...example.transcriptions,
                events: preventTranscriptCollisions(example.transcriptions.events)
            }
        });
        playerRef.current?.seekTo(0);
        playerRef.current?.getInternalPlayer().pauseVideo();
        setDuration(0);
        setCurrentTime(0);
        setDeletedTranscriptions([]);
    }

    const {example1, example2, example3, example4} = EXAMPLES

    const isDisabled = ((example: VideoProps): boolean => example.Id === videoProps.Id)

    return (<StyledExampleBar>
        <StyledExampleButton disabled={isDisabled(example1)} onClick={() => onExample1Click(example1)}>Vid
            1</StyledExampleButton>
        <StyledExampleButton disabled={isDisabled(example2)} onClick={() => onExample1Click(example2)}>Vid
            2</StyledExampleButton>
        <StyledExampleButton disabled={isDisabled(example3)} onClick={() => onExample1Click(example3)}>Vid
            3</StyledExampleButton>
        <StyledExampleButton disabled={isDisabled(example4)} onClick={() => onExample1Click(example4)}>Vid
            4</StyledExampleButton>
    </StyledExampleBar>)
}
export default VideoPlayerExamplesBar;