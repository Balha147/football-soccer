import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LowerCaseFirstLetterPipe } from '../../pipes/lowerCaseFirstLetter.pipe';
import { Observable } from 'rxjs';
import { FootballSoccerModel } from '../../models/football.model';
import { FootballSoccerService } from '../../services/football-soccer.service';
import { LEAGUE_HEADER_ITEMS } from '../../config/league-items.config';
import { LeagueItemModel } from '../../models/league-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [NgFor, LowerCaseFirstLetterPipe],
})
export class MenuComponent implements OnInit {
  leagueItems = LEAGUE_HEADER_ITEMS;

  @Output()
  onReadyFootballData: EventEmitter<Observable<FootballSoccerModel>> = new EventEmitter<Observable<FootballSoccerModel>>();

  private footballService = inject(FootballSoccerService);

  ngOnInit(): void {
    const leagueId = this.footballService.getSelectedLeagueId() ?? 39;
    this.loadData(leagueId);
  }

  selectCountry(selectItem: LeagueItemModel): void {
    this.leagueItems.forEach((item: LeagueItemModel) => {
      item.isSelected = item === selectItem;
    });
    this.footballService.setSelectedLeagueId(selectItem.id);
    this.loadData(selectItem.id);
  }

  private loadData(countryId: number): void {
    const data$ = this.footballService.getStandings(countryId);
    this.onReadyFootballData.emit(data$);
  }

}
