import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { LEAGUE_HEADER_ITEMS } from '../../config/league-items.config';
import { LeagueItemModel } from '../../models/league-item.model';
import { ClickHighlightDirective } from '../../directive/click-highlight.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [NgFor, ClickHighlightDirective, NgClass],
})
export class MenuComponent {
  leagueItems = LEAGUE_HEADER_ITEMS;

  @Output()
  onReadySelectCountry: EventEmitter<number> = new EventEmitter<number>();

  onClickCountry(selectLeague: LeagueItemModel): void { // id: number router active route
    // a supprimer
    // this.leagueItems.forEach((item: LeagueItemModel) => {
    //   item.isSelected = (item === selectLeague);
    // });
    this.onReadySelectCountry.emit(selectLeague.id);
  }

}
