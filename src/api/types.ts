
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
  }
  
  export interface IResult {
    winner: string;
    loser: string;
    homeScore: number;
    awayScore: number;
    // winningTeam: ITeam;
    // losingTeam: ITeam;
    // winningScore: number;
    // losingScore: number;
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