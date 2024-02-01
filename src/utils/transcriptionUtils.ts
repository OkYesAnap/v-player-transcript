export interface Seg {
    utf8: string;
}

export interface TranscriptionEvent {
    tStartMs: number;
    dDurationMs: number;
    segs: Seg[];
}

export interface JSONDataTranscriptions {
    events: TranscriptionEvent[];
}

export const getSkippedTranscriptions = (transcriptions: JSONDataTranscriptions, startItem: number, divider: number): string => {
    const skippedTranscriptions = transcriptions.events.slice(startItem, startItem + divider);
    return skippedTranscriptions.reduce((reducedTranscription: string, transcription: TranscriptionEvent) => {
        return `${reducedTranscription} ${transcription.segs[0].utf8}`
    }, '')
};

const roundToHundredths = (num: number) => {
    return Math.round(num / 10) * 10;
}

const convertToMs = (time: number): number => Math.round(time * 100) * 10;

export const checkDeletedTime = (currentTime: number = 0, deletedTranscriptions: TranscriptionEvent[], switchTo: number = 0): number | undefined => {
    const time = convertToMs(currentTime);
    console.log(time, switchTo);
    const isDeleted = deletedTranscriptions.find((deletedTranscription: TranscriptionEvent) => {
        return time >= (deletedTranscription.tStartMs) && time < roundToHundredths(deletedTranscription.tStartMs + deletedTranscription.dDurationMs)
    })
    if (isDeleted) {

        console.log(isDeleted.dDurationMs, isDeleted.tStartMs);
        return checkDeletedTime((isDeleted.dDurationMs + isDeleted.tStartMs) / 1000, deletedTranscriptions, roundToHundredths(isDeleted.dDurationMs + isDeleted.tStartMs) / 1000)
    }
    return switchTo
}

export const getDeletedItem = (currentTranscription: TranscriptionEvent, deletedTranscriptions: TranscriptionEvent[]): TranscriptionEvent | undefined => {
    const isDeleted = deletedTranscriptions.find((deletedTranscription: TranscriptionEvent) => {
        return currentTranscription.tStartMs === deletedTranscription.tStartMs && currentTranscription.dDurationMs === deletedTranscription.dDurationMs
    })
    return isDeleted
}