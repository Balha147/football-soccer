import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { StandingsComponent } from '../standings/standings.component';
import { Observable, map } from 'rxjs';
import { DatailsModel, FootballSoccerModel } from '../../models/football.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-football-dashboard',
  standalone: true,
  templateUrl: './football-dashboard.component.html',
  styleUrls: ['./football-dashboard.component.scss'],
  imports: [MenuComponent, StandingsComponent, NgIf],
})
export class FootballDashboardComponent {

  footballData$!: Observable<DatailsModel[]>;

  getData(data:  Observable<FootballSoccerModel>): void {
    this.footballData$ = data.pipe(
      map((data: FootballSoccerModel) => data.response)
    );
  }

}
