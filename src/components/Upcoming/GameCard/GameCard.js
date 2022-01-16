import React, { useState, useEffect } from "react";
import { Card, Typography, Grid, Container } from "@material-ui/core";

import useStyles from "./styles";
import { getGame } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { addModal } from "../../../actions/modals";

export default function GameCard({ gameFromParent, gameID }) {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [leftTeam, setLeftTeam] = useState(null);
  const [rightTeam, setRightTeam] = useState(null);

  const dispatch = useDispatch();

  const openTeam = (teamID) => {
    const modal = {
      type: "Team",
      id: teamID,
    };
    dispatch(addModal(modal));
  };

  useEffect(() => {
    if (gameFromParent) {
      setGame(gameFromParent);
    } else {
      fetchGame(gameID).then((game) => {
        setGame(game.data);
        console.log(game.data);
      });
    }
  }, [gameFromParent, gameID]);

  useEffect(() => {
    if (game) {
      if (user.teams.includes(game.homeTeam._id)) {
        setLeftTeam({ team: game.homeTeam, score: game.results?.homeScore });
        setRightTeam({ team: game.awayTeam, score: game.results?.awayScore });
      } else if (user.teams.includes(game.awayTeam._id)) {
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
                <Typography
                  variant="h4"
                  className={
                    game.results
                      ? game.results.winner === leftTeam.team._id
                        ? classes.win
                        : classes.loss
                      : classes.upcoming
                  }
                  onClick={() => openTeam(leftTeam.team._id)}
                >
                  {leftTeam.team.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
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
              </Grid>
              <Grid item xs={12} sm={5} className={classes.centerThenLeft}>
                <Typography
                  color="primary"
                  variant="h4"
                  className={
                    game.results
                      ? game.results.winner === rightTeam.team._id
                        ? classes.win
                        : classes.loss
                      : classes.upcoming
                  }
                  onClick={() => openTeam(rightTeam.team._id)}
                >
                  {rightTeam.team.name}
                </Typography>
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
              <Grid item container direction="column" xs={12} sm={6} md={3}>
                <Container>
                  <Typography
                    color="primary"
                    variant="body1"
                    className={classes.bold}
                  >
                    Date
                  </Typography>
                  <Typography color="primary" variant="body1">
                    {game.day}
                  </Typography>
                </Container>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6} md={3}>
                <Container>
                  <Typography
                    color="primary"
                    variant="body1"
                    className={classes.bold}
                  >
                    Time
                  </Typography>
                  <Typography color="primary" variant="body1">
                    {game.time}
                  </Typography>
                </Container>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6} md={3}>
                <Container>
                  <Typography
                    color="primary"
                    variant="body1"
                    className={classes.bold}
                  >
                    Location
                  </Typography>
                  <Typography color="primary" variant="body1">
                    {game.location}
                  </Typography>
                </Container>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={3}
                className={classes.clickable}
                onClick={callOpenLeague}
              >
                <Container>
                  <Typography
                    color="primary"
                    variant="body1"
                    className={classes.bold}
                  >
                    League
                  </Typography>
                  <Typography color="primary" variant="body1">
                    {game.league}
                  </Typography>
                </Container>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
