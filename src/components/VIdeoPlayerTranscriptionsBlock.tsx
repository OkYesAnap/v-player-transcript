import React, {useContext, useEffect, useRef, useState} from "react";
import {DeleteFilled} from '@ant-design/icons';
import {getDeletedItem, TranscriptionEvent} from "../utils/transcriptionUtils";
import styled from "styled-components";
import {PlayerContext, PlayerContextProps} from "../playerContext/PlayerContext";

const isCurrentTranscription = (currentTranscription: TranscriptionEvent, currentTime: number): Boolean => {
    const cTrans = currentTranscription;
    const cTime = currentTime * 1000;
    return cTime >= cTrans.tStartMs && cTime < cTrans.tStartMs + cTrans.dDurationMs
}

const StyledTranscription = styled.div<{ currenttranscription: string }>`
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: ${({currenttranscription}) => currenttranscription === "true" ? "#2d2d2d" : "transparent"};
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: ${({currenttranscription}) => currenttranscription === "true" && "bold"};
  color: white;

  &:hover {
    background-color: #8c8c8c;
    color: #d9d9d9;
  }
`;

const StyledTranscriptionWrapper = styled.div`
  flex: 3;
  height: 360px;
  overflow-y: auto;
`;

const StyledTranscriptionLines = styled.div`
  border-radius: 5px;
  padding: 10px;
  background-color: #4b4b4b;
`;

const StyledTranscriptionTextWithBucket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDeleteFilled = styled(DeleteFilled)`
  font-size: 1.5rem;

  :hover {
    color: red;
  }
`;

const StyledDeleteFilledRed = styled(DeleteFilled)`
  font-size: 1.5rem;
  color: red;

  :hover {
    color: white;
  }
`;

const StyledTextSpan = styled.div`
  padding: 0.5rem;
`;

const VIdeoPlayerTranscriptionsBlock: React.FC = () => {

    const {
        currentTime,
        playerRef,
        transcriptions,
        deletedTranscriptions,
        setDeletedTranscriptions,
        showTrimmedSegments
    } = useContext<PlayerContextProps>(PlayerContext)
    const [indexOfCurrentTranscription, setIndexOfCurrentTranscription] = useState<number>(0)

    const currentTranscriptionRef = useRef<HTMLDivElement>(null);

    const handleTranscriptionClick = (startTime: number) => {
        playerRef?.current?.seekTo(Number(startTime / 1000));
    };

    useEffect(() => {
        if (currentTranscriptionRef.current) {
            const сhild = currentTranscriptionRef.current.children[indexOfCurrentTranscription];
            сhild.scrollIntoView({behavior: 'smooth', block: "nearest"});
        }
    }, [indexOfCurrentTranscription]);

    const onDeleteAddClick = (transcription: TranscriptionEvent) => {
        setDeletedTranscriptions([...deletedTranscriptions, transcription]);
    }

    const onDeleteClearClick = (transcription: TranscriptionEvent) => {
        const index = deletedTranscriptions.findIndex((item) => item === transcription);
        if (index !== -1) {
            const updatedTranscriptions = [...deletedTranscriptions];
            updatedTranscriptions.splice(index, 1);
            setDeletedTranscriptions(updatedTranscriptions);
        }
    }

    return <StyledTranscriptionWrapper>
        <StyledTranscriptionLines  {...{ref: currentTranscriptionRef}}>
            {transcriptions.events.map((transcription: TranscriptionEvent, index) => {
                const currentTranscription = isCurrentTranscription(transcription, currentTime);
                const isDeleted = getDeletedItem(transcription, deletedTranscriptions);
                if (currentTranscription && indexOfCurrentTranscription !== index) setIndexOfCurrentTranscription(index);
                if(showTrimmedSegments || !isDeleted) {
                    return (
                        <StyledTranscription
                            {...{
                                key: `${index}-${transcription.tStartMs}`,
                                currenttranscription: String(currentTranscription)
                            }}
                        >
                            <StyledTranscriptionTextWithBucket>
                                <StyledTextSpan
                                    onClick={() => handleTranscriptionClick(transcription?.tStartMs)}>{transcription?.segs[0]?.utf8}
                                </StyledTextSpan>
                                {isDeleted ?
                                    <StyledDeleteFilledRed onClick={() => onDeleteClearClick(transcription)}/> :
                                    <StyledDeleteFilled onClick={() => onDeleteAddClick(transcription)}/>}
                            </StyledTranscriptionTextWithBucket>
                        </StyledTranscription>
                    )
                }
            })}
        </StyledTranscriptionLines>
    </StyledTranscriptionWrapper>
}

export default VIdeoPlayerTranscriptionsBlock;