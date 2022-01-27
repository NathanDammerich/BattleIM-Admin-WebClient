
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
    leagueID: string;
    day: string;
    time: string;
  }
  export interface IGamePost extends Omit<IGame, 'results'> {
    results: IResultPost;
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
    players: unknown[];
    invites: string[];
    captain: string;
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