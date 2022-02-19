import { Select } from "@material-ui/core";
import { DOW } from "../../api/types";
import PickerBase from "./PickerBase";

const DayArray: DOW[] = [
  DOW.Sunday,
  DOW.Monday,
  DOW.Tuesday,
  DOW.Wednesday,
  DOW.Thursday,
  DOW.Friday,
  DOW.Saturday,
];

const DayPicker = ({
  onChange,
  defaultValue,
  id = "day-picker",
  labelId = "day-picker",
  label = "Pick a day",
  className,
  style,
}: {
  defaultValue?: DOW;
  onChange: (day: DOW | undefined) => void;
  id?: string;
  labelId?: string;
  label?: string;
  className?: string;
  style?: any;
}) => {
  return (
    <PickerBase id={id} label={label}>
      <Select
        id={id}
        labelId={labelId}
        label={label}
        style={style}
        className={className}
        fullWidth
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value as DOW)}
      >
        {DayArray.map((d) => {
          return (
            <option key={d} value={d}>
              {d}
            </option>
          );
        })}
      </Select>
    </PickerBase>
  );
};

export default DayPicker;
