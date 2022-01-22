import axios from "axios";
import {
  IGame,
  IResult,
  ITeam,
  IUser,
  ILeague,
  IOrg,
  ISport,
  IQuiz,
} from "./types";

const API = axios.create({
  baseURL: "https://battleim-backend.herokuapp.com/",
  //baseURL: "http://localhost:5000",
});

export const getGames = () => API.get("/games");
export const getGamesForOrgOnDate = (id: string, isoDate: string) =>
  API.post(`/orgs/${id}/date`, { isoDate: isoDate });
export const getGame = (id: string) => API.get(`/games/${id}`);
export const updateGame = (id: string, updatedGame: string) =>
  API.patch(`/games/${id}`, updatedGame);
export const createGame = (newGame: IGame) => API.post("/games", newGame);
export const updateResults = (id: string, result: IResult) =>
  API.post(`/games/${id}/results`, result);

export const getTeam = (id: string) => API.get(`/teams/${id}`);
export const updateTeam = (id: string, updatedTeam: ITeam) =>
  API.patch(`/teams/${id}`, updatedTeam);
export const createTeam = (newTeam: ITeam) => API.post("/teams", newTeam);
export const removePlayer = (teamID: string, playerID: string) =>
  API.patch(`/teams/${teamID}/removePlayer`, { playerID: playerID });

export const getUser = (id: string) => API.get(`/users/${id}`);
export const createUser = (newUser: IUser) => API.post("/users", newUser);
export const addPassedQuiz = (userID: string, quizID: string) =>
  API.patch(`/users/${userID}/quiz`, quizID);
export const findUsers = (orgID: string, queryString: string) =>
  API.post("/users/findUsers", { orgID: orgID, queryString: queryString });

export const getLeague = (id: string) => API.get(`/leagues/${id}`);
export const updateLeague = (id: string, updatedLeague: ILeague) =>
  API.patch(`/leagues/${id}`, updatedLeague);
export const createLeague = (newLeague: string) =>
  API.post("/leagues", newLeague);

export const getOrg = (id: string) => API.get(`/orgs/${id}`);
export const updateOrg = (id: string, updatedOrg: IOrg) =>
  API.patch(`/orgs/${id}`, updatedOrg);
export const createOrg = (newOrg: IOrg) => API.post("/orgs", newOrg);

export const getSport = (id: string) => API.get(`/sports/${id}`);
export const updateSport = (id: string, updatedSport: ISport) =>
  API.patch(`/sports/${id}`, updatedSport);
export const createSport = (newSport: ISport) => API.post("/sports", newSport);

export const getQuiz = (id: string) => API.get(`/quizzes/${id}`);
export const createQuiz = (newQuiz: IQuiz) => API.post("/quizzes", newQuiz);

export const getDivision = (id: string) => API.get(`/divisions/${id}`);

export const getAdmin = (id: string) => API.get(`/admins/${id}`);
