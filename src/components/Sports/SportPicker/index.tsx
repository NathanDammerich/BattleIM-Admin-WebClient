import { Select } from "@material-ui/core";
import React from "react";
import { ISport } from "../../../api/types";
import { Sport } from "../../../api";

const SportPicker = ({
  sports,
  onChange,
  defaultValue,
  allowNew,
  id,
  labelId,
  label,
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
  const [sportList, setSportList] = React.useState<ISport[]>(sports ?? []);
  const sportMap = React.useMemo(() => {
    return Object.fromEntries(sportList.map((s) => [s._id, s]));
  }, [sportList]);

  React.useEffect(() => {
    Sport.list()
      .then(({ data }) => setSportList(data))
      .catch(() => setSportList(sportList));
  }, []);

  return (
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
  );
};

export default SportPicker;
