import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAdvisingComponent } from './budget-advising.component';

describe('BudgetAdvisingComponent', () => {
  let component: BudgetAdvisingComponent;
  let fixture: ComponentFixture<BudgetAdvisingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetAdvisingComponent]
    });
    fixture = TestBed.createComponent(BudgetAdvisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
