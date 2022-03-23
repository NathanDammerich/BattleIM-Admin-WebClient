import { combineReducers } from "redux";

import games from "./games";
import modals from "./modals";
import user from "./user";
import admin from "./admin";

export const reducers = combineReducers({
  games: games,
  modals: modals,
  user: user,
  admin: admin,
});
