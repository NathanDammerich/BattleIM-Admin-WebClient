import React from "react";

import { useDispatch, useSelector } from "react-redux";

import useFetchData from "../../../hooks/useFetchData.js";
import { Button, Card, Typography, Grid } from "@material-ui/core";
import { addModal } from "../../../actions/modals.js";
import useStyles from "./styles.js";

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
  const [league] = useFetchData(leagueFromParent, leagueID, "league");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const attemptMakeTeam = (divisionID) => {
    if (!league.sport.quiz) {
      return makeTeam(divisionID);
    }
    if (user.quizzesPassed.includes(league.sport.quiz)) {
      console.log("Quiz already passed");
      return makeTeam(divisionID);
    } else {
      console.log("Quiz not passed");
      return goToQuiz(league.sport.quiz);
    }
  };

  const goToQuiz = (quizID) => {
    const modal = {
      type: "Quiz",
      id: quizID,
    };
    dispatch(addModal(modal));
  };

  const makeTeam = (divisionID) => {
    const modal = {
      type: "MakeTeam",
      id: divisionID,
    };
    dispatch(addModal(modal));
  };

  const getDateString = (date) => {
    const newDate = new Date(date);
    const monthString = months[newDate.getMonth()];
    return `${monthString} ${newDate.getDate()}`;
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
                Divisions
              </Typography>
            </Grid>
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
                    {division.timeSlot}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {division.teams.length === division.maxTeams ? (
                    <Typography variant="body1" color="secondary">
                      FULL
                    </Typography>
                  ) : (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => attemptMakeTeam(division._id)}
                    >
                      Create Team
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </>
  );
}
