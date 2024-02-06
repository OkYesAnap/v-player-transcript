import React, {useRef, useState} from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import {PlayerContext} from './playerContext/PlayerContext';
import VideoPlayerAndTranscriptionsWrapper from "./components/VideoPlayerAndTranscriptionsWrapper";
import VideoPlayerControlsWrapper from "./components/VideoPlayerControlsWrapper";
import styled from "styled-components";
import {preventTranscriptCollisions, TranscriptionEvent} from "./utils/transcriptionUtils";
import {EXAMPLES} from "./constants/examples";

const StyledMain = styled.div`
  width: 80%;
`

function App() {
    const [videoProps, setVideoProps] = useState(EXAMPLES.example1);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [marksDensity, setMarksDensity] = useState<number>(20);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showMarks, setShowMarks] = useState<boolean>(false);
    const [showTrimmedSegments, setShowTrimmedSegments] = useState<boolean>(true);
    const [deletedTranscriptions, setDeletedTranscriptions] = useState<TranscriptionEvent[]>([])
    const playerRef = useRef<ReactPlayer>(null);

    return (
        <PlayerContext.Provider {...{
            value: {
                videoProps, setVideoProps,
                videoId: videoProps.Id,
                transcriptions: videoProps.transcriptions,
                currentTime, setCurrentTime,
                duration, setDuration,
                marksDensity, setMarksDensity,
                isPlaying, setIsPlaying,
                showMarks, setShowMarks,
                showTrimmedSegments, setShowTrimmedSegments,
                deletedTranscriptions, setDeletedTranscriptions,
                playerRef
            }
        }}>
            <div className="App">
                <StyledMain>
                    <VideoPlayerAndTranscriptionsWrapper/>
                    <VideoPlayerControlsWrapper/>
                </StyledMain>
            </div>
        </PlayerContext.Provider>
    );
}

export default App;
