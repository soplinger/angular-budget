import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetOverviewComponent } from './budget-overview/budget-overview.component';
import { BudgetChartComponent } from './budget-chart/budget-chart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'budget-form', component: BudgetFormComponent },
  { path: 'budget-overview', component: BudgetOverviewComponent },
  { path: 'budget-chart', component: BudgetChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
