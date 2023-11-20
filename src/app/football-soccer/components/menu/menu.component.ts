import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { LowerCaseFirstLetterPipe } from '../../pipes/lowerCaseFirstLetter.pipe';
import { LEAGUE_HEADER_ITEMS } from '../../config/league-items.config';
import { LeagueItemModel } from '../../models/league-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [NgFor, LowerCaseFirstLetterPipe],
})
export class MenuComponent {
  leagueItems = LEAGUE_HEADER_ITEMS;

  @Output()
  onReadyLeagueId: EventEmitter<number> = new EventEmitter<number>();

  selectCountry(selectLeague: LeagueItemModel): void {

    this.leagueItems.forEach((item: LeagueItemModel) => {
      item.isSelected = item === selectLeague;
    });
    this.onReadyLeagueId.emit(selectLeague.id);
  }

}
