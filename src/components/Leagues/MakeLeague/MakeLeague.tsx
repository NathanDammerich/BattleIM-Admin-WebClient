import {
  TextField,
  Button,
  Card,
  TextFieldProps,
  Select,
} from "@material-ui/core";
import React from "react";
import { createLeague, updateLeague } from "../../../api";
import { ILeague, ISport } from "../../../api/types";
import PickerBase from "../../Picker/PickerBase";
import SportPicker from "../../Picker/SportsPicker";
import useStyles from "./styles.js";

export interface IMakeLeague {
  league: ILeague;
  sports: ISport[];
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

  const handleSubmit = async () => {
    if (league._id) {
      await updateLeague(league._id, league);
    } else {
      await createLeague(league);
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

  const defaultSport = league.sport?._id
    ? league.sport
    : props.sports.find((s) => s._id === (league.sport as unknown as string));

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <SportPicker
            labelId="make-league-sport-picker"
            id="make-league-sport-picker"
            label="Select Sport"
            defaultValue={defaultSport}
            onChange={(s) =>
              handleUpdate("sport")({ target: { value: s ?? league.sport } })
            }
            sports={props.sports ?? []}
          />
          <PickerBase id="make-league-league-type" label="Select League Type">
            <Select
              fullWidth
              labelId="make-league-league-type"
              onChange={(e) =>
                handleUpdate("description")({
                  target: { value: e.target.value as string },
                })
              }
            >
              <option value="Coed">Coed</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
            </Select>
          </PickerBase>
          <TextField
            {...editorProps({
              label: "Registration Start",
              field: "registrationOpen",
              type: "datetime-local",
            })}
          />
          <TextField
            {...editorProps({
              label: "Registration End",
              field: "registrationClose",
              type: "datetime-local",
            })}
          />
          <TextField
            {...editorProps({
              label: "Season Start",
              field: "seasonStart",
              type: "datetime-local",
            })}
          />
          <TextField
            {...editorProps({
              label: "Season End",
              field: "seasonEnd",
              type: "datetime-local",
            })}
          />
          <TextField
            {...editorProps({
              label: "Playoffs Start",
              field: "playoffStart",
              type: "datetime-local",
            })}
          />
          <TextField
            {...editorProps({
              label: "Playoffs End",
              field: "playoffEnd",
              type: "datetime-local",
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
