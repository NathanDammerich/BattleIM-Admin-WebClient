import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  TextFieldProps,
} from "@material-ui/core";

import useStyles from "./styles";
import { getGame } from "../../api";
import { updateGame } from "../../api";
import { IGame, IResultPost, ITeam } from "../../api/types";

const TeamName = ({ game, team }: { game: IGame; team: ITeam }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h4"
      className={
        game.results
          ? game.results.winningTeam === team._id
            ? classes.win
            : classes.loss
          : classes.upcoming
      }
    >
      {team.name}
    </Typography>
  );
};

const EditableValue = ({
  label,
  value,
  onChange,
  disabled,
  type,
}: TextFieldProps) => {
  return (
    <TextField
      style={{ padding: "5px" }}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type={type}
    />
  );
};

export default function GameCard({
  game: initialGame,
  id,
}: {
  game: IGame;
  id: string;
}) {
  const classes = useStyles();
  const [game, setGame] = useState<IGame>(initialGame);
  const { results, homeTeam } = game;
  const [loading, setLoading] = useState(false);
  const [updatedResults, setUpdatedResults] = useState<IResultPost>({
    winningScore: results?.winningScore ?? 0,
    losingScore: results?.losingScore ?? 0,
    winningTeam:
      game.homeTeam._id === results?.winningTeam ? game.homeTeam : game.awayTeam,
    losingTeam:
      game.homeTeam._id !== results?.winningTeam ? game.homeTeam : game.awayTeam,
  });
  const [error, setError] = useState<string | undefined>();
  const homeIsWinner =
    updatedResults && homeTeam._id === updatedResults.winningTeam._id;
  const homeScore = homeIsWinner
    ? updatedResults.winningScore
    : updatedResults.losingScore;
  const awayScore = !homeIsWinner
    ? updatedResults.winningScore
    : updatedResults.losingScore;

  useEffect(() => {
    getGame(id).then((game) => {
      setGame(game.data);
    });
  }, [initialGame, id]);

  const handleUpdateResults =
    (team: "homeTeam" | "awayTeam") => async (value: number) => {
      const otherTeam = team === "homeTeam" ? "awayTeam" : "homeTeam";
      const otherScore = team === "homeTeam" ? awayScore : homeScore;
      if (value > updatedResults.winningScore) {
        setUpdatedResults({
          winningScore: value,
          winningTeam: game[team],
          losingTeam: game[otherTeam],
          losingScore: otherScore,
        });
      } else if (value < updatedResults.losingScore) {
        setUpdatedResults({
          winningScore: otherScore,
          winningTeam: game[otherTeam],
          losingTeam: game[team],
          losingScore: value,
        });
      } else {
        const updatingWinning =
          (team === "homeTeam" && homeIsWinner) ||
          (team === "awayTeam" && !homeIsWinner);
        setUpdatedResults({
          winningScore: updatingWinning ? value : updatedResults.winningScore,
          losingScore: !updatingWinning ? value : updatedResults.losingScore,
          winningTeam: updatedResults.winningTeam,
          losingTeam: updatedResults.losingTeam,
        });
      }
    };

  const handleSubmit = async () => {
    setLoading(true);
    setError(undefined);
    try {
      await updateGame(game._id, { ...game, results: updatedResults });
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleUpdateGame =
    (key: string) =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setGame({ ...game, [key]: e.target.value });
    };

  if (!game) {
    return null;
  }
  return (
    <>
      <Card className={classes.card} raised>
        <Box
          minWidth="400px"
          display="flex"
          justifyContent="space-between"
          margin="20px"
        >
          <TeamName team={game.homeTeam} game={game} />
          <Typography variant="h4">vs</Typography>
          <TeamName team={game.awayTeam} game={game} />
        </Box>
        {error ? <Typography color="error">{error}</Typography> : null}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box display="flex" flexDirection="column" margin="20px">
              <EditableValue
                label="Home Team"
                value={game.homeTeam.name}
                disabled
              />
              <EditableValue
                label="Home Team Score"
                value={homeScore}
                type="number"
                onChange={(e) =>
                  handleUpdateResults("homeTeam")(parseInt(e.target.value, 10))
                }
              />
              <EditableValue
                label="Away Team"
                value={game.homeTeam.name}
                disabled
              />
              <EditableValue
                label="Away Team Score"
                value={awayScore}
                type="number"
                onChange={(e) =>
                  handleUpdateResults("awayTeam")(parseInt(e.target.value, 10))
                }
              />
            </Box>
            <Box display="flex" flexDirection="column" margin="20px">
              <EditableValue label="Date" value={game.day} disabled />
              <EditableValue label="Time" value={game.time} disabled />
              <EditableValue
                label="Location"
                value={game.location}
                onChange={handleUpdateGame("location")}
              />
              <EditableValue label="League" value={game.league} disabled />
            </Box>
          </>
        )}
        <Button onClick={handleSubmit}>Submit</Button>
      </Card>
    </>
  );
}
