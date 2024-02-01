import styled from "styled-components";
import ReactPlayer from "react-player";
import React, {useContext, useEffect} from "react";
import {PlayerContext, PlayerContextProps} from "../playerContext/PlayerContext";
import {checkDeletedTime} from "../utils/transcriptionUtils";

const StyledReactPlayer = styled.div`
  flex: 1;
`;

const VideoPlayerBlock: React.FC = () => {
    const {
        videoId,
        playerRef,
        setCurrentTime,
        setDuration,
        deletedTranscriptions
    } = useContext<PlayerContextProps>(PlayerContext)

    const handleOnReady = () => {
        setDuration(playerRef?.current?.getDuration || 0);
    }

    useEffect(() => {
        if (playerRef.current) {
            const interval = setInterval(() => {
                const deletedSegment = checkDeletedTime(playerRef?.current?.getCurrentTime(), deletedTranscriptions)
                if(deletedSegment) {
                    playerRef.current?.seekTo(deletedSegment || 0);
                } else {
                    setCurrentTime(playerRef?.current?.getCurrentTime() || 0);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [playerRef, setCurrentTime, deletedTranscriptions]);

    return (<StyledReactPlayer>
        <ReactPlayer {...{
            ref: playerRef,
            width: "100%",
            playing: true,
            onReady: handleOnReady,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            config: {
                youtube: {
                    playerVars: {
                        showinfo: 0,
                        modestbranding: 0,
                        iv_load_policy: 3
                    }
                }
            },
        }}
        />
    </StyledReactPlayer>)
}
export default VideoPlayerBlock