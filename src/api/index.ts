import axios from "axios";
import {
  IGame,
  IResultPost,
  ITeam,
  IUser,
  ILeague,
  IOrg,
  ISport,
  IQuiz,
  IGamePost,
  IDivision,
} from "./types";

export const API = axios.create({
  //baseURL: "https://battleim-backend.herokuapp.com/",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

interface APIType<Item> {
  get: (id: string) => Promise<{ data: Item }>;
  create: (newValue: Item) => Promise<{ data: Item }>;
  update: (id: string, updateValue: Item) => Promise<{ data: Item }>;
  list: () => Promise<{ data: Item[] }>;
}

export const getGames = () => API.get("/games");
export const getGamesForOrgOnDate = (id: string, isoDate: string) =>
  API.post(`/orgs/${id}/date`, { isoDate: isoDate });
export const getGame = (id: string) => API.get(`/games/${id}`);
export const updateGame = (id: string, updatedGame: IGamePost | IGame) =>
  API.patch(`/games/${id}`, updatedGame);
export const createGame = (newGame: IGame) => API.post("/games", newGame);
export const updateResults = (id: string, results: IResultPost) =>
  API.post(`/games/${id}/results`, { results });

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
export const createLeague = (newLeague: ILeague) =>
  API.post("/leagues", newLeague);

export const getOrg = (id: string) => API.get(`/orgs/${id}`);
export const updateOrg = (id: string, updatedOrg: IOrg) =>
  API.patch(`/orgs/${id}`, updatedOrg);
export const createOrg = (newOrg: IOrg) => API.post("/orgs", newOrg);

export const Sport: APIType<ISport> = {
  get: (id: string) => API.get(`/sports/${id}`),
  update: (id: string, updatedSport: ISport) =>
    API.patch(`/sports/${id}`, updatedSport),
  create: (newSport: ISport) => API.post("/sports", newSport),
  list: () => API.get("/sports"),
};

export const Division: Omit<APIType<IDivision>, "update" | "list"> = {
  get: (id: string) => API.get(`/divisions/${id}`),
  create: (newDivision: IDivision) => API.post("/divisions", newDivision),
};

export const getQuiz = (id: string) => API.get(`/quizzes/${id}`);
export const createQuiz = (newQuiz: IQuiz) => API.post("/quizzes", newQuiz);

export const getAdmin = (id: string) => API.get(`/admins/${id}`);

export const signin = (formData: any) =>
  API.post("/auth/admin/signin", formData);
export const signup = (formData: any) =>
  API.post("/auth/admin/signup", formData);
export const refreshUser = () => API.post("auth/admin/token");
export const logout = () => API.post("/auth/admin/logout");

export const googleSignIn = (token: any) =>
  API.post("auth/admin/googlesignin", { token: token });
