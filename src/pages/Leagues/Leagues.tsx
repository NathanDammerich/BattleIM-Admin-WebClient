import { CircularProgress, TextField } from "@material-ui/core";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AgGridColumn, AgGridReact, AgGridColumnProps } from "ag-grid-react";
import { addModal } from "../../actions/modals";

import { getOrg } from "../../api";
import { ILeague, ISport } from "../../api/types";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const getSeasonStatus = (league: ILeague) => {
  return moment().isBetween(league.seasonStart, league.seasonEnd)
    ? "in season"
    : moment().isBetween(league.registrationOpen, league.registrationClose)
    ? "in registration"
    : moment().isBetween(league.playoffStart, league.playoffEnd)
    ? "in playoff"
    : "out of season";
};

export default function Leagues() {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [sportMap, setSports] = useState<Record<string, ISport>>({});
  const [loading, setLoading] = useState(false);
  const [quickFilter, setQuickFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getOrg("617f480dfec82da4aec5705c").then((org) => {
      const sports = org.data.sports as ISport[];
      setSports(Object.fromEntries(sports.map((s) => [s._id, s])));
      setLeagues(
        sports
          .map((s) => s.leagues as unknown as ILeague[])
          .flat()
      );
      setLoading(false);
    });
  }, []);

  const openLeague = (id: string) => {
    const modal = {
      type: "League",
      id,
    };
    dispatch(addModal(modal));
  };

  const columns: AgGridColumnProps[] = [
    {
      field: "id",
      headerName: "Season",
      valueGetter: (params) =>
        params.data?.seasonStart
          ? moment(params.data?.seasonStart).format("MMMM YYYY")
          : "na",
      initialPinned: "left",
    },
    {
      field: "description",
      headerName: "Group",
    },
    {
      field: "sport",
      headerName: "Sport",
      valueGetter: (params) =>
        sportMap[params.data.sport as unknown as string]?.description,
    },
    {
      field: "participants",
      headerName: "Participants",
      valueGetter: () => "na",
    },
    {
      field: "status",
      headerName: "Status",
      valueGetter: (params) => {
        return getSeasonStatus(params.data);
      },
    },
  ];

  return (
    <>
      {loading ? <CircularProgress /> : null}
      <TextField
        label="Filter"
        onChange={(e) => setQuickFilter(e.target.value)}
        variant="outlined"
        style={{ margin: "5px" }}
      />
      <div
        className="ag-theme-material"
        style={{ height: "80vh", width: "100%" }}
      >
        <AgGridReact
          rowData={leagues}
          onRowClicked={({ data }) => openLeague(data._id)}
          quickFilterText={quickFilter}
        >
          {columns.map((c) => (
            <AgGridColumn
              sortable={true}
              resizable={true}
              filter={true}
              {...c}
            />
          ))}
        </AgGridReact>
      </div>
    </>
  );
}
