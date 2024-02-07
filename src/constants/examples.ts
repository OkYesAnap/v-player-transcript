import example1 from "../transcriptJsons/example-1.json";
import example2 from "../transcriptJsons/example-2.json";
import example3 from "../transcriptJsons/example-3.json";
import example4 from "../transcriptJsons/example-4.json";
import {JSONDataTranscriptions} from "../utils/transcriptionUtils";

export interface VideoProps {
    Id: string;
    transcriptions: JSONDataTranscriptions;
    name: string;
}

export const EXAMPLES: VideoProps[] = [
    {
        name: "example1",
        Id: "5-T6Xqlh6BU&t",
        transcriptions: example1
    },
    {
        name: "example2",
        Id: "221F55VPp2M",
        transcriptions: example2
    },
    {
        name: "example3",
        Id: "GfO-3Oir-qM",
        transcriptions: example3
    },
    {
        name: "example4",
        Id: "ww_H3UDfxxQ",
        transcriptions: example4
    }
]