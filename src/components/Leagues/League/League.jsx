import { Button, Card, Typography, Grid, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useFetchData, { APITypes } from "../../../hooks/useFetchData";
import useStyles from "./styles.js";
import { addModal } from "../../../actions/modals";
import { displayTimeslot } from "../../../utilities/displayTimeslot";

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
  const [league] = useFetchData(leagueFromParent, leagueID, APITypes.league);
  const dispatch = useDispatch();

  const handleMakeGames = (divisionID) => {
    const { divisions } = league;
    const division = divisions.find((d) => d._id === divisionID);
    dispatch(
      addModal({
        type: "MakeGames",
        division,
        league,
      })
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
  const handleCreateDivision = () => {
    dispatch(
      addModal({
        type: "MakeDivision",
        id: undefined,
        division: {
          league: league._id,
        },
        league,
      })
    );
  };

  const classes = useStyles();

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" align="center">
                {`${league.description} ${league.sport.description}`}
              </Typography>
            </Grid>

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
              <Grid
                item
                xs={12}
                key={division._id}
                container
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Typography variant="body1" color="primary" align="left">
                    {displayTimeslot(division.timeSlot)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleMakeGames(division._id)}
                  >
                    Create Games
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button onClick={makeLeague}>Edit</Button>
          </Grid>
        </Card>
      )}
    </>
  );
}
