import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  
  budgetForm: FormGroup;

  cashItems: number[] = [0]; // Initialize with one item
  cashItemNames: string[] = ['Checking', 'Savings', 'Retirement', 'Investments', 'Other'];
  
  debtItems: any[] = [{ debtName: 'Credit Cards', debtAmount: null, interestRate: null }];
  debtItemNames: string[] = ['Credit Cards', 'Personal Loans', 'Car Loan', 'Mortgage', 'Student Loans', 'Other'];
  debtInterestRates: number[] = [0];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.budgetForm = this.fb.group({
      postTaxIncome: [null],
      cashName0: [this.cashItemNames[0]],
      cashAmount0: [null],
      debtName0: [this.debtItemNames[0]],
      debtAmount0: [null],
      debtInterestRate0 : [null],
      rent: [null],
      bills: [null],
      groceries: [null],
      gas: [null],
      debtMinimumPayments: [null],
      necessities: this.fb.array([
        this.createNecessityControl('Rent'),
      // Add other form controls as needed
      ]),
    });
  }

  ngOnInit() {}

  addCashItem() {
    const newIndex = this.cashItems.length;
    this.cashItems.push(newIndex);

    // Initialize form controls for both cash item name and amount
    const nameControlName = `cashName${newIndex}`;
    const amountControlName = `cashAmount${newIndex}`;

    this.budgetForm.addControl(nameControlName, new FormControl(this.cashItemNames[0])); // Initialize with the first name
    this.budgetForm.addControl(amountControlName, new FormControl(null));
  }

  addDebtItem() {
    const newIndex = this.debtItems.length;
    this.debtItems.push({ debtName: 'Credit Cards', debtAmount: null, interestRate: null });

    // Initialize form controls for both debt item name and amount
    const debtNameControlName = `debtName${newIndex}`;
    const debtAmountControlName = `debtAmount${newIndex}`;
    const interestRateControlName = `debtInterestRate${newIndex}`;

    this.budgetForm.addControl(debtNameControlName, new FormControl(this.debtItemNames[0])); // Initialize with the first name
    this.budgetForm.addControl(debtAmountControlName, new FormControl(null));
    this.budgetForm.addControl(interestRateControlName, new FormControl(null));
  }

  get necessities() {
    return this.budgetForm.get('necessities') as FormArray;
  }

  addNecessity() {
    const control = this.createNecessityControl('');
    this.necessities.push(control);
  }

  createNecessityControl(name: string) {
    return this.fb.group({
      name: [name],
      amount: [null],
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const formData = this.budgetForm.value;
      // Process the form data as needed, e.g., send it to a server or perform calculations
      this.dataService.setFormData(formData);
      console.log(formData);
      this.router.navigate(['/budget-overview']);
    }
    else {
      console.log('Form is invalid');
    }
  }
  
}
