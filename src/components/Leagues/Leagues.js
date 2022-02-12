import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SportCard from "../Sports/SportCard/SportCard";
import { getOrg } from "../../api";
import { useSelector } from "react-redux";

export default function Leagues() {
  const [org, setOrg] = useState(null);

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    fetchOrg(admin.org._id).then((org) => {
      setOrg(org.data);
    });
  }, []);

  const fetchOrg = async (id) => {
    const org = await getOrg(id);
    return org;
  };

  return (
    <Grid container spacing={3}>
      {org &&
        org.sports.map((sport) => (
          <Grid item xs={12} sm={6} md={4} key={sport._id}>
            <SportCard sport={sport} />
          </Grid>
        ))}
    </Grid>
  );
}
