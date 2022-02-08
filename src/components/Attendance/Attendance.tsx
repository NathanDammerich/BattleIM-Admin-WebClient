import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { getTeam, updateGame } from "../../api";
import { IGame, IPlayer, ITeam } from "../../api/types";

const Attendance = ({
  game: initialGame,
  team: initialTeam,
  onClose,
}: {
  game: IGame;
  team: ITeam;
  onClose: () => void;
}) => {
  const [game, setGame] = useState(initialGame);
  const [team, setTeam] = useState(initialTeam);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const attendanceType =
    game.homeTeam._id === team._id ? "homeAttendance" : "awayAttendance";
  useEffect(() => {
    getTeam(initialTeam._id).then((v) => setTeam(v.data));
  }, [initialTeam]);

  const handleUpdateAttendance = (player: IPlayer) => () => {
    if ((game[attendanceType] || []).includes(player._id)) {
      setGame((previousGame) => ({
        ...previousGame,
        attendance: (previousGame[attendanceType] || []).filter(
          (v) => v !== player._id
        ),
      }));
    } else {
      setGame((previousGame) => ({
        ...previousGame,
        [attendanceType]: [...(previousGame[attendanceType] || []), player._id],
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(undefined);
    try {
      await updateGame(game._id, game);
      onClose();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Card raised>
        <Typography variant="h2">Roster</Typography>
        <Box display="flex" flexDirection="column">
          {error ? <Typography color="error">{error}</Typography> : null}
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {team.players.map((player) => {
                return (
                  <Box
                    width="300px"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>{player.name}</Typography>
                    <Checkbox
                      checked={game[attendanceType]?.includes(player._id)}
                      onClick={handleUpdateAttendance(player)}
                    />
                  </Box>
                );
              })}
            </>
          )}
        </Box>
        <Button onClick={handleSubmit}>Submit</Button>
      </Card>
    </>
  );
};

export default Attendance;
