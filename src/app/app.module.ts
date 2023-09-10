import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BudgetOverviewComponent } from './budget-overview/budget-overview.component';
import { NgChartsModule } from 'ng2-charts';
import { BudgetChartComponent } from './budget-chart/budget-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetFormComponent,
    HomeComponent,
    BudgetOverviewComponent,
    BudgetChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgChartsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
