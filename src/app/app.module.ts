import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionCriteriaComponent } from './selection-criteria/selection-criteria.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OptimalAlternativeComponent } from './optimal-alternative/optimal-alternative.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SelectionCriteriaComponent,
    MainLayoutComponent,
    OptimalAlternativeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
