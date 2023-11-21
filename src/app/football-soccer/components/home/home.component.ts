import { Component, OnInit, inject } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Observable, map } from 'rxjs';
import { FootballSoccerModel, responseApiModel } from '../../models/football.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { LeagueStandingsComponent } from '../league-standings/league-standings.component';
import { FootballSoccerService } from '../../services/football-soccer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MenuComponent, LeagueStandingsComponent, NgIf, AsyncPipe],
})
export class HomeComponent implements OnInit {
  dataApi$!: Observable<responseApiModel[]>;

  private footballService = inject(FootballSoccerService);

  selectedCountryId =  this.footballService.selectedPreviousLeagueId ?? 39;

  ngOnInit(): void {
    this.loadData();
  }

  onLeagueSelected(countryId: number): void {
    this.selectedCountryId = countryId;
    this.footballService.selectedPreviousLeagueId = this.selectedCountryId;
    this.loadData();
  }

  loadData(): void {
   this.dataApi$ = this.footballService.getStandings(this.selectedCountryId).pipe(
    map((data: FootballSoccerModel) => data.response)
   );
  }
}
