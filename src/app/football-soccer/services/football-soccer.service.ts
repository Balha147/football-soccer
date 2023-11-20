import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {EMPTY, Observable, catchError, tap } from 'rxjs';
import {FootballSoccerModel} from '../models/football.model';
import {BASE_URL, HTTP_OPTIONS} from '../config/api-end-point.config';
import { CacheService } from './cache.service';
import { ResultGamesModel } from '../models/result-games.model';


@Injectable({providedIn: 'root'})
export class FootballSoccerService {

    private httpClient = inject(HttpClient);

    private cacheService = inject(CacheService);

    private standingCacheKeyPrefix = 'football-soccer-service-cache-';

    private resultCacheKeyPrefix = 'result-data-service-cache-';

    private _selectedPreviousLeagueId!: number;

    // Getter
    get selectedPreviousLeagueId(): number {
      return this._selectedPreviousLeagueId;
    }

    // Setter
    set selectedPreviousLeagueId(leagueId: number) {
      this._selectedPreviousLeagueId = leagueId;
    }


    getStandings(league: number): Observable<FootballSoccerModel> {
      const cacheKey = this.generateStandingCacheKey(league);

      const cachedData = this.getCachedData<FootballSoccerModel>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const data$ = this.fetchData(league);

      return this.cacheAndReturnData(data$, cacheKey);
    }

    getResultData(teamId: number): Observable<ResultGamesModel> {
      const cacheKey = this.generateResultCacheKey(teamId);

      const cachedData = this.getCachedData<ResultGamesModel>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const data$ = this.fetchResultData(teamId);

      return this.cacheAndReturnData(data$, cacheKey);
    }

    private generateStandingCacheKey(league: number): string {
      return `${this.standingCacheKeyPrefix}${league}`;
    }

    private generateResultCacheKey(teamId: number): string {
      return `${this.resultCacheKeyPrefix}${teamId}`;
    }

    private getCachedData<T>(cacheKey: string): Observable<T> | null {
      return this.cacheService.get<T>(cacheKey);
    }

    private fetchData(league: number): Observable<FootballSoccerModel> {
      const currentSeason = new Date().getFullYear();
      return this.httpClient.get<FootballSoccerModel>(`${BASE_URL}standings?league=${league}&season=${currentSeason}`, HTTP_OPTIONS).pipe(
        catchError((err) => {
          throw err;
        })
      );
    }

    private fetchResultData(teamId: number): Observable<ResultGamesModel> {
      return this.httpClient.get<ResultGamesModel>(`${BASE_URL}fixtures?team=${teamId}&last=10&timezone=Europe/london`, HTTP_OPTIONS).pipe(
        catchError((err) => {
          throw err;
        })
      );
    }

    private cacheAndReturnData<T>(data$: Observable<T>, cacheKey: string): Observable<T> {
      return data$.pipe(
        tap((data: T) => {
          if (this.isValidData(data)) {
            this.cacheService.set(cacheKey, data);
          }
        })
      );
    }

    private isValidData(data: any): boolean {
      return data.results > 0;
    }

}
