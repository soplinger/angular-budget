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
  userTotalCash: number = 0;
  userEmergencyFund: number = 0;


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
  
    // Calculate total cash
    const totalCash = this.formData.cashItems.reduce((acc: number, cash: any) => {
      return acc + cash.amount;
    }, 0);
  
    // Calculate 6-month emergency fund
    const emergencyFundRequired = expenses * 6;
  
    // Calculate available cash after setting aside emergency fund
    const availableCash = totalCash - emergencyFundRequired;
  
    // Store the financial information
    this.userTotalCash = totalCash;
    this.userEmergencyFund = availableCash > 0 ? emergencyFundRequired : totalCash;
  
    this.debtAdvice = `Based on your monthly necessities, you should aim for an emergency fund of $${emergencyFundRequired.toFixed(2)}. `;
  
    if (totalCash < emergencyFundRequired) {
      this.debtAdvice += `You currently have $${totalCash.toFixed(2)}, which means you need an additional $${(emergencyFundRequired - totalCash).toFixed(2)} to reach your emergency fund goal. Consider building this fund before aggressively paying off debt. `;
    } else {
      this.debtAdvice += `You have an excess of $${availableCash.toFixed(2)} after setting aside a 6-month emergency fund. Consider using this amount to pay off your debt faster. `;
    }
  
    // Sort credit cards based on interest rate and provide advice
    const sortedCreditCards = this.formData.debtItems
      .filter((debt: any) => debt.name === 'Credit Cards')
      .sort((a: any, b: any) => b.interestRate - a.interestRate);
  
    if (sortedCreditCards.length > 0) {
      sortedCreditCards.forEach((card: { nickname: string, interestRate: number, amount: number }) => {
        const monthsToPayOff = card.amount / (income - expenses);
        this.debtAdvice += `Pay off the credit card nicknamed "${card.nickname}" with an interest rate of ${card.interestRate}%. It will take approximately ${Math.ceil(monthsToPayOff)} months to pay off. `;
      });
    }
  
    // Additional advice: Importance of budgeting and monitoring expenses
    this.debtAdvice += `Regularly monitor your expenses and adjust your budget as needed. This will help you stay on track with your financial goals and avoid accumulating more debt.`;
  
    console.log(this.debtAdvice);
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