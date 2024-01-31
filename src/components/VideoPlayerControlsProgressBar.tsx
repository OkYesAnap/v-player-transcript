import React, {useContext, useState} from 'react';
import {Slider} from "antd";
import {formatDuration} from "../utils/formatDuration";
import {VideoPlayerMarkedTranscriptions} from "./VideoPlayerMarkedTranscriptions";
import {PlayerContext} from "../playerContext/PlayerContext";
import styled from "styled-components";

const customSliderStyle = {
    track: {
        backgroundColor: 'green',
    },
    rail: {
        backgroundColor: 'red',
    },
};

const StyledVideoPlayerControlsProgressBar = styled.div`
  height: 2rem;
`

const VideoPlayerControlsProgressBar: React.FC = () => {
    const {
        transcriptions,
        currentTime,
        duration,
        playerRef,
        marksDensity,
        showMarks
    } = useContext(PlayerContext);

    const [showTip, setShowTip] = useState<boolean>(false);

    const handleSliderClick = (value: number) => {
        playerRef?.current?.seekTo(value);
    };

    return (
        <StyledVideoPlayerControlsProgressBar {...{
            onMouseEnter: () => setShowTip(true),
            onMouseLeave: () => setShowTip(false)
        }}>
            <Slider
                min={0}
                step={0.01}
                max={duration}
                value={currentTime}
                onChange={handleSliderClick}
                tooltip={{open: showTip, formatter: (value) => `${formatDuration(Number(value))} sec`}}
                styles={{track: customSliderStyle.track, rail: customSliderStyle.rail}}
                marks={{...VideoPlayerMarkedTranscriptions(transcriptions, marksDensity, showMarks)}}
            />
        </StyledVideoPlayerControlsProgressBar>)
}
export default VideoPlayerControlsProgressBar;