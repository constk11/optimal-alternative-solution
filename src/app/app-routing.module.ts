import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OptimalAlternativeComponent } from './optimal-alternative/optimal-alternative.component';
import { SelectionCriteriaComponent } from './selection-criteria/selection-criteria.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/selection-criteria', pathMatch: 'full' },
      { path: 'selection-criteria', component: SelectionCriteriaComponent },
      { path: 'optimal-alternative', component: OptimalAlternativeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
