import moment from "moment";
import { Typography, Box, Paper } from "@material-ui/core";

const GameCard = ({ games, label }) => {
  return (
    <Paper>
      <Box padding="5px">
        <Typography>{label}</Typography>
        {games.map((game) => (
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">
              {moment(game.time).format("h:mm A")}
            </Typography>
            <Typography>{`${game.awayTeam} at ${game.homeTeam}`}</Typography>
            <Typography>{game.league}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default GameCard;
