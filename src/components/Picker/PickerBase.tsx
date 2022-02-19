import { FormControl, InputLabel } from "@material-ui/core";
import React from "react";

const PickerBase = ({
  children,
  label,
  id,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      {children}
    </FormControl>
  );
};

export default PickerBase;
