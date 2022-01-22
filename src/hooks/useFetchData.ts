import { useState, useEffect } from "react";
import {
  getLeague,
  getGame,
  getTeam,
  getQuiz,
  getDivision,
  // getUpcomingGames,
  // getTeamsArray,
  getGamesForOrgOnDate,
  getAdmin,
} from "../api";

enum APITypes {
  "league" = "league",
  "admin" = "admin",
  "orgGamesOnDate" = "orgGamesOnDate",
  "game" = "game",
  "team" = "team",
  "quiz" = "quiz",
  "division" = "division",
  // "teams" = "teams",
  // "upcomingGames" = "upcomingGames",
}

const APITypesToFnMap: Record<
  APITypes,
  (key: string, body?: any) => Promise<any>
> = {
  [APITypes.league]: getLeague,
  [APITypes.admin]: getAdmin,
  [APITypes.orgGamesOnDate]: getGamesForOrgOnDate,
  [APITypes.game]: getGame,
  [APITypes.team]: getTeam,
  [APITypes.quiz]: getQuiz,
  [APITypes.division]: getDivision,
  // [APITypes.teams]: getTeamsArray,
  // [APITypes.upcomingGames]: getUpcomingGames,
};

const getKey = (dataId: string, identifier: APITypes) =>
  `${dataId}_${identifier}`;
const simplePreviousCallCache: Record<string, Promise<any>> = {};

export default function useFetchData(
  dataFromParent: any,
  dataID: string,
  identifier: APITypes,
  body?: any
) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataFromParent) {
      return dataFromParent;
    }

    if (body || !simplePreviousCallCache[getKey(dataID, identifier)]) {
      const response = APITypesToFnMap[identifier]?.(dataID, body);
      if (!body) {
        simplePreviousCallCache[getKey(dataID, identifier)] = response;
      }
      response.then((res) => setData(res.data));
    } else {
      simplePreviousCallCache[getKey(dataID, identifier)].then((res) =>
        setData(res.data)
      );
    }
  }, [dataFromParent, dataID, identifier, body]);

  return [data, setData];
}
