import { TextField, Button, Card } from "@material-ui/core";
import React from "react";
import { ILeague } from "../../../api/types";
import useStyles from "./styles.js";

interface IMakeLeague {
  league: ILeague;
  id: string;
  onClose: () => void;
}

export default function MakeLeague(props: IMakeLeague) {
  const [league, setLeague] = React.useState<ILeague>(props.league);

  const handleUpdate =
    (indexKey: keyof ILeague) =>
    (event: { target: { value: ILeague[typeof indexKey] } }) => {
      setLeague({ ...league, [indexKey]: event.target.value });
    };

  const handleSubmit = () => {
    console.log(league);
  };
  const classes = useStyles();

  const FieldEditor = ({
    field,
    type,
    label,
  }: {
    field: keyof ILeague;
    label: string;
    type?: string;
  }) => (
    <TextField
      label={label}
      type={type}
      onChange={handleUpdate(field)}
      value={league[field]}
      InputLabelProps={{ shrink: true }}
    />
  );

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <FieldEditor label={"League Description"} field="description" />
          <FieldEditor
            label="Registration Start"
            type="datetime-local"
            field={"registrationOpen"}
          />
          <FieldEditor
            label="Registration End"
            type="datetime-local"
            field={"registrationClose"}
          />
          <FieldEditor
            label="Season Start"
            type="datetime-local"
            field="seasonStart"
          />
          <FieldEditor
            label="Season End"
            type="datetime-local"
            field="seasonEnd"
          />
          <FieldEditor
            label="Playoffs Start"
            type="datetime-local"
            field="playoffStart"
          />
          <FieldEditor
            label="Playoffs End"
            type="datetime-local"
            field="playoffEnd"
          />
          <Button onClick={props.onClose}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      )}
    </>
  );
}
