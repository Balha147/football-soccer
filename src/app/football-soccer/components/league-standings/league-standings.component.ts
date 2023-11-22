import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { responseApiModel } from '../../models/football.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-standings',
  standalone: true,
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.scss'],
  imports: [NgIf, NgFor, AsyncPipe],
})
export class LeagueStandingsComponent {
  @Input() data!: Observable<responseApiModel[]>;

  private router = inject(Router);

  navigateTo(id: number): void {
    this.router.navigate(['details', id]);
  }
}
