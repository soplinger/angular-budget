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
  userTotalCash: number = 0;
  userEmergencyFund: number = 0;
  public debtAdvice: string[] = [];

  financialGoalOptions: string[] = ['Pay off Debt', 'Save for the Future', 'Save for a Large Purchase', 'Live Within My Means'];

  constructor(private dataService:DataService) {}

  ngOnInit() {
    this.formData = this.dataService.getFormData();
    console.log(this.formData);
  }

  onSubmit() {
    switch (this.financialGoal) {
      case 'Pay off Debt':
        this.handleDebt();
        break;
      case 'Save for the Future':
        this.handleFuture();
        break;
      case 'Save for a Large Purchase':
        this.handleLargePurchase();
        break;
      case 'Live Within My Means':
        this.handleLiveWithinMeans();
        break;
    }
    this.showQuestion = false;
  }

  handleDebt() {
    console.log('handleDebt');
    this.debtAdvice = [];
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
  
    this.debtAdvice.push(`Based on your monthly necessities, you should aim for an emergency fund of $${emergencyFundRequired.toFixed(2)}. `);
  
    if (totalCash < emergencyFundRequired) {
      this.debtAdvice.push(`You currently have $${totalCash.toFixed(2)}, which means you need an additional $${(emergencyFundRequired - totalCash).toFixed(2)} to reach your emergency fund goal. Consider building this fund before aggressively paying off debt. `);
    } else {
      this.debtAdvice.push(`You have an excess of $${availableCash.toFixed(2)} after setting aside a 6-month emergency fund. Consider using this amount to pay off your debt faster. `);
    }
  
    // Sort credit cards based on interest rate and provide advice
    const sortedCreditCards = this.formData.debtItems
      .filter((debt: any) => debt.name === 'Credit Cards')
      .sort((a: any, b: any) => b.interestRate - a.interestRate);
  
    if (sortedCreditCards.length > 0) {
      sortedCreditCards.forEach((card: { nickname: string, interestRate: number, amount: number }) => {
        const monthsToPayOff = card.amount / (income - expenses);
        this.debtAdvice.push(`Pay off the credit card nicknamed "${card.nickname}" with an interest rate of ${card.interestRate}%. It will take approximately ${Math.ceil(monthsToPayOff)} months to pay off. `);
      });
    }
  
    // Additional advice: Importance of budgeting and monitoring expenses
    this.debtAdvice.push(`Regularly monitor your expenses and adjust your budget as needed. This will help you stay on track with your financial goals and avoid accumulating more debt.`);
  }
  
  
  
  handleFuture() {
    const income = this.formData.postTaxIncome;
    const savingsRate = 0.2; // Recommended savings rate of 20%
    const recommendedSavings = income * savingsRate;

    const debtAdvice = [];
    debtAdvice.push(`For a secure financial future, it's recommended to save at least 20% of your post-tax income.`);
    debtAdvice.push(`Based on your current income, you should aim to save $${recommendedSavings.toFixed(2)} every month.`);
    debtAdvice.push(`Consider investing in retirement accounts or other long-term investment vehicles to maximize your returns.`);
    debtAdvice.push(`Regularly review and adjust your savings goals as your income and financial situation change.`);

    console.log(debtAdvice);
  }

handleLargePurchase() {
  const currentSavings = this.formData.cashItems.reduce((acc: number, cash: any) => acc + cash.amount, 0);
  const debtAdvice = [];
  debtAdvice.push(`When saving for a large purchase, it's essential to set a clear goal and timeline.`);
  debtAdvice.push(`You currently have $${currentSavings.toFixed(2)} saved. Determine the cost of your desired purchase and create a monthly savings plan.`);
  debtAdvice.push(`Avoid making impulsive decisions. Research your purchase thoroughly and consider all costs involved.`);
  debtAdvice.push(`Remember to maintain an emergency fund and not divert all your savings towards the purchase.`);

  console.log(debtAdvice);
}

handleLiveWithinMeans() {
  const monthlyExpenses = this.formData.necessities.reduce((acc: number, expense: any) => acc + expense.amount, 0);
  const income = this.formData.postTaxIncome;
  const debtAdvice = [];
  debtAdvice.push(`Living within your means is crucial for financial stability.`);
  debtAdvice.push(`Your monthly post-tax income is $${income.toFixed(2)}, and your monthly expenses amount to $${monthlyExpenses.toFixed(2)}.`);
  if (income > monthlyExpenses) {
      debtAdvice.push(`You have a surplus of $${(income - monthlyExpenses).toFixed(2)} each month. Consider saving or investing this amount.`);
  } else {
      debtAdvice.push(`You are spending more than you earn. Review your expenses and look for areas to cut back.`);
  }
  debtAdvice.push(`Regularly track your spending and adjust your budget as needed. Avoid accumulating debt and prioritize paying off any existing liabilities.`);

  console.log(debtAdvice);
}


}