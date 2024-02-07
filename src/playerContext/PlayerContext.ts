import React, {createContext} from "react";
import ReactPlayer from "react-player";
import {JSONDataTranscriptions, TranscriptionEvent} from "../utils/transcriptionUtils";
import {EXAMPLES, VideoProps} from "../constants/examples";

export interface PlayerContextProps {
    videoProps: VideoProps;
    setVideoProps: React.Dispatch<React.SetStateAction<VideoProps>>;
    videoId: string;
    transcriptions: JSONDataTranscriptions;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    marksDensity: number;
    setMarksDensity: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    showMarks: boolean;
    setShowMarks: React.Dispatch<React.SetStateAction<boolean>>;
    playerRef: React.MutableRefObject<ReactPlayer | null>;
    deletedTranscriptions: TranscriptionEvent[];
    setDeletedTranscriptions: React.Dispatch<React.SetStateAction<TranscriptionEvent[]>>;
    showTrimmedSegments: boolean;
    setShowTrimmedSegments: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DefaultPlayerContext: PlayerContextProps = {
    videoProps: {...EXAMPLES[1]},
    setVideoProps: () => {},
    videoId: '',
    transcriptions: {events: []},
    currentTime: 0,
    setCurrentTime: () => {
    },
    duration: 0,
    setDuration: () => {
    },
    marksDensity: 20,
    setMarksDensity: () => {
    },
    playerRef: {current: null},
    isPlaying: false,
    setIsPlaying: () => {
    },
    showMarks: false,
    setShowMarks: () => {
    },
    deletedTranscriptions: [],
    setDeletedTranscriptions: () => {
    },
    showTrimmedSegments: true,
    setShowTrimmedSegments: () => {
    }
}

export const PlayerContext = createContext<PlayerContextProps>(DefaultPlayerContext);
