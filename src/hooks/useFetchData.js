import { useState, useEffect } from "react";
import {
  getLeague,
  getGame,
  getTeam,
  getQuiz,
  getDivision,
  getUpcomingGames,
  getTeamsArray,
  getGamesForOrgOnDate,
  getAdmin,
} from "../api";

export default function useFetchData(
  dataFromParent,
  dataID,
  identifier,
  body = null
) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (dataID) => {
      let data = null;
      if (identifier === "league") {
        data = await getLeague(dataID);
      } else if (identifier === "admin") {
        data = await getAdmin(dataID);
      } else if (identifier === "orgGamesOnDate") {
        data = await getGamesForOrgOnDate(dataID, body);
      } else if (identifier === "game") {
        data = await getGame(dataID);
      } else if (identifier === "team") {
        data = await getTeam(dataID);
      } else if (identifier === "quiz") {
        data = await getQuiz(dataID);
      } else if (identifier === "division") {
        data = await getDivision(dataID);
      } else if (identifier === "teams") {
        data = await getTeamsArray(dataID);
      } else if (identifier === "upcomingGames") {
        data = await getUpcomingGames(dataID);
      }
      return data;
    };

    if (dataFromParent) {
      setData(dataFromParent);
    } else {
      fetchData(dataID).then((res) => setData(res.data));
    }
  }, [dataFromParent, dataID, identifier, body]);

  return [data, setData];
}
