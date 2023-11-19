/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FootballSoccerService } from './football-soccer.service';

describe('Service: FootballSoccer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballSoccerService]
    });
  });

  it('should ...', inject([FootballSoccerService], (service: FootballSoccerService) => {
    expect(service).toBeTruthy();
  }));
});
