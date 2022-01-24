import React, { useState, useEffect } from "react";
import { Card, Typography, Box, TextField, Button } from "@material-ui/core";

import useStyles from "./styles";
import { getGame } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { IGame, IResult, ITeam } from "../../api/types";

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
}: {
  label: string;
  value: string | number;
  onChange?: React.ChangeEventHandler;
  disabled?: boolean;
}) => {
  return (
    <TextField
      style={{ padding: "5px" }}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
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

  useEffect(() => {
    fetchGame(id).then((game) => {
      setGame(game.data);
    });
  }, [initialGame, id]);

  const fetchGame = async (id: string) => {
    const game = await getGame(id);
    return game;
  };

  if (!game) {
    return null;
  }
  return (
    <>
      <Card className={classes.card} raised>
        <Box minWidth="400px" display="flex" justifyContent="space-between" margin="20px">
          <TeamName team={game.homeTeam} game={game} />
          <Typography variant="h4">vs</Typography>
          <TeamName team={game.awayTeam} game={game} />
        </Box>
        <Box display="flex" flexDirection="column" margin="20px">
          <EditableValue
            label="Home Team"
            value={game.homeTeam.name}
            disabled
          />
          <EditableValue
            label="Home Team Score"
            value={game.results.homeScore}
          />
          <EditableValue
            label="Away Team"
            value={game.homeTeam.name}
            disabled
          />
          <EditableValue
            label="Away Team Score"
            value={game.results.awayScore}
          />
        </Box>
        <Box display="flex" flexDirection="column" margin="20px">
          <EditableValue label="Date" value={game.day} disabled />
          <EditableValue label="Time" value={game.time} disabled />
          <EditableValue label="Location" value={game.location} disabled />
          <EditableValue label="League" value={game.league} disabled />
        </Box>
        <Button>Submit</Button>
      </Card>
    </>
  );
}
