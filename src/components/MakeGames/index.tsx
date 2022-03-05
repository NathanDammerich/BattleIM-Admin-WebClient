import { useState, useEffect } from "react";
import { Card, Typography, Button, Paper, Box } from "@material-ui/core";
import { AgGridColumn, AgGridReact, AgGridColumnProps } from "ag-grid-react";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { DOW, IDivision, IGame, ILeague, ITimeslot } from "../../api/types";
import buildSchedule from "../../utilities/buildSchedule";
import moment from "moment";
import { RowClickedEvent } from "ag-grid-community";
import { addModal } from "../../actions/modals";
import { createGames, Division, getGame, updateGame } from "../../api";
import { displayTimeslot } from "../../utilities/displayTimeslot";

const GamesCache: Record<string, IGame[]> = {};

export default function MakeGames({
  league,
  division,
  onClose,
}: {
  league: ILeague;
  division: IDivision;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const timeslots: ITimeslot[] = Array.isArray(division.timeSlot)
    ? division.timeSlot
    : [
        {
          timeStart: new Date("1/1/2020 12:00"),
          timeEnd: new Date("1/1/2020 14:00"),
          day: DOW.Monday,
        },
      ];
  const classes = useStyles();
  const [games, setGames] = useState<Record<string, IGame>>({});
  const divisionGameIds = (division.games as unknown as string[]) ?? [];

  const initializeGames = async () => {
    let gamesArrays = GamesCache[division._id];
    if (!gamesArrays?.length && divisionGameIds.length) {
      const gamePromises = divisionGameIds.map(async (game) => {
        if (typeof game === "string") {
          const fetchedGame = (await getGame(game)).data as unknown as IGame;
          return fetchedGame;
        }
        return game;
      });
      gamesArrays = await Promise.all(gamePromises);
    }

    if (!gamesArrays?.length) {
      gamesArrays = buildSchedule(
        league.seasonStart,
        league.seasonEnd,
        timeslots[0].timeStart.toString(),
        timeslots[0].timeEnd.toString(),
        timeslots[0].day,
        20,
        division?.teams,
        league,
        "Anywhere"
      );
    }

    setGames(Object.fromEntries(gamesArrays.map((g) => [g._id, g])));
    GamesCache[division._id] = gamesArrays;
  };

  useEffect(() => {
    initializeGames();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await createGames(
        Object.values(games).filter((g) => !divisionGameIds.includes(g._id))
      );
      await Division.update(division._id, {
        games: [...division.games, ...data],
        teams: [...division.teams],
        timeSlot: timeslots,
      });
    } catch (e) {
      console.warn(e);
    }
    setGames({});
  };
  const updateGameCallback = async (_id: string, game: IGame) => {
    const gamesArePreviouslySaved = divisionGameIds.includes(_id);
    if (gamesArePreviouslySaved) {
      await updateGame(_id, game);
    }
    games[game._id] = game;
    GamesCache[division._id] = Object.values(games);
  };

  const handleGameClick = ({ data }: RowClickedEvent): void => {
    dispatch(
      addModal({
        type: "EditGame",
        game: games[data._id],
        updateGameCallback,
      })
    );
  };

  GamesCache[division._id] = Object.values(games);
  console.log(division);

  const columns: AgGridColumnProps[] = [
    {
      field: "status",
      headerName: "Status",
      valueGetter: ({ data }: { data: IGame }) =>
        divisionGameIds.includes(data._id) ? "Existing Game" : "New",
    },
    {
      field: "homeTeam",
      headerName: "Home Team",
      valueGetter: ({ data }: { data: IGame }) => data.homeTeam.name,
    },
    {
      field: "awayTeam",
      headerName: "Away Team",
      valueGetter: ({ data }: { data: IGame }) => data.awayTeam.name,
    },
    {
      field: "time",
      headerName: "Time",
      valueGetter: ({ data }: { data: IGame }) =>
        moment(data.date).format("hh:mm a"),
    },
    {
      field: "date",
      headerName: "Date",
      valueGetter: ({ data }: { data: IGame }) =>
        moment(data.date).format("MM/DD/YYYY"),
    },
    {
      field: "location",
      headerName: "Location",
      valueGetter: ({ data }: { data: IGame }) => data.location,
    },
    {
      field: "league",
      headerName: "League",
      valueGetter: ({ data }: { data: IGame }) => data.league,
    },
  ];
  return (
    <>
      <Card className={classes.card} raised>
        <div className={classes.titleWrapper}>
          <Typography variant="h6">Create Games</Typography>
        </div>
        <Paper className={classes.paperWrapper}>
          <Box className={classes.infoBox}>
            <Typography variant="caption" color="textSecondary">
              Teams
            </Typography>
            <Typography>
              {division.teams.map((t) => t.name).join(", ")}
            </Typography>
          </Box>
          <Box className={classes.infoBox}>
            <Typography variant="caption" color="textSecondary">
              Timeslot
            </Typography>
            <Typography>{displayTimeslot(timeslots)}</Typography>
          </Box>
        </Paper>
        <div className={`ag-theme-material ${classes.tableWrapper}`}>
          <AgGridReact
            rowData={Object.values(games)}
            onRowClicked={handleGameClick}
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
        <div className={classes.buttonWrapper}>
          <Button onClick={onClose}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
