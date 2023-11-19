import { Routes } from '@angular/router';
import { FootballDashboardComponent } from './components/football-dashboard/football-dashboard.component';
import { ResultDetailsComponent } from './components/result-details/result-details.component';

const FOOTBALL_ROUTES: Routes = [
  {
    path: '',
    component: FootballDashboardComponent,
  },
  {
    path: 'result-details/:id',
    component: ResultDetailsComponent,
  },

];

export default FOOTBALL_ROUTES;
