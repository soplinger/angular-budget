import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-budget-advising',
  templateUrl: './budget-advising.component.html',
  styleUrls: ['./budget-advising.component.css']
})
export class BudgetAdvisingComponent {

  financialGoal: any;
  formData: any;
  showQuestion: boolean = true;

  financialGoalOptions: string[] = ['Pay off Debt', 'Save for the Future', 'Save for a Large Purchase', 'Live Within My Means'];

  constructor(private dataService:DataService) {}

  ngOnInit() {
    this.formData = this.dataService.getFormData();
  }

  onSubmit() {
    switch (this.financialGoal) {
      case 'Pay off debt':
        this.handleDebt();
        break;
      case 'Save for the future':
        this.handleFuture();
        break;
      case 'Save for a large purchase':
        this.handleLargePurchase();
        break;
      case 'Live within my means':
        this.handleLiveWithinMeans();
        break;
    }
    console.log(this.financialGoal);
    this.showQuestion = false;
  }


  handleDebt() {
    console.log('handleDebt');

    const income = this.formData.income;

    const expenses = this.formData.expenses.reduce((acc: number, expense: any) => {
      return acc + expense.amount;
    }, 0);

    console.log('expenses', expenses);
    
    }

  handleFuture() {
    console.log('handleFuture');
  }
  handleLargePurchase() {
    console.log('handleLargePurchase');
  }
  handleLiveWithinMeans() {
    console.log('handleLiveWithinMeans');
  }

}