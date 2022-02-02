import { CircularProgress, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SportCard from "../../components/Leagues/SportCard/SportCard";
import { getOrg } from "../../api";

export default function Leagues() {
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrg("617f480dfec82da4aec5705c").then((org) => {
      setOrg(org.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? <CircularProgress /> : null}
      <Grid container spacing={3}>
        {org &&
          org.sports.map((sport) => (
            <Grid item xs={12} sm={6} md={4} key={sport._id}>
              <SportCard sport={sport} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
