import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.page.html',
  styleUrls: ['./organizer.page.scss'],
})
export class OrganizerPage implements OnInit {
  step: number = 1;
  step_names:any=[];
  constructor() { }

  ngOnInit() {
    this.step_names=['','PERSONAL INFORMATION','ESTIMATED TAX PAYMENTS','DIRECT DEPOSIT/DIRECT DEBIT INFORMATION','SALARY & WAGE INCOME',
    'INVESTMENT INCOME','Pension, annuity, & retirement income','BUSINESS INCOME AND EXPENSES','RENTAL INCOME & EXPENSES','','','','','','','','','','','']
  }

  next(eve: any) {
    if (eve == "next")
      this.step++;
    else
      this.step--;
  }
}
