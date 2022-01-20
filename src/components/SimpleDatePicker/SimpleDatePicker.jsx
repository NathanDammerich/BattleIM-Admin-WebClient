import { Box, IconButton, TextField } from "@material-ui/core";
import { DatePicker } from "@mui/lab";
import Next from "@mui/icons-material/KeyboardArrowRight";
import Previous from "@mui/icons-material/KeyboardArrowLeft";
import moment from "moment";
import useStyles from "./styles";

const SimpleDatePicker = ({ onChange, value }) => {
  const handleChangeDay = (change) => () => {
    onChange(moment(value).add(change, "day").toDate());
  };

  const classes = useStyles();

  return (
    <Box className={classes.dateWrapper}>
      <IconButton onClick={handleChangeDay(-1)}>
        <Previous />
      </IconButton>
      <Box className={classes.datePicker}>
        <DatePicker
          label="Pick Date"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <IconButton onClick={handleChangeDay(1)}>
        <Next />
      </IconButton>
    </Box>
  );
};

export default SimpleDatePicker;
