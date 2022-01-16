//import { UPCOMING, LEAGUES, TEAMS } from "../constants/actionTypes";
const gamesReducer = (games = [], action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return action.payload;
    default:
      return games;
  }
};

export default gamesReducer;
