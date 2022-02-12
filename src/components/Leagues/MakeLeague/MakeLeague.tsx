import { TextField, Button, Card, TextFieldProps } from "@material-ui/core";
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

  const editorProps = React.useCallback(
    ({
      field,
      type,
      label,
      disabled,
    }: {
      field: keyof ILeague;
      label: string;
      type?: string;
      disabled?: boolean;
    }): TextFieldProps => ({
      label,
      type,
      disabled,
      onChange: handleUpdate(field),
      defaultValue: league[field],
      InputLabelProps: { shrink: true },
      className: classes.field,
    }),
    [league]
  );

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <TextField
            {...editorProps({
              label: "League Description",
              field: "description",
            })}
          />
          <TextField
            {...editorProps({
              label: "Registration Start",
              field: "registrationOpen",
              type: 'datetime-local',
            })}
          />
          <TextField
            {...editorProps({
              label: "Registration End",
              field: "registrationClose",
              type: 'datetime-local',
            })}
          />
          <TextField
            {...editorProps({
              label: "Season Start",
              field: "seasonStart",
              type: 'datetime-local',
            })}
          />
          <TextField
            {...editorProps({
              label: "Season End",
              field: "seasonEnd",
              type: 'datetime-local',
            })}
          />
          <TextField
            {...editorProps({
              label: "Playoffs Start",
              field: "playoffStart",
              type: 'datetime-local',
            })}
          />
          <TextField
            {...editorProps({
              label: "Playoffs End",
              field: "playoffEnd",
              type: 'datetime-local',
            })}
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
