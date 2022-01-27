import { Card, Typography, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { addModal } from "../../actions/modals";
import useStyles from "./styles.js";
import useFetchData, { APITypes } from "../../hooks/useFetchData";
import { ILeague } from "../../api/types";
import { Button } from "@material-ui/core";

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

export default function LeagueCard({
  leagueFromParent,
  leagueID,
}: {
  leagueFromParent: ILeague;
  leagueID: string;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [league] = useFetchData(
    leagueFromParent,
    leagueID,
    APITypes.league
  ) as unknown as [value: ILeague];

  const callOpenTeam = (id: string) => {
    const modal = {
      type: "Team",
      id,
    };
    dispatch(addModal(modal));
  };

  const getDateString = (date: string) => {
    const newDate = new Date(date);
    const monthString = months[newDate.getMonth()];
    return `${monthString} ${newDate.getDate()}`;
  };

  const onRulesClick = () => {
    console.log("window click");
  };

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
              <Button onClick={onRulesClick}>Rules</Button>
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
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="secondary"
              >
                Standings
              </Typography>
            </Grid>
            {league.teams.map((team) => (
              <Grid item container xs={12} key={team._id}>
                <Grid item xs={6} key={team._id}>
                  <Typography
                    variant="body1"
                    align="left"
                    className={classes.clickable}
                    onClick={() => callOpenTeam(team._id)}
                  >
                    {team.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    align="right"
                  >{`${team.wins}-${team.losses}`}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </>
  );
}
