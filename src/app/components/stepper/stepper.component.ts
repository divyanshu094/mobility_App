import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent  implements OnInit {
  steps = [
    'Personal Information',
    'Estimated Tax Payments',
    'Direct Deposit / Debit Information',
    'Salary & Wage Income',
    'Investment Income',
    'Pension, Annuity, & Retirement Income',
    'Business Income & Expenses',
 ];
  constructor() { }

  ngOnInit() {}

}
