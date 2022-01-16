import * as api from "../api/index.js";
import { replaceModal } from "./modals.js";

export const getTeam = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTeam(id);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTeam = (division, teamName, user) => async (dispatch) => {
  console.log(user);
  const newTeam = {
    division: division._id,
    league: division.league._id,
    sport: division.league.sport._id,
    name: teamName,
    games: [],
    players: [user._id],
    org: user.orgs[0],
    wins: 0,
    losses: 0,
    leagueName: `${division.league.description} ${division.league.sport.description}`,
    captain: user._id,
  };
  try {
    const { data } = await api.createTeam(newTeam);

    dispatch({ type: "ADD_TEAM_USER", payload: data._id });
    const modal = {
      id: data._id,
      type: "Team",
    };
    dispatch(replaceModal(modal));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removePlayer = (teamID, playerID) => async (dispatch) => {
  try {
    const { data } = await api.removePlayer(teamID, playerID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
