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
    data: [ 0, 0, 0 ] // Initialize with zeros
  } ];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const formData = this.dataService.getFormData();
    if (formData) {
      // Assuming formData is in the format you specified
      this.pieChartDatasets[0].data = [
        this.calculateCashTotal(formData.cashItems),
        this.calculateDebtTotal(formData.debtItems),
        this.calculateNecessitiesTotal(formData.necessities)
      ];
    }
  }

  calculateCashTotal(cashItems: any[]): number {
    // Assuming each cashItem has an "amount" property
    return cashItems.reduce((total, cashItem) => total + (cashItem.amount || 0), 0);
  }

  calculateDebtTotal(debtItems: any[]): number {
    // Assuming each debtItem has an "amount" property
    return debtItems.reduce((total, debtItem) => total + (debtItem.amount || 0), 0);
  }

  calculateNecessitiesTotal(necessities: any[]): number {
    // Assuming each necessity has an "amount" property
    return necessities.reduce((total, necessity) => total + (necessity.amount || 0), 0);
  }
}
