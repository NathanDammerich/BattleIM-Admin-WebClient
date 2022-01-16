import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { useSelector } from "react-redux";

export default function Games() {
  const admin = useSelector((state) => state.admin);
  const [date, setDate] = useState(new Date("December 20, 2021"));
  /* const [games, setGames] = useFetchData(
    null,
    admin.org._id,
    "orgGamesOnDate",
    date
  ); */
  const games = [];
  return (
    <Grid container>
      <Grid item xs={12} align="center">
        <Typography variant="h4">{date.toString()}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        {games.map((game) => (
          <Typography variant="body1">{`${game.homeTeam} vs ${game.awayTeam}`}</Typography>
        ))}
      </Grid>
    </Grid>
  );
}
