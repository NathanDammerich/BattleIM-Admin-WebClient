import React, { useState, useEffect } from "react";
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
import { getGame } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { addModal } from "../../../actions/modals";

const TeamName = ({ game, team }) => {
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
          ? game.results.winner === team.team._id
            ? classes.win
            : classes.loss
          : classes.upcoming
      }
      onClick={() => openTeam(team.team._id)}
    >
      {team.team.name}
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
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const isAdmin = !!admin?.org?._id;
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [leftTeam, setLeftTeam] = useState(null);
  const [rightTeam, setRightTeam] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (gameFromParent) {
      setGame(gameFromParent);
    } else {
      fetchGame(gameID).then((game) => {
        setGame(game.data);
      });
    }
  }, [gameFromParent, gameID]);

  useEffect(() => {
    if (game) {
      if (user?.teams?.includes(game.homeTeam._id)) {
        setLeftTeam({ team: game.homeTeam, score: game.results?.homeScore });
        setRightTeam({ team: game.awayTeam, score: game.results?.awayScore });
      } else if (user?.teams?.includes(game.awayTeam._id)) {
        setLeftTeam({ team: game.awayTeam, score: game.results?.awayScore });
        setRightTeam({ team: game.homeTeam, score: game.results?.homeScore });
      } else {
        setLeftTeam({ team: game.homeTeam, score: game.results?.homeScore });
        setRightTeam({ team: game.awayTeam, score: game.results?.awayScore });
      }
    }
  }, [game, user.teams]);

  const fetchGame = async (id) => {
    const game = await getGame(id);
    return game;
  };

  const callOpenLeague = () => {
    const modal = {
      type: "LeagueCard",
      id: game.leagueID,
    };
    dispatch(addModal(modal));
  };
  const callEditScore = () => {
    const modal = {
      type: "EditScore",
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
      {leftTeam && rightTeam && (
        <Card className={classes.card} raised>
          <Grid container>
            <Grid item xs={12} container className={classes.marginTop}>
              <Grid item xs={12} sm={5}>
                <TeamName team={leftTeam} game={game} />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Box display="flex" alignItems="center">
                  {game.results ? (
                    <Typography
                      color="primary"
                      variant="h4"
                    >{`${leftTeam.score} - ${rightTeam.score}`}</Typography>
                  ) : (
                    <Typography color="secondary" variant="h4">
                      vs
                    </Typography>
                  )}
                  {isAdmin && (
                    <IconButton size="small" onClick={callEditScore}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} className={classes.centerThenLeft}>
                <TeamName team={rightTeam} game={game} />
              </Grid>
            </Grid>
            {/* <Grid item xs={12} container>
            <Grid item xs={6}>
              <Typography
                color="primary"
                variant="body1"
                align="left"
              >{`${game.time} ${game.date}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="primary" variant="body1" align="right">
                {game.location}
              </Typography>
            </Grid>
          </Grid> */}

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
      )}
    </>
  );
}
