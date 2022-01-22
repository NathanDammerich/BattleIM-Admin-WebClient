import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { updateResults } from "../../api";
import { IGame } from "../../api/types";

export default function LeagueCard({ game }: { game: IGame }) {
  const { results, homeTeam, awayTeam, _id } = game;
  const [homeScore, setHomeScore] = useState(results.homeScore);
  const [awayScore, setAwayScore] = useState(results.awayScore);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newResults = { ...results, homeScore, awayScore };
    if (awayScore > homeScore) {
      newResults.winner = awayTeam._id;
      newResults.loser = homeTeam._id;
    } else {
      newResults.winner = homeTeam._id;
      newResults.loser = awayTeam._id;
    }
    setLoading(true);
    await updateResults(_id, newResults);
    setLoading(false);
  };

  return (
    <>
      <Card raised>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography>{`Home: ${homeTeam.name}`}</Typography>
            <TextField
              defaultValue={results.homeScore}
              onChange={(e) => setHomeScore(parseInt(e.target.value, 10))}
            />
            <Typography>{`Away: ${awayTeam.name}`}</Typography>
            <TextField
              defaultValue={results.awayScore}
              onChange={(e) => setAwayScore(parseInt(e.target.value, 10))}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </>
        )}
      </Card>
    </>
  );
}
