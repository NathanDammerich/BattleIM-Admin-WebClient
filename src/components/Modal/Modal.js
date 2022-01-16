import React from "react";
import ReactDom from "react-dom";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./styles";
import GameCard from "../Upcoming/GameCard/GameCard";
import TeamCard from "../Teams/TeamCard/TeamCard";
import League from "../Leagues/League/League";
import Quiz from "../Quiz/Quiz";
import { removeModal } from "../../actions/modals";
import MakeTeam from "../Leagues/MakeTeam/MakeTeam";
import User from "../User/User";
import LeagueCard from "../LeagueCard/LeagueCard";

export default function Modal() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modals);

  const closeModal = () => {
    dispatch(removeModal());
  };

  return ReactDom.createPortal(
    <>
      {modal.length > 0 && (
        <Grid className={classes.overlay} onClick={closeModal} container>
          <Grid
            item
            xs={12}
            className={classes.child}
            onClick={(e) => e.stopPropagation()}
            align="center"
          >
            {modal[modal.length - 1].type === "Game" ? (
              <GameCard gameID={modal[modal.length - 1].id} />
            ) : modal[modal.length - 1].type === "Team" ? (
              <TeamCard
                teamFromParent={null}
                teamID={modal[modal.length - 1].id}
                startExpanded={true}
              />
            ) : modal[modal.length - 1].type === "League" ? (
              <League leagueID={modal[modal.length - 1].id} />
            ) : modal[modal.length - 1].type === "Quiz" ? (
              <Quiz quizID={modal[modal.length - 1].id} />
            ) : modal[modal.length - 1].type === "MakeTeam" ? (
              <MakeTeam divisionID={modal[modal.length - 1].id} />
            ) : modal[modal.length - 1].type === "User" ? (
              <User />
            ) : modal[modal.length - 1].type === "LeagueCard" ? (
              <LeagueCard leagueID={modal[modal.length - 1].id} />
            ) : (
              <h1>unrecognized modal type</h1>
            )}
          </Grid>
        </Grid>
      )}
    </>,
    document.getElementById("portal")
  );
}
