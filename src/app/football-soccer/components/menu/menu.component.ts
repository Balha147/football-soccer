import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { LEAGUE_HEADER_ITEMS } from '../../config/league-items.config';
import { FootballSoccerService } from '../../services/football-soccer.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [NgFor, NgClass],
})
export class MenuComponent {
  leagueItems = LEAGUE_HEADER_ITEMS;

  private footballService = inject(FootballSoccerService);

  selectedLeagueId = this.footballService.selectedPreviousLeagueId ?? this.leagueItems[0].id;

  @Output()
  onReadySelectCountry: EventEmitter<number> = new EventEmitter<number>();

  onClickCountry(selectLeague: number): void {

    this.selectedLeagueId = selectLeague;
    this.onReadySelectCountry.emit(selectLeague);
  }

}
