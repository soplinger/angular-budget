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
  debtAdvice: string = '';

  financialGoalOptions: string[] = ['Pay off Debt', 'Save for the Future', 'Save for a Large Purchase', 'Live Within My Means'];

  constructor(private dataService:DataService) {}

  ngOnInit() {
    this.formData = this.dataService.getFormData();
    console.log(this.formData);
  }

  onSubmit() {
    switch (this.financialGoal) {
      case 'Pay off debt':
        console.log('Pay off debt');
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
    this.handleDebt();
    console.log(this.financialGoal);
    this.showQuestion = false;
  }


  handleDebt() {
    console.log('handleDebt');
  
    const income = this.formData.postTaxIncome;
  
    // Calculate total expenses
    const expenses = this.formData.necessities.reduce((acc: number, expense: any) => {
      return acc + expense.amount;
    }, 0);
  
    // Calculate total debt and total interest
    let totalDebt = 0;
    let totalInterest = 0;
    this.formData.debtItems.forEach((debt: any) => {
      totalDebt += debt.amount;
      totalInterest += (debt.amount * debt.interestRate / 100);
    });
  
    // Calculate disposable income
    const disposableIncome = income - expenses;
  
    // Allocate a portion (e.g., 50%) of disposable income to debt
    const debtPayment = disposableIncome * 0.5;
  
    // Calculate months to pay off debt
    const monthsToPayOff = (totalDebt + totalInterest) / debtPayment;
  
    // Sort credit cards based on interest rate
const sortedCreditCards = this.formData.debtItems
.filter((debt: any) => debt.name === 'Credit Cards')
.sort((a: any, b: any) => b.interestRate - a.interestRate);

if (sortedCreditCards.length > 0) {
this.debtAdvice += ` Start by paying off the credit card nicknamed "${sortedCreditCards[0].nickname}" which has the highest interest rate of ${sortedCreditCards[0].interestRate}%.`;
}


    this.debtAdvice = `With a monthly payment of ${debtPayment.toFixed(2)}, it will take approximately ${Math.ceil(monthsToPayOff)} months to pay off the debt. You'll pay an estimated total of ${totalInterest.toFixed(2)} in interest.`;
    console.log(this.debtAdvice);
    console.log(sortedCreditCards);
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