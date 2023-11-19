import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StoreModule.forRoot({ standings: standingsReducer }),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // conserve les 25 dernières actions
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
