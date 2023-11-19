import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DatailsModel } from '../../models/football.model';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standings',
  standalone: true,
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe],
})
export class StandingsComponent {
  @Input() data$!: Observable<DatailsModel[]>;

  private router = inject(Router);

  navigateTo(id: number): void {
    this.router.navigate(['result-details', id]);
  }
}
