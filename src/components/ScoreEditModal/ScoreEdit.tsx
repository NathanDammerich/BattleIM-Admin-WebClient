import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useState } from "react";
import { updateResults } from "../../api";
import { IGame } from "../../api/types";
import useStyles from "./styles";

export default function ScoreEditCard({
  game,
  onClose,
}: {
  game: IGame;
  onClose: () => void;
}) {
  const classes = useStyles();
  const { results, homeTeam, awayTeam, _id } = game;
  const homeIsWinner = results && homeTeam._id === results.winningTeam;
  const [homeScore, setHomeScore] = useState(
    homeIsWinner ? results?.winningScore : results?.losingScore
  );
  const [awayScore, setAwayScore] = useState(
    !homeIsWinner ? results?.winningScore : results?.losingScore
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | any>();

  const handleSubmit = async () => {
    let newResults = {} as any; // TODO change to IResults
    if (awayScore > homeScore) {
      newResults = {
        winningScore: awayScore,
        losingScore: homeScore,
        winningTeam: awayTeam,
        losingTeam: homeTeam,
      };
    } else {
      newResults = {
        winningScore: homeScore,
        losingScore: awayScore,
        winningTeam: homeTeam,
        losingTeam: awayTeam,
      };
    }
    setLoading(true);
    setError(undefined);
    try {
      await updateResults(_id, newResults);
    } catch (e: any) {
      setError(e.message);
    }
    onClose();
    setLoading(false);
  };

  return (
    <>
      <Card raised className={classes.cardWrapper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            padding="10px"
          >
            {error && <Typography color="error">{error}</Typography>}
            <Typography
              className={classes.teamName}
            >{`Home: ${homeTeam.name}`}</Typography>
            <TextField
              defaultValue={
                homeIsWinner ? results.winningScore : results.losingScore
              }
              onChange={(e) => setHomeScore(parseInt(e.target.value, 10))}
            />
            <Typography
              className={classes.teamName}
            >{`Away: ${awayTeam.name}`}</Typography>
            <TextField
              defaultValue={
                !homeIsWinner ? results.winningScore : results.losingScore
              }
              onChange={(e) => setAwayScore(parseInt(e.target.value, 10))}
            />
            <Button
              color="primary"
              onClick={handleSubmit}
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
}
