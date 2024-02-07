import {VideoProps} from "../constants/examples";

export interface Seg {
    utf8: string;
    tOffsetMs?: number;
    acAsrConf?: number;
}

export interface TranscriptionEvent {
    tStartMs: number;
    dDurationMs?: number;
    id?: number;
    wWinId?: number;
    aAppend?: number;
    segs?: Seg[];
}

export interface JSONDataTranscriptions {
    events: TranscriptionEvent[];
}


export const isCurrentTranscription = (currentTranscription: TranscriptionEvent, currentTime: number): Boolean => {
    const cTrans = currentTranscription;
    const cTime = currentTime * 1000;
    return cTime >= cTrans.tStartMs && cTime < cTrans.tStartMs + (cTrans?.dDurationMs ?? 0)
}

const calculateCorrectEventDuration = (segs: Seg[]): number => {
    return segs[segs.length - 1].tOffsetMs || 0;
}

const checkCollisionWithNextSeg = (current: TranscriptionEvent, next: TranscriptionEvent): boolean => {
    return current?.tStartMs + (current?.dDurationMs || 0) > next?.tStartMs;
}

export const preventTranscriptCollisions = (events: TranscriptionEvent[]): TranscriptionEvent[] => {
    let clearEvents: TranscriptionEvent[] = [];
    events.forEach((event: TranscriptionEvent, i) => {
        if ((event.segs && event.segs?.[0].utf8 !== "\n")) {
            if (event.segs.length > 1) {
                event.dDurationMs = calculateCorrectEventDuration(event.segs);
            } else if (checkCollisionWithNextSeg(event, events[i + 1])) {
                event.dDurationMs = events[i + 1].tStartMs - event.tStartMs
            }
            clearEvents.push(event);
        }
    })
    return clearEvents;
}


export const concatenateSegments = (segs: Seg[]): string => {
    return segs.reduce((concatSeg: string, seg: Seg) => {
        return `${concatSeg} ${seg.utf8}`
    }, '');
}

export const getSkippedTranscriptions = (transcriptions: JSONDataTranscriptions, startItem: number, divider: number): string => {
    const skippedTranscriptions = transcriptions.events.slice(startItem, startItem + divider);
    return skippedTranscriptions.reduce((reducedTranscription: string, transcription: TranscriptionEvent) => {
        return `${reducedTranscription} ${concatenateSegments(transcription?.segs || []) ?? ''}`
    }, '')
};

const roundToHundredths = (num: number) => {
    return Math.round(num / 10) * 10;
}

const convertToMs = (time: number): number => Math.round(time * 100) * 10;

export const checkDeletedTime = (currentTime: number = 0, deletedTranscriptions: TranscriptionEvent[], switchTo: number = 0): number | undefined => {
    const time = convertToMs(currentTime);
    const isDeleted = deletedTranscriptions.find((deletedTranscription: TranscriptionEvent) => {
        return time >= (deletedTranscription?.tStartMs ?? 0) && time < roundToHundredths(deletedTranscription.tStartMs + (deletedTranscription.dDurationMs ?? 0))
    })
    if (isDeleted) {
        return checkDeletedTime(((isDeleted.dDurationMs ?? 0) + isDeleted.tStartMs) / 1000,
            deletedTranscriptions,
            roundToHundredths((isDeleted.dDurationMs ?? 0) + isDeleted.tStartMs) / 1000)
    }
    return switchTo
}

export const getDeletedItem = (currentTranscription: TranscriptionEvent, deletedTranscriptions: TranscriptionEvent[]): TranscriptionEvent | undefined => {
    const isDeleted = deletedTranscriptions.find((deletedTranscription: TranscriptionEvent) => {
        return currentTranscription.tStartMs === deletedTranscription.tStartMs && currentTranscription.dDurationMs === deletedTranscription.dDurationMs
    })
    return isDeleted
}

export const transcriptionsConverter = (transcriptData: VideoProps | undefined): VideoProps => {
  return {
      Id: transcriptData?.Id || '',
      name: transcriptData?.name || '',
      transcriptions: {
          ...transcriptData?.transcriptions,
          events: preventTranscriptCollisions(transcriptData?.transcriptions.events || [])
      }
  }
}