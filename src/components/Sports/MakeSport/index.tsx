import { TextField, Button, Card } from "@material-ui/core";
import React from "react";
import { ISport } from "../../../api/types";
import { createSport, updateSport } from "../../../api";
import useStyles from "./styles.js";

interface IMakeSport {
  sport: ISport;
  id: string;
  onClose: () => void;
}

export default function MakeSport(props: IMakeSport) {
  const [sport, setSport] = React.useState<ISport>(props.sport);

  const handleUpdate =
    (indexKey: keyof ISport) =>
    (event: { target: { value: ISport[typeof indexKey] } }) => {
      setSport({ ...sport, [indexKey]: event.target.value });
    };

  const handleSubmit = async () => {
      if (!sport._id) {
          await createSport(sport);
      } else {
          await updateSport(sport._id, sport);
      }
      props.onClose();
  };
  const classes = useStyles();

  const FieldEditor = ({
    field,
    type,
    label,
    disabled,
  }: {
    field: keyof ISport;
    label: string;
    type?: string;
    disabled?: boolean;
  }) => (
    <TextField
      label={label}
      type={type}
      onChange={handleUpdate(field)}
      value={sport[field]}
      InputLabelProps={{ shrink: true }}
      disabled={disabled}
    />
  );

  return (
    <>
      {sport && (
        <Card raised className={classes.card}>
          <FieldEditor label={"Sport Name"} field="description" />
          <FieldEditor label={"Rules Link"} field="rules" />
          <FieldEditor label={"Image Link"} field="image" />
          <Button onClick={props.onClose}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      )}
    </>
  );
}
