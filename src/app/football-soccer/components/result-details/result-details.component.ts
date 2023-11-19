import { Component, Input, OnInit, inject } from '@angular/core';
import { FootballSoccerService } from '../../services/football-soccer.service';
import { Observable, map } from 'rxjs';
import { ResultDetailsModel, ResultGamesModel } from '../../models/result-games.model';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-details',
  standalone: true,
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss'],
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe],
})
export class ResultDetailsComponent implements OnInit {

  @Input() id!: number;

  private router = inject(Router);

  resultDetailsData$!: Observable<ResultDetailsModel[]>;

  private footballService = inject(FootballSoccerService);

  ngOnInit(): void {
    this. getResultData();
  }

  getResultData(): void {
    if (this.id) {
      this.resultDetailsData$ = this.footballService.getResultData(this.id).pipe(
        map((data: ResultGamesModel) => data.response)
      );
    }
  }

  goBackToDashboard(): void {
    this.router.navigate(['']);
  }

}
