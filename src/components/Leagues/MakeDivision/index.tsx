import {
  TextField,
  Button,
  Card,
  TextFieldProps,
  Box,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Division } from "../../../api";
import { DOW, IDivision, ILeague, ITimeslot } from "../../../api/types";
import DayPicker from "../../Picker/DayPicker";
import useStyles from "./styles.js";

export interface IMakeDivision {
  league: ILeague;
  division: IDivision;
  id: string;
  onClose: () => void;
}

const defaultDate = "1/1/2020";

export default function MakeDivision(props: IMakeDivision) {
  const [division, setDivision] = React.useState<IDivision>(props.division);
  const timeSlotsArray = Array.isArray(division.timeSlot)
    ? division.timeSlot
    : [];

  const handleUpdate =
    (indexKey: keyof IDivision) =>
    (event: { target: { value: IDivision[typeof indexKey] } }) => {
      console.log(indexKey, event);
      setDivision({ ...division, [indexKey]: event.target.value });
    };

  const handleTimeSlotChange =
    (indexTimeslot: number, indexKey: keyof ITimeslot) =>
    (value: ITimeslot[typeof indexKey]) => {
      const newTimeSlots = [...timeSlotsArray];
      newTimeSlots[indexTimeslot] = {
        ...newTimeSlots[indexTimeslot],
        [indexKey]: value,
      };
      setDivision({ ...division, timeSlot: newTimeSlots });
    };

  const handleSubmit = async () => {
    try {
      if (division._id) {
        await Division.update(division._id, division);
      } else {
        await Division.create(division);
      }
      props.onClose();
    } catch (e) {
      console.warn(e);
    }
  };
  const classes = useStyles();

  const editorProps = React.useCallback(
    ({
      field,
      type,
      label,
      disabled,
    }: {
      field: keyof IDivision;
      label: string;
      type?: string;
      disabled?: boolean;
    }): TextFieldProps => ({
      label,
      type,
      disabled,
      onChange: handleUpdate(field),
      defaultValue: division[field],
      InputLabelProps: { shrink: true },
      className: classes.field,
    }),
    [division, classes.field]
  );

  return (
    <>
      {division && (
        <Card raised className={classes.card}>
          <TextField
            {...editorProps({
              label: "Max Teams",
              field: "maxTeams",
              type: "number",
            })}
          />
          <TextField
            {...editorProps({
              label: "Status",
              field: "status",
            })}
          />
          <Box width="100%">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              marginTop="10px"
            >
              <Typography>Timeslots</Typography>
              <IconButton
                onClick={() =>
                  handleUpdate("timeSlot")({
                    target: {
                      value: [
                        ...timeSlotsArray,
                        {
                          day: DOW.Monday,
                          timeStart: new Date(defaultDate),
                          timeEnd: new Date(defaultDate),
                        },
                      ],
                    },
                  })
                }
              >
                +
              </IconButton>
            </Box>
            {timeSlotsArray.map((t, k) => (
              <Paper key={k} className={classes.timeSlotPaper}>
                <Box className={classes.timeSlotBox}>
                  <DayPicker
                    defaultValue={timeSlotsArray[k].day ?? DOW.Monday}
                    onChange={(value = DOW.Monday) =>
                      handleTimeSlotChange(k, "day")(value)
                    }
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    defaultValue={moment(timeSlotsArray[k].timeStart).format(
                      "hh:mm"
                    )}
                    label="Start"
                    onChange={(e) =>
                      handleTimeSlotChange(
                        k,
                        "timeStart"
                      )(moment(`${defaultDate} ${e.target.value}`).toDate())
                    }
                    type="time"
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    defaultValue={moment(timeSlotsArray[k].timeEnd).format(
                      "hh:mm"
                    )}
                    label="End"
                    onChange={(e) =>
                      handleTimeSlotChange(
                        k,
                        "timeEnd"
                      )(moment(`${defaultDate} ${e.target.value}`).toDate())
                    }
                    type="time"
                  />
                </Box>
              </Paper>
            ))}
          </Box>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      )}
    </>
  );
}
