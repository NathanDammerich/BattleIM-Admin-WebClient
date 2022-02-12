import {
  TextField,
  Button,
  Card,
  TextFieldProps,
  Select,
} from "@material-ui/core";
import React from "react";
import { ISport } from "../../../api/types";
import { Sport } from "../../../api";
import useStyles from "./styles";
import { useCallback } from "react";

interface IMakeSport {
  sport: ISport;
  sportList?: ISport[];
  id: string;
  onClose: () => void;
}

export default function MakeSport(props: IMakeSport) {
  const [sport, setSport] = React.useState<ISport>(props.sport);
  const [sportList, setSportList] = React.useState<ISport[]>(
    props.sportList ?? []
  );

  const handleUpdate =
    (indexKey: keyof ISport) =>
    (event: { target: { value: ISport[typeof indexKey] } }) => {
      setSport((prevSport) => ({
        ...prevSport,
        [indexKey]: event.target.value,
      }));
    };

  React.useEffect(() => {
    Sport.list()
      .then(({ data }) => setSportList(data))
      .catch(() => setSportList(sportList));
  }, []);

  const handleSubmit = async () => {
    if (!sport._id) {
      await Sport.create(sport);
    } else {
      await Sport.update(sport._id, sport);
    }
    props.onClose();
  };
  const classes = useStyles();

  const handleExistingSportSelect = (id: unknown): void => {
    setSport(sportList.find((s) => s._id === id) ?? sport);
  };

  const editorProps = useCallback(
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
      defaultValue: sport[field],
      InputLabelProps: { shrink: true },
      className: classes.field,
    }),
    [sport]
  );

  return (
    <>
      {sport && (
        <Card raised className={classes.card}>
          <Select
            fullWidth
            label={"Select existing sport"}
            value={sport._id}
            onChange={(e) => handleExistingSportSelect(e.target.value)}
          >
            <option value={undefined}>New Sport</option>
            {sportList.map((s) => {
              return (
                <option key={s._id} value={s._id}>
                  {s.description}
                </option>
              );
            })}
          </Select>
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
