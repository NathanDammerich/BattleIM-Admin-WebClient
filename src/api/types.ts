
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
    results: IResult;
    note: string;
    leagueId: string;
    day: string;
    time: string;
    homeAttendance: string[];
    awayAttendance: string[];
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
  }
  
  export interface IOrg {
    _id: string;
  }
  
  export interface IQuiz {
    _id: string;
  }