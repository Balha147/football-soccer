import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, catchError, pipe, tap } from 'rxjs';
import { FootballSoccerModel } from '../models/football.model';
import { API_HOST, API_KEY, BASE_URL, DETAILS_CACHE_KEY, STANDING_CACHE_KEY } from '../config/api-end-point.config';
import { CacheService } from './cache.service';
import { ResultGamesModel } from '../models/result-games.model';


@Injectable({providedIn: 'root'})
export class FootballSoccerService {

    private httpClient = inject(HttpClient);

    private cacheService = inject(CacheService);

    private _selectedPreviousLeagueId!: number;

    private headers = new HttpHeaders({
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    })

    // Getter
    get selectedPreviousLeagueId(): number {
      return this._selectedPreviousLeagueId;
    }

    // Setter
    set selectedPreviousLeagueId(leagueId: number) {
      this._selectedPreviousLeagueId = leagueId;
    }


    getStandings(league: number): Observable<FootballSoccerModel> {
      const cacheKey = `${STANDING_CACHE_KEY}${league}`;

      const cachedData = this.cacheService.get<FootballSoccerModel>(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      return this.fetchStandingData(league).pipe(this.pipeSource(cacheKey));

    }

    getDetails(teamId: number): Observable<ResultGamesModel> {
      const cacheKey = `${DETAILS_CACHE_KEY}${teamId}`

      const cachedData = this.cacheService.get<ResultGamesModel>(cacheKey);

      if (cachedData) {
        return cachedData;
      }
      return this.fetchDetailsData(teamId).pipe(this.pipeSource(cacheKey));
    }


    private fetchStandingData(league: number): Observable<FootballSoccerModel> {
      const currentSeason = new Date().getFullYear();
      let params = new HttpParams();
      params = params.append('league', league);
      params = params.append('season', currentSeason);
      return this.httpClient.get<FootballSoccerModel>(`${BASE_URL}standings`, {params, headers: this.headers});
    }

    private fetchDetailsData(teamId: number): Observable<ResultGamesModel> {
      let params = new HttpParams();
      params = params.append('team', teamId);
      params = params.append('last', 10);
      params = params.append('timezone', 'Europe/london');
      return this.httpClient.get<ResultGamesModel>(`${BASE_URL}fixtures`, { params, headers: this.headers});

    }

    private pipeSource<T>(cacheKey: string): MonoTypeOperatorFunction<T> {
      return pipe(
        tap((data: T) => {
          if (this.isValidData(data)) {
            this.cacheService.set(cacheKey, data);
          }
        }),
        catchError((err) => {
          throw err;
        })
      );
    }

    private isValidData(data: any): boolean {
      return data.results > 0;
    }

}
