import {
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useFetchData from "../../../hooks/useFetchData";
import useStyles from "./styles.js";
import GamesList from "./GamesList/GamesList";
import RosterList from "./RosterList/RosterList";
import { addModal } from "../../../actions/modals";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TeamCard({ teamFromParent, teamID, startExpanded }) {
  const [expanded, setExpanded] = useState(startExpanded);
  const [team] = useFetchData(teamFromParent, teamID, "team");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (team) {
      setWins(0);
      setLosses(0);
      for (let game of team.games) {
        if (game.results) {
          if (teamID) {
            if (teamID === game.results.winner) {
              setWins((wins) => wins + 1);
            } else {
              setLosses((losses) => losses + 1);
            }
          } else {
            if (teamFromParent._id === game.results.winner) {
              setWins((wins) => wins + 1);
            } else {
              setLosses((losses) => losses + 1);
            }
          }
        }
      }
    }
  }, [team, teamID, teamFromParent?._id]);

  const [nextGame, setNextGame] = useState(null);

  useEffect(() => {
    if (team) {
      const now = new Date();
      let foundUpcoming = false;
      for (let game of team.games) {
        const gameDate = new Date(game.date);
        if (gameDate > now) {
          console.log("found upcoming");
          if (!foundUpcoming) {
            setNextGame(game);
            foundUpcoming = true;
          }
        }
      }
      console.log(nextGame);
    }
  }, [team, nextGame]);

  const goToLeague = () => {
    console.log(team.league);
    const modal = {
      type: "LeagueCard",
      id: team.league,
    };
    dispatch(addModal(modal));
  };

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  if (!team) {
    return null;
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        title={team.leagueName}
        className={classes.header}
        onClick={goToLeague}
      />
      <Typography variant="subtitle1" className={classes.secondary}>
        {team.org.description}
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={team.sport.image}
        alt="basketball"
        className={classes.img}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" className={classes.name}>
          {`${team.name} (${wins}-${losses})`}
        </Typography>
        {!expanded ? (
          <>
            {team.games.length > 0 ? (
              <>
                {nextGame && (
                  <>
                    <Typography variant="subtitle1" align="left">
                      Next Game: {nextGame.time} {nextGame.day}
                    </Typography>
                    <Typography variant="subtitle1" align="left">
                      Location: {nextGame.location}
                    </Typography>{" "}
                  </>
                )}
              </>
            ) : (
              <> </>
            )}
          </>
        ) : (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <GamesList games={team.games} teamID={team._id} />
            <RosterList team={team} />
          </Collapse>
        )}
      </CardContent>
      {!startExpanded && (
        <ExpandMore
          expand={expanded}
          onClick={toggleDropdown}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      )}
    </Card>
  );
}
