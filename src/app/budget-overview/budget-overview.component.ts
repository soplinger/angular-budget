import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.css']
})
export class BudgetOverviewComponent {
formData: any;


constructor(private dataService: DataService, private router: Router) {}

ngOnInit() {
  this.formData = this.dataService.getFormData();
  console.log(this.formData);
}

goToAdvising() {
  this.router.navigate(['/budget-advising']);
}

}
