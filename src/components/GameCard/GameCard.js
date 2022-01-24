import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Grid,
  Container,
  IconButton,
  Box,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";

import useStyles from "./styles";
import { getGame } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { addModal } from "../../actions/modals";

const TeamName = ({ game, team }) => {
  console.log(team);
  const classes = useStyles();
  const dispatch = useDispatch();

  const openTeam = (teamID) => {
    const modal = {
      type: "Team",
      id: teamID,
    };
    dispatch(addModal(modal));
  };
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
      onClick={() => openTeam(team._id)}
    >
      {team.name}
    </Typography>
  );
};

const TableRow = ({ label, value, onClick }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      direction="column"
      xs={12}
      sm={6}
      md={3}
      className={onClick && classes.clickable}
      onClick={onClick}
    >
      <Container>
        <Typography color="primary" variant="body1" className={classes.bold}>
          {label}
        </Typography>
        <Typography color="primary" variant="body1">
          {value}
        </Typography>
      </Container>
    </Grid>
  );
};

export default function GameCard({ gameFromParent, gameID }) {
  const admin = useSelector((state) => state.admin);
  const isAdmin = !!admin?.org?._id;
  const classes = useStyles();
  const [game, setGame] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (gameFromParent) {
      setGame(gameFromParent);
    } else {
      getGame(gameID).then((game) => {
        setGame(game.data);
      });
    }
  }, [gameFromParent, gameID]);

  const homeIsWinner = game?.results && game?.homeTeam?._id === game?.results?.winningTeam
  const getScore = () => {
    if (!game?.results) {
      return 'vs';
    }
    if (homeIsWinner) {
      return `${game?.results.winningScore} - ${game?.results.losingScore}`
    }
    return `${game?.results.losingScore} - ${game?.results.winningScore}`
  };

  const callOpenLeague = () => {
    const modal = {
      type: "LeagueCard",
      id: game.leagueID,
    };
    dispatch(addModal(modal));
  };
  const callEditGame = () => {
    const modal = {
      type: "EditGame",
      id: game._id,
      game,
    };
    dispatch(addModal(modal));
  };

  if (!game) {
    return null;
  }
  return (
    <>
      <Card className={classes.card} raised>
        <Grid container>
          <Grid item xs={12} container className={classes.marginTop}>
            <Grid item xs={12} sm={5}>
              <TeamName team={game.homeTeam} game={game} />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box display="flex" alignItems="center">
                <Typography color="primary" variant="h4">
                  {getScore()}
                </Typography>
                {isAdmin && (
                  <IconButton size="small" onClick={callEditGame}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.centerThenLeft}>
              <TeamName team={game.awayTeam} game={game} />
            </Grid>
          </Grid>

          <Grid item xs={12} container className={classes.marginBottom}>
            <TableRow label="Date" value={game.day} />
            <TableRow label="Time" value={game.time} />
            <TableRow label="Location" value={game.location} />
            <TableRow
              label="League"
              value={game.league}
              onClick={callOpenLeague}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
