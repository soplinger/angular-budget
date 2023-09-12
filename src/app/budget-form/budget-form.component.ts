import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  cashItems: FormArray;
  debtItems: FormArray;
  necessityItems: FormArray;

  cashItemNames: string[] = ['Checking', 'Savings', 'Retirement', 'Investments', 'Other'];
  debtItemNames: string[] = ['Credit Cards', 'Personal Loans', 'Car Loan', 'Mortgage', 'Student Loans', 'Other'];
  necessityItemNames: string[] = ['Rent', 'Utilities', 'Groceries', 'Gas', 'Other'];
  debtInterestRates: number[] = [0];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.budgetForm = this.fb.group({
      postTaxIncome: [null],
      userAge: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      cashItems: this.fb.array([
        this.createCashControl(),
      ], Validators.minLength(1)),
      debtItems: this.fb.array([
        this.createDebtControl(),
      ], Validators.minLength(1)),
      necessities: this.fb.array([
        this.createNecessityControl(),
      ], Validators.minLength(1)),
    });
    

    this.cashItems = this.budgetForm.get('cashItems') as FormArray;
    this.debtItems = this.budgetForm.get('debtItems') as FormArray;
    this.necessityItems = this.budgetForm.get('necessityItems') as FormArray;
  }

  ngOnInit() {}

  addCashItem() {
    const cashItems = this.budgetForm.get('cashItems') as FormArray;
    this.cashItems.push(this.createCashControl());
  }

  
  addDebtItem() {
    const debtItems = this.budgetForm.get('debtItems') as FormArray;
    this.debtItems.push(this.createDebtControl());
  }
  
  get cash() {
    return this.budgetForm.get('cashItems') as FormArray;
  }

  get debt() {
    return this.budgetForm.get('debtItems') as FormArray;
  }

  get necessities() {
    return this.budgetForm.get('necessities') as FormArray;
  }

  addCash() {
    const control = this.createCashControl();
    this.cash.push(control);
  }

  addDebt() {
    const control = this.createDebtControl();
    this.debt.push(control);
  }

  addNecessity() {
    const control = this.createNecessityControl();
    this.necessities.push(control);
  }

  createCashControl() {
    return this.fb.group({
      name: ['Checking', Validators.required],
      amount: [null, Validators.required]
    });
  }

  createDebtControl() {
    return this.fb.group({
      name: ['Credit Cards', Validators.required],
      nickname: ['', Validators.required],  // Add this line
      amount: [null, Validators.required],
      interestRate: [null, Validators.required]
    });
  }
  

  createNecessityControl() {
    return this.fb.group({
      name: ['Rent', Validators.required],
      amount: [null, Validators.required],
    });
  }

  transformFormData(formData: any): any {
    const transformedData = {
      postTaxIncome: formData.postTaxIncome,
      cashItems: formData.cashItems.map((item: any) => ({
        name: item.name,
        amount: item.amount
      })),
      debtItems: formData.debtItems.map((item: any) => ({
        name: item.name,
        nickname: item.nickname,  // Add this line
        amount: item.amount,
        interestRate: item.interestRate
      })),
      necessities: formData.necessities.map((item: any) => ({
        name: item.name,
        amount: item.amount
      }))
    };
    return transformedData;
  }
  

  onSubmit() {
    if (this.budgetForm.valid) {
      const formData = this.transformFormData(this.budgetForm.value);
      // Process the transformed form data as needed
      this.dataService.setFormData(formData);
      console.log(formData);
      this.router.navigate(['/budget-overview']);
    } else {
      console.log('Form is invalid');
    }
  }

}
