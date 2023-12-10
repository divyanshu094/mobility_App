import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.page.html',
  styleUrls: ['./organizer.page.scss'],
})
export class OrganizerPage implements OnInit {
  step: number = 1;
  step_names: any = [];
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService) { }

  ngOnInit() {
    this.step_names = ['', 'PERSONAL INFORMATION', 'ESTIMATED TAX PAYMENTS', 'DIRECT DEPOSIT/DIRECT DEBIT INFORMATION', 'SALARY & WAGE INCOME',
      'INVESTMENT INCOME', 'BUSINESS INCOME AND EXPENSES', 'Pension, annuity, & retirement income', 'RENTAL INCOME & EXPENSES', '', '', '', '', '', '', '', '', '', '', '']
    // this.getCountry();
    this.getUSStates();
  }

  getCountry() {
    this.apiService.requestViaGet('/superadmin/country/').then(
      (result: any) => {
        if (result.status) {
          this.commonService.countryArray = result.results;
        }
      },
      (error) => {
      }
    );
  }

  getUSStates() {
    this.apiService.requestViaGet('/superadmin/state_by_country/2/').then(
      (result: any) => {
        if (result.status) {
          this.commonService.US_StateList = result.results;
        }
      },
      (error) => {
      }
    );
  }

  next(eve: any) {
    if (eve == "next")
      this.step++;
    else
      this.step--;
  }
}
