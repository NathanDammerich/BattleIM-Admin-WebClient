import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import Navbar from "../../components/Navbar/Navbar";
import Leagues from "../Leagues/Leagues";
import useStyles from "./styles";
import Games from "../Games/Games";

const Home = () => {
  const [page, setPage] = useState(1);
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item xs={1}>
        <Navbar setPage={setPage} page={page} />
      </Grid>
      <Grid item container xs={12} className={classes.paddingTop}>
        <Grid item xs={1} s={2}></Grid>
        <Grid item xs={10} s={8}>
          {page === 1 ? <Games /> : null}
          {page === 2 ? <Leagues/> : null}
        </Grid>
        <Grid item xs={1} s={2}></Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
