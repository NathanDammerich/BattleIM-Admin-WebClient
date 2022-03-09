import React from "react";
import ReactDom from "react-dom";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./styles";
import GameCard from "../GameCard/GameCard";
import League from "../Leagues/League/League";
import MakeLeague from "../Leagues/MakeLeague/MakeLeague";
import MakeDivision from "../Leagues/MakeDivision";
import Quiz from "../Quiz/Quiz";
import { removeModal } from "../../actions/modals";
import MakeSport from "../Sports/MakeSport";
import User from "../User/User";
import EditScore from "../ScoreEditModal/ScoreEdit";
import Attendance from "../Attendance/Attendance";
import EditGame from "../GameCard/EditGameCard";
import MakeGames from '../MakeGames';

const modalTypeToComponent = {
  Game: GameCard,
  EditGame,
  MakeGames,
  League,
  MakeDivision,
  MakeLeague,
  MakeSport,
  Quiz,
  User,
  EditScore,
  Attendance,
};

const modalTypeToParams = {
  Game: (modal) => ({ gameID: modal.id }),
  MakeGames: (modal) => modal,
  EditGame: (modal) => modal,
  League: (modal) => ({ leagueID: modal.id }),
  MakeDivision: (modal) => modal,
  MakeLeague: (modal) => modal,
  MakeSport: (modal) => modal,
  Quiz: (modal) => ({ quizID: modal.id }),
  User: () => ({}),
  EditScore: (modal) => modal,
  Attendance: (modal) => modal,
};

export default function Modal() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const modals = useSelector((state) => state.modals);

  const closeModal = () => {
    dispatch(removeModal());
  };

  const topModal = modals[modals.length - 1];
  const ModalComponent = modalTypeToComponent[topModal?.type];
  const modalParams = modalTypeToParams[topModal?.type]?.(topModal);

  return ReactDom.createPortal(
    <>
      {modals.length > 0 && (
        <Grid className={classes.overlay} onClick={closeModal} container>
          <Grid
            item
            xs={12}
            className={classes.child}
            onClick={(e) => e.stopPropagation()}
            align="center"
          >
            {ModalComponent && modalParams ? (
              <ModalComponent {...modalParams} onClose={closeModal} />
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
