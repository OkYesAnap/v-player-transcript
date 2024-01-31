import dayjs from "dayjs";

const formatDuration = (ms: number) => {
    const formattedDuration = dayjs(ms * 1000).format('mm:ss:SSS');
    return formattedDuration.slice(0, -1);
}

export {formatDuration}