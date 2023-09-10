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

  cashItems: FormArray;
  debtItems: FormArray;

  cashItemNames: string[] = ['Checking', 'Savings', 'Retirement', 'Investments', 'Other'];
  debtItemNames: string[] = ['Credit Cards', 'Personal Loans', 'Car Loan', 'Mortgage', 'Student Loans', 'Other'];
  debtInterestRates: number[] = [0];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.budgetForm = this.fb.group({
      postTaxIncome: [null],
      cashItems: this.fb.array([
        this.createCashControl(),
      ]),
      debtItems: this.fb.array([
        this.createDebtControl(),
      ]),
      necessities: this.fb.array([
        this.createNecessityControl('Rent'),
      ]),
    });

    this.cashItems = this.budgetForm.get('cashItems') as FormArray;
    this.debtItems = this.budgetForm.get('debtItems') as FormArray;
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
    const control = this.createNecessityControl('');
    this.necessities.push(control);
  }

  createCashControl() {
    return this.fb.group({
      name: ['Checking'],
      amount: [null]
    });
  }

  createDebtControl(){
    return this.fb.group({
      name: ['Credit Cards'],
      amount: [null],
      interestRate: [null]
    });
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
