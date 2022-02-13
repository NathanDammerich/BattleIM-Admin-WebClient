import { CircularProgress, TextField, Button, Box } from "@material-ui/core";
import moment from "moment";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact, AgGridColumnProps } from "ag-grid-react";
import { addModal } from "../../actions/modals";

import { getOrg } from "../../api";
import { ILeague, IOrg } from "../../api/types";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useStyles from "./styles";

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
  const [org, setOrg] = useState<IOrg>();
  const [loading, setLoading] = useState(false);
  const [quickFilter, setQuickFilter] = useState("");
  const dispatch = useDispatch();

  const { sports } = org ?? {};
  const sportMap = useMemo(
    () => Object.fromEntries(sports?.map((s) => [s._id, s]) ?? []),
    [sports]
  );
  const leagues = useMemo(
    () => sports?.map((s) => s.leagues as unknown as ILeague[]).flat(),
    [sports]
  );
  const admin = useSelector((state: any) => state.admin);

  useEffect(() => {
    setLoading(true);
    getOrg(admin.org._id).then((response) => {
      setOrg(response.data);
      setLoading(false);
    });
  }, [admin.org._id]);

  const openLeague = (id: string) => {
    const modal = {
      type: "League",
      id,
    };
    dispatch(addModal(modal));
  };

  const makeLeague = () => {
    dispatch(
      addModal({
        type: "MakeLeague",
        id: undefined,
        league: {},
        sports
      })
    );
  };
  const makeSport = () => {
    dispatch(
      addModal({
        type: "MakeSport",
        id: undefined,
        sport: { org: org?._id },
        sportList: Object.values(sportMap),
      })
    );
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
  const classes = useStyles();

  return (
    <>
      {loading ? <CircularProgress /> : null}
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Filter"
          onChange={(e) => setQuickFilter(e.target.value)}
          variant="outlined"
          className={classes.filterInput}
        />
        <Button onClick={makeSport}>Make Sport</Button>
        <Button onClick={makeLeague}>Make League</Button>
      </Box>
      <div className={`ag-theme-material ${classes.tableWrapper}`}>
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
