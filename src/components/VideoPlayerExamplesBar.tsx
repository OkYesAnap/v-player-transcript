import React, {useContext} from "react";
import {Select} from "antd";
import styled from "styled-components";
import {PlayerContext} from "../playerContext/PlayerContext";
import {EXAMPLES} from "../constants/examples";
import {transcriptionsConverter} from "../utils/transcriptionUtils";
import {valueType} from "antd/es/statistic/utils";

const StyledExampleBar = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`

export const randomStartItem = () => {
    const randomItem = Math.floor(Math.random() * EXAMPLES.length);
    return EXAMPLES[randomItem]
}

const VideoPlayerExamplesBar: React.FC = () => {

    const {
        videoProps,
        setVideoProps,
        playerRef,
        setDuration,
        setCurrentTime,
        setDeletedTranscriptions,
    } = useContext(PlayerContext);

    const onExampleChange = (current: valueType) => {
        const example = EXAMPLES.find(example => example.name === current);
        setVideoProps(transcriptionsConverter(example));
        playerRef.current?.seekTo(0);
        playerRef.current?.getInternalPlayer().pauseVideo();
        setDuration(0);
        setCurrentTime(0);
        setDeletedTranscriptions([]);
    }

    const VideoOptions = () => EXAMPLES.map(example => {
        return {value: example.name, label: example.name};
    })

    return (<StyledExampleBar>
        <Select
            options={VideoOptions()}
            defaultValue={videoProps.name}
            onChange={(value: valueType) => {
                onExampleChange(value)
            }}/>
    </StyledExampleBar>)
}
export default VideoPlayerExamplesBar;