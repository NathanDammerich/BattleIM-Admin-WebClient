import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import useFetchData from "../../hooks/useFetchData";
import GameCard from "./GameCard/GameCard";

const Upcoming = () => {
  const user = useSelector((state) => state.user);
  console.log(user.teams);
  const [games] = useFetchData(null, user.teams, "upcomingGames");
  useEffect(() => {
    console.log(games);
  }, [games]);

  return (
    <>
      {games && (
        <Grid container>
          {games.map((game) => (
            <Grid key={game._id} item xs={12} align="center">
              <GameCard align="center" gameFromParent={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Upcoming;
