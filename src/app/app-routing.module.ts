import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./football-soccer/football-soccer.route'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
