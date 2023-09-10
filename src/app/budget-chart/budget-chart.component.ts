import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})

export class BudgetChartComponent implements OnInit {

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels: string[] = ['Cash', 'Debt', 'Necessities'];

  public pieChartDatasets = [ {
    data: [ 1000, 500, 100 ]
  } ];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const formData = this.dataService.getFormData();
    if (formData) {
      this.pieChartDatasets[0].data = [
        formData.cashTotal, formData.debtTotal, formData.necessitiesTotal
      ];
    }
  }
}