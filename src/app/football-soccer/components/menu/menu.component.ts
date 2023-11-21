import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { LEAGUE_HEADER_ITEMS } from '../../config/league-items.config';
import { LeagueItemModel } from '../../models/league-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [NgFor, NgClass],
})
export class MenuComponent {
  leagueItems = LEAGUE_HEADER_ITEMS;

  selectedLeagueId: number = this.leagueItems[0].id

  @Output()
  onReadySelectCountry: EventEmitter<number> = new EventEmitter<number>();

  onClickCountry(selectLeague: LeagueItemModel): void { // id: number router active route

    this.selectedLeagueId = selectLeague.id;
    this.onReadySelectCountry.emit(selectLeague.id);
  }

}
