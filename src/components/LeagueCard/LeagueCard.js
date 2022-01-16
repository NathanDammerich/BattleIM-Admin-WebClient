import { Card, Typography, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

import { addModal } from "../../actions/modals";
import useStyles from "./styles.js";
import useFetchData from "../../hooks/useFetchData";

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

export default function LeagueCard({ leagueFromParent, leagueID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [league] = useFetchData(leagueFromParent, leagueID, "league");

  const callOpenTeam = (teamID) => {
    const modal = {
      type: "Team",
      id: teamID,
    };
    dispatch(addModal(modal));
  };

  const getDateString = (date) => {
    const newDate = new Date(date);
    const monthString = months[newDate.getMonth()];
    return `${monthString} ${newDate.getDate()}`;
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
              <a
                href={league.sport.rules}
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                <Typography variant="body1" color="primary">
                  Rules
                </Typography>
              </a>
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
            <Grid item xs={12} align="center">
              <Typography
                variant="h6"
                color="secondary"
                className={classes.divisionHeading}
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
