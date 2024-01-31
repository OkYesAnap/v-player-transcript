import React, {useContext} from 'react';
import {Checkbox, InputNumber, Space} from 'antd';
import {PlayerContext} from "../playerContext/PlayerContext";
import styled from "styled-components";
import {CheckboxChangeEvent} from "antd/lib/checkbox";

type ValueType = number | undefined;

const StyledInputNumber = styled(InputNumber)<{ value: ValueType }>`
  width: 100%;
  max-width: 55px;
  display: flex;
  align-items: center;
`;

const CustomCheckbox = styled(Checkbox)`
  color: white;
  display: flex;
  align-items: center;
`;

const VideoPlayerControlsDensityOfMarks: React.FC = () => {
    const {
        marksDensity,
        setMarksDensity,
        showMarks,
        setShowMarks,
        showTrimmedSegments,
        setShowTrimmedSegments
    } = useContext(PlayerContext);

    const onChangeNumber = (value: ValueType) => {
        if (value !== undefined) {
            setMarksDensity(value);
        }
    };

    const onShowMarks = (e: CheckboxChangeEvent) => {
        setShowMarks(e.target.checked);
    };

    const onShowTrimmedSegments = (e: CheckboxChangeEvent) => {
        setShowTrimmedSegments(e.target.checked);
    }

    return (
        <Space>
            <StyledInputNumber
                min={1}
                max={20}
                step={1}
                value={marksDensity}
                disabled={!showMarks}
                onChange={onChangeNumber as (value: string | number | null | undefined) => void}
            />
            <CustomCheckbox
                onChange={onShowMarks}
                checked={showMarks}
            >
                Show Marks
            </CustomCheckbox>
            <CustomCheckbox
                onChange={onShowTrimmedSegments}
                checked={showTrimmedSegments}
            >
                Show Trimmed Segments
            </CustomCheckbox>
        </Space>)
};
export default VideoPlayerControlsDensityOfMarks