import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  
  budgetForm: FormGroup;
  cashItems: number[] = [0]; // Initialize with one item
  cashItemNames: string[] = ['Checking', 'Savings', 'Retirement', 'Investments', 'Other'];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.budgetForm = this.fb.group({
      postTaxIncome: [null],
      cashName0: [this.cashItemNames[0]],
      cashAmount0: [null],
      creditCards: [null],
      personalLoans: [null],
      carLoan: [null],
      mortgage: [null],
      studentLoans: [null],
      rent: [null],
      bills: [null],
      groceries: [null],
      gas: [null],
      debtMinimumPayments: [null],
      // Add other form controls as needed
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
