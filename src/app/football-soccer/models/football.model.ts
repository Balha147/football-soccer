export interface FootballSoccerModel {
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
  response: responseApiModel[];
}

// responseApiModel
export interface responseApiModel {
  league: LeagueModel;
}
export interface LeagueModel {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: [StandingsModel[]];
}
export interface StandingsModel {
  rank: number;
  team: TeamModel;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: StatisticsModel;
  home: StatisticsModel;
  away: StatisticsModel;
  update: string;
}
export interface GoalsModel {
  for: number;
  against: number;
}
export interface StatisticsModel {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: GoalsModel;
}
export interface TeamModel {
  id: number;
  name: string;
  logo: string;
}
