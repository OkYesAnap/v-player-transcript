import example1 from "../transcriptJsons/example-1.json";
import example2 from "../transcriptJsons/example-2.json";
import example3 from "../transcriptJsons/example-3.json";
import {JSONDataTranscriptions} from "../utils/transcriptionUtils";

export interface VideoProps {
    Id: string;
    transcriptions: JSONDataTranscriptions;
}

export interface Videos {
    [key: string]: VideoProps;
}

export const EXAMPLES:Videos = {
    example1: {
        Id: "5-T6Xqlh6BU&t",
        transcriptions: example1
    },
    example2: {
        Id: "221F55VPp2M",
        transcriptions: example2
    },
    example3: {
        Id: "GfO-3Oir-qM",
        transcriptions: example3
    }
}