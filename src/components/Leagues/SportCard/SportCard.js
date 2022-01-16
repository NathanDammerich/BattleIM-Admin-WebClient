import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import useClasses from "./styles.js";
import { addModal } from "../../../actions/modals.js";

export default function SportCard({ sport }) {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const openLeague = (leagueID) => {
    const modal = {
      type: "League",
      id: leagueID,
    };
    dispatch(addModal(modal));
  };

  const classes = useClasses();

  return (
    <>
      <Card onClick={toggleDropdown} className={classes.card}>
        <CardHeader
          className={classes.header}
          title={sport.description}
          align="center"
        />
        <CardMedia
          component="img"
          height="194"
          image={sport.image}
          alt={sport.description}
        />
        {expanded &&
          sport.leagues.map((league) => (
            <Grid item xs={12} align="left" key={league._id}>
              <Typography
                className={classes.leagueList}
                variant="subtitle1"
                onClick={() => openLeague(league._id)}
              >
                {league.description}
              </Typography>
            </Grid>
          ))}
      </Card>
    </>
  );
}
