import React from "react";
import {
  Button,
  Card,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import buildSchedule from "../../../utilities/buildSchedule";
import useStyles from "./styles.js";
import { addModal } from "../../../actions/modals";
import { displayTimeslot } from "../../../utilities/displayTimeslot";
import { getLeague } from "../../../api";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function League({ leagueFromParent, leagueID }) {
  const [league, setLeague] = React.useState(leagueFromParent);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getLeague(leagueID).then(({ data }) => setLeague(data));
  }, [leagueID]);

  const handleMakeGames = (divisionID) => {
    const { divisions } = league;
    const division = divisions.find((d) => d._id === divisionID);
    console.log(
      buildSchedule(
        league.seasonStart,
        league.seasonEnd,
        "1/1/2020 12:00",
        "1/1/2020 14:00",
        "Monday",
        20,
        division?.teams.map((t, k) => ({ ...t, _id: `${t._id}${k}` })),
        league,
        "Anywhere"
      )
    );
  };

  const getDateString = (date) => {
    const newDate = new Date(date);
    const monthString = months[newDate.getMonth()];
    return `${monthString} ${newDate.getDate()}`;
  };

  const handleRuleClick = () => {
    window.open(league.sport?.rules, "_blank");
  };

  const makeLeague = () => {
    dispatch(
      addModal({
        type: "MakeLeague",
        id: undefined,
        league,
      })
    );
  };
  const openMakeDivision = (division, id) => {
    dispatch(
      addModal({
        type: "MakeDivision",
        id,
        division,
        league,
      })
    );
  };
  const handleCreateDivision = () => {
    openMakeDivision({
      league: league._id,
    });
  };
  const handleEditDivision = (division) => () => {
    openMakeDivision(division, division._id);
  };

  const classes = useStyles();

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <Grid container className={classes.container}>
            <Box className={`${classes.row}`}>
              <Typography variant="h5" color="primary" align="center">
                {`${league.description} ${league.sport.description}`}
              </Typography>
              <Button onClick={makeLeague}>Edit</Button>
            </Box>

            <Grid item xs={12}>
              <Button onClick={handleRuleClick}>Rules</Button>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                align="left"
              >{`Registration: ${getDateString(
                league.registrationOpen
              )} - ${getDateString(league.registrationClose)}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                align="left"
              >{`Season: ${getDateString(league.seasonStart)} - ${getDateString(
                league.seasonEnd
              )}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                align="left"
              >{`Playoffs: ${getDateString(
                league.playoffStart
              )} - ${getDateString(league.playoffEnd)}`}</Typography>
            </Grid>

            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography
                variant="h6"
                color="secondary"
                className={classes.divisionHeading}
              >
                Divisions
              </Typography>
              <Button onClick={handleCreateDivision}>Make Division</Button>
            </Box>
            {league.divisions.map((division) => (
              <Box className={classes.row} key={division._id}>
                <Box className={classes.row}>
                  <IconButton onClick={handleEditDivision(division)}>
                    <EditIcon />
                  </IconButton>
                  <Typography variant="body1" color="primary" align="left">
                    {displayTimeslot(division.timeSlot)}
                  </Typography>
                </Box>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => handleMakeGames(division._id)}
                >
                  Create Games
                </Button>
              </Box>
            ))}
          </Grid>
        </Card>
      )}
    </>
  );
}
