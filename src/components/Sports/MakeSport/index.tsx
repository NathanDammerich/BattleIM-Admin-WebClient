import { TextField, Button, Card, TextFieldProps, FormControl, InputLabel } from "@material-ui/core";
import React from "react";
import { ISport } from "../../../api/types";
import { Sport } from "../../../api";
import useStyles from "./styles";
import SportPicker from "../SportPicker";

interface IMakeSport {
  sport: ISport;
  sportList?: ISport[];
  id: string;
  onClose: () => void;
}

export default function MakeSport(props: IMakeSport) {
  const [sport, setSport] = React.useState<ISport>(props.sport);

  const handleUpdate =
    (indexKey: keyof ISport) =>
    (event: { target: { value: ISport[typeof indexKey] } }) => {
      setSport((prevSport) => ({
        ...prevSport,
        [indexKey]: event.target.value,
      }));
    };

  const handleSubmit = async () => {
    if (!sport._id) {
      await Sport.create(sport);
    } else {
      await Sport.update(sport._id, sport);
    }
    props.onClose();
  };
  const classes = useStyles();

  const editorProps = React.useCallback(
    ({
      field,
      type,
      label,
      disabled,
    }: {
      field: keyof ISport;
      label: string;
      type?: string;
      disabled?: boolean;
    }): TextFieldProps => ({
      label,
      type,
      disabled,
      onChange: handleUpdate(field),
      value: sport[field],
      InputLabelProps: { shrink: true },
      className: classes.field,
    }),
    [sport]
  );

  return (
    <>
      {sport && (
        <Card raised className={classes.card}>
          <FormControl fullWidth>
            <InputLabel id="make-league-sport-picker">Select Sport</InputLabel>
            <SportPicker
              id="make-league-sport-picker"
              labelId="make-league-sport-picker"
              label="Select Sport"
              defaultValue={sport}
              onChange={(s) => setSport(s ?? sport)}
              sports={props.sportList ?? []}
              allowNew={true}
            />
          </FormControl>
          <TextField
            {...editorProps({ field: "description", label: "Sport Name" })}
          />
          <TextField
            {...editorProps({ field: "rules", label: "Rules Link" })}
          />
          <TextField
            {...editorProps({ field: "image", label: "Image Link" })}
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
