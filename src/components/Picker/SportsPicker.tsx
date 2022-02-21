import { Select } from "@material-ui/core";
import React from "react";
import { Sport } from "../../api";
import { ISport } from "../../api/types";
import PickerBase from "./PickerBase";

const SportPicker = ({
  sports,
  onChange,
  defaultValue,
  allowNew,
  id = "sports-picker",
  labelId = "sports-picker",
  label = "Pick a sport",
  className,
  style,
}: {
  sports: ISport[];
  defaultValue?: ISport;
  onChange: (sport: ISport | undefined) => void;
  allowNew?: boolean;
  id?: string;
  labelId?: string;
  label?: string;
  className?: string;
  style?: any;
}) => {
  const [sportApi, setSportListApi] = React.useState<ISport[]>();
  const sportList = sportApi ?? sports;
  const sportMap = React.useMemo(() => {
    return Object.fromEntries(sportList.map((s) => [s._id, s]));
  }, [sportList]);

  React.useEffect(() => {
    if (!sportApi) {
      Sport.list()
        .then(({ data }) => setSportListApi(data))
        .catch(() => setSportListApi(sports));
    }
  }, [sportApi, sports]);

  return (
    <PickerBase id={id} label={label}>
      <Select
        id={id}
        labelId={labelId}
        label={label}
        style={style}
        className={className}
        fullWidth
        defaultValue={defaultValue?._id}
        onChange={(e) => onChange(sportMap[e.target.value as string])}
      >
        {allowNew && <option value={undefined}>New Sport</option>}
        {sportList.map((s) => {
          return (
            <option key={s._id} value={s._id}>
              {s.description}
            </option>
          );
        })}
      </Select>
    </PickerBase>
  );
};

export default SportPicker;
