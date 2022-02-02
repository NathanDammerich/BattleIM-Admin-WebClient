import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addModal } from "../../actions/modals";

import { getOrg } from "../../api";
import { ILeague, ISport } from "../../api/types";

export default function Leagues() {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [sportMap, setSports] = useState<Record<string, ISport>>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getOrg("617f480dfec82da4aec5705c").then((org) => {
      const sports = org.data.sports as ISport[];
      setSports(Object.fromEntries(sports.map((s) => [s._id, s])));
      setLeagues(sports.map((s) => s.leagues as unknown as ILeague[]).flat());
      setLoading(false);
    });
  }, []);

  const openLeague = (id: string) => () => {
    const modal = {
      type: "League",
      id,
    };
    dispatch(addModal(modal));
  };

  return (
    <>
      {loading ? <CircularProgress /> : null}
      <Table>
        <TableHead>
          <TableCell>Season</TableCell>
          <TableCell>Group</TableCell>
          <TableCell>Sport</TableCell>
          <TableCell>Participants</TableCell>
          <TableCell>Status</TableCell>
        </TableHead>
        <TableBody>
          {leagues.map((league) => {
            return (
              <TableRow key={league._id} onClick={openLeague(league._id)}>
                <TableCell>
                  {league.seasonStart
                    ? moment(league.seasonStart).format("MMMM YYYY")
                    : "na"}
                </TableCell>
                <TableCell>{league.description}</TableCell>
                <TableCell>
                  {sportMap[league.sport as unknown as string]?.description}
                </TableCell>
                <TableCell>{"na"}</TableCell>
                <TableCell>{"na"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
