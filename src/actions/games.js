import * as api from "../api/index.js";

export const getGames = () => async (dispatch) => {
  try {
    const { data } = await api.getGames();

    dispatch({ type: "FETCH_GAMES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getGame = (id) => async (dispatch) => {
  console.log("getGame called");
  try {
    console.log("getGame");
    const { data } = await api.getGame(id);
    console.log(data);
    console.log("game from getGame");
    return data;
  } catch (error) {
    console.log("getGame error");
    console.log(error);
  }
};
