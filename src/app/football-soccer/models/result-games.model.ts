export interface ResultGamesModel {
  get: string;
  parameters: {
    league: string;
    season: string;
  }
  errors: [],
  results: number,
  paging: {
    current: number,
    total: number,
  },
  response: ResultDetailsModel[];
}

export interface ResultDetailsModel {
  fixture: FixtureModel;
  league: LeagueModel;
  teams: TeamModel;
  goals: GoalsModel;
  score: ScoreModel;
}

export interface FixtureModel {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  }
  venue: {
    id: number;
    name: string;
    city: string;
  }
  status: {
    long: string;
    short: string;
    elapsed: number;
  }
}

export interface LeagueModel {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

export interface TeamModel {
    home: DetailsTeamsModel;
    away: DetailsTeamsModel;
}

export interface DetailsTeamsModel {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface GoalsModel {
    home: number;
    away: number;
}

export interface ScoreModel {
  halftime: GoalsModel;
  fulltime: GoalsModel;
  extratime: GoalsModel;
  penalty: GoalsModel;
}
