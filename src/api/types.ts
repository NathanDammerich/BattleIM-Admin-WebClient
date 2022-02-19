export enum DOW {
  "Sunday" = "Sunday",
  "Monday" = "Monday",
  "Tuesday" = "Tuesday",
  "Wednesday" = "Wednesday",
  "Thursday" = "Thursday",
  "Friday" = "Friday",
  "Saturday" = "Saturday",
}

export interface ISport {
  _id: string;
  description: string;
  image: string;
  leagues: string[];
  org: string;
  rules: string;
}

export interface IGame {
  _id: string;
  location: string;
  league: string;
  date: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  results?: IResult;
  note?: string;
  leagueId: string;
  day?: string;
  time?: string;
  homeAttendance?: string[];
  awayAttendance?: string[];
}
export interface IGamePost extends Omit<IGame, "results"> {
  results?: IResultPost;
}

export interface IResultPost {
  winningTeam: ITeam;
  losingTeam: ITeam;
  winningScore: number;
  losingScore: number;
}
export interface IResult {
  winningTeam: string;
  losingTeam: string;
  winningScore: number;
  losingScore: number;
}

export interface ITeam {
  _id: string;
  name: string;
  wins: number;
  losses: number;
  leagueName: string;
  league: string;
  division: string;
  sport: ISport;
  games: IGame[] | string[];
  players: IPlayer[];
  invites: string[];
  captain: string;
}

export interface IPlayer {
  email: string;
  male: boolean;
  name: string;
  orgs: string[] | IOrg[];
  quizPassed: string[] | IQuiz[];
  teams: string[] | ITeam[];
  _id: string;
}

export interface IUser {
  _id: string;
}

export interface ILeague {
  _id: string;
  description: string;
  sport: ISport;
  registrationOpen: string;
  registrationClose: string;
  seasonStart: string;
  seasonEnd: string;
  playoffStart: string;
  playoffEnd: string;
  teams: ITeam[];
}

export interface ITimeslot {
  day: DOW;
  timeStart: Date;
  timeEnd: Date;
}
export interface IDivision {
  _id: string;
  games: IGame[];
  league: string;
  maxTeams: number;
  status: string;
  teams: ITeam[];
  timeSlot: string | ITimeslot[];
}

export interface IOrg {
  _id: string;
  sports?: ISport[];
}

export interface IQuiz {
  _id: string;
}
