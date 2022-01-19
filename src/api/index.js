import axios from "axios";

const API = axios.create({
  baseURL: "https://battleim-backend.herokuapp.com/",
  //baseURL: "http://localhost:5000",
});

export const getGames = () => API.get("/games");
export const getGamesForOrgOnDate = (id, isoDate) =>
  API.post(`/orgs/${id}/date`, { isoDate: isoDate });
export const getGame = (id) => API.get(`/games/${id}`);
export const updateGame = (id, updatedGame) =>
  API.patch(`/games/${id}`, updatedGame);
export const createGame = (newGame) => API.post("/games", newGame);
export const getUpcomingGames = (teamsArray) => {
  return API.post("/games/upcoming", { teamsArray: teamsArray });
};

export const getTeam = (id) => API.get(`/teams/${id}`);
export const updateTeam = (id, updatedTeam) =>
  API.patch(`/teams/${id}`, updatedTeam);
export const createTeam = (newTeam) => API.post("/teams", newTeam);
export const getTeamsArray = (teamsArray) =>
  API.post("/teams/array", { teamsArray: teamsArray });
export const removePlayer = (teamID, playerID) =>
  API.patch(`/teams/${teamID}/removePlayer`, { playerID: playerID });

export const getUser = (id) => API.get(`/users/${id}`);
export const createUser = (newUser) => API.get("/users", newUser);
export const addPassedQuiz = (userID, quizID) =>
  API.patch(`/users/${userID}/quiz`, quizID);
export const findUsers = (orgID, queryString) =>
  API.post("/users/findUsers", { orgID: orgID, queryString: queryString });

export const getLeague = (id) => API.get(`/leagues/${id}`);
export const updateLeague = (id, updatedLeague) =>
  API.patch(`/leagues/${id}`, updatedLeague);
export const createLeague = (newLeague) => API.post("/leagues", newLeague);

export const getOrg = (id) => API.get(`/orgs/${id}`);
export const updateOrg = (id, updatedOrg) => API.get(`/orgs/${id}`, updatedOrg);
export const createOrg = (newOrg) => API.get("/orgs", newOrg);

export const getSport = (id) => API.get(`/sports/${id}`);
export const updateSport = (id, updatedSport) =>
  API.patch(`/sports/${id}`, updatedSport);
export const createSport = (newSport) => API.post("/sports", newSport);

export const getQuiz = (id) => API.get(`/quizzes/${id}`);
export const createQuiz = (newQuiz) => API.post("/quizzes", newQuiz);

export const getDivision = (id) => API.get(`/divisions/${id}`);

export const getAdmin = (id) => API.get(`/admins/${id}`);
