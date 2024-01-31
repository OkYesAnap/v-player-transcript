import {SliderMarks} from "antd/es/slider";
import {Tooltip} from "antd";
import {formatDuration} from "../utils/formatDuration";
import React from "react";
import {JSONDataTranscriptions, TranscriptionEvent} from "../utils/transcriptionUtils";
import {getSkippedTranscriptions} from "../utils/transcriptionUtils";

const TooltipStyle = {color:'white', fontSize: '8px' }

const VideoPlayerMarkedTranscriptions = (transcriptions: JSONDataTranscriptions, density: number, showMarks: boolean): SliderMarks => {
    let marks: SliderMarks | undefined = {}
    let currentTime = 0
    let currentKey = 0
    transcriptions.events.forEach((transcription: TranscriptionEvent, index): void => {
        currentTime = transcription.tStartMs / 1000;
        if (index % density === 0) {
            currentKey = currentTime
            if (marks) {
                marks[currentKey] = {
                    label: showMarks ? (
                        <Tooltip title={`Time: ${formatDuration(currentTime)} ${getSkippedTranscriptions(transcriptions, index, density)}`}>
                          <span>
                            {density > 7 ? formatDuration(currentTime) : '↑'}
                          </span>
                        </Tooltip>
                    ) : null,
                    style: TooltipStyle
                }
            }
        }
    })
    return marks
}

export {VideoPlayerMarkedTranscriptions};