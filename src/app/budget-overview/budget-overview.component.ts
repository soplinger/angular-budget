import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.css']
})
export class BudgetOverviewComponent {
formData: any;


constructor(private dataService: DataService) {}

ngOnInit() {
  this.formData = this.dataService.getFormData();
}

}
