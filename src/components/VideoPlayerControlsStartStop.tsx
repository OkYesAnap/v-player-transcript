import React, {useContext, useEffect} from 'react';
import {PlayCircleFilled, PauseCircleFilled} from '@ant-design/icons';
import {PlayerContext} from "../playerContext/PlayerContext";
import styled from "styled-components";

const StyledStartStopButton = styled.div`
  display: flex;
  align-items: center;
`

const VideoPlayerControlsStartStop:React.FC = () => {

    const {isPlaying, setIsPlaying, playerRef} = useContext(PlayerContext);
    const initialPlayer = playerRef?.current?.getInternalPlayer();
    const playerState = playerRef?.current?.getInternalPlayer().getPlayerState();
    const handlePlay = () => {
        initialPlayer?.playVideo()
    }
    const handlePause = () => {
        initialPlayer?.pauseVideo();
    }

    useEffect(() => {
        if (playerRef.current) {
            if (playerState === 1) {
                setIsPlaying(true);
            } else if (playerState === 2) {
                setIsPlaying(false);
            }
        }
    },[isPlaying, setIsPlaying, playerRef, playerState])

    return (
        <StyledStartStopButton>
            {isPlaying ? <PlayCircleFilled onClick={handlePause}/> : <PauseCircleFilled onClick={handlePlay}/>}
        </StyledStartStopButton>
    );
};

export default VideoPlayerControlsStartStop