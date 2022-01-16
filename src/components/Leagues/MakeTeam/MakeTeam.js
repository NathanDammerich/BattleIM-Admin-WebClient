import { Card, Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { createTeam } from "../../../actions/teams";
import { useDispatch, useSelector } from "react-redux";

import useFetchData from "../../../hooks/useFetchData";
import useStyles from "./styles";

export default function MakeTeam({ divisionID }) {
  const [division] = useFetchData(null, divisionID, "division");
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teamName);
    dispatch(createTeam(division, teamName, user));
  };

  const handleChange = (e) => {
    setTeamName(e.target.value);
  };

  return (
    <>
      {division && (
        <Card className={classes.card}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" color="secondary" align="center">
                Create Team
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
              >{`${division.league.sport.description}: ${division.timeSlot}`}</Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <form className={classes.form} action="/" autoComplete="off">
                <div className={classes.inputContainer}>
                  <label className={classes.label}>Team Name</label>
                  <input
                    name="teamName"
                    id="teamName"
                    className={classes.input}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.continueButton}
                  onClick={handleSubmit}
                >
                  Make Team
                </Button>
              </form>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
