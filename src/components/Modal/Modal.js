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

const modalTypeToComponent = {
  Game: GameCard,
  Team: TeamCard,
  League: League,
  Quiz: Quiz,
  MakeTeam: MakeTeam,
  User: User,
  LeagueCard: LeagueCard,
};

const modalTypeToParams = {
  Game: (modal) => ({ gameID: modal.id }),
  Team: (modal) => ({
    teamFromParent: null,
    teamID: modal.id,
    startExpanded: true,
  }),
  League: (modal) => ({ leagueID: modal.id }),
  Quiz: (modal) => ({ quizID: modal.id }),
  MakeTeam: (modal) => ({ divisionID: modal.id }),
  User: () => ({}),
  LeagueCard: (modal) => ({ leagueID: modal.id }),
};

export default function Modal() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modals);

  const closeModal = () => {
    dispatch(removeModal());
  };

  const topModal = modal.at(-1);
  const ModalComponent = modalTypeToComponent[topModal?.type];
  const modalParams = modalTypeToParams[topModal?.type];

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
            {ModalComponent && modalParams ? (
              <ModalComponent {...modalParams} />
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
