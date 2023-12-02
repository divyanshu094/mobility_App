import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-salary-wage',
  templateUrl: './salary-wage.component.html',
  styleUrls: ['./salary-wage.component.scss'],
})
export class SalaryWageComponent implements OnInit {

  @Output() pageChange = new EventEmitter<string>();
  salary_and_wage_income: any = [];
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getFilledData();
  }

  next() {
    this.pageChange.emit("next");
  }

  prev() {
    this.pageChange.emit("prev");
  }

  getFilledData() {
    this.apiService.requestViaGet('/website/tax_return_preparation/').then(
      (result: any) => {
        if (result.status) {
          var data = result.results;
          // this.isSubmitted=data.user.user_tax_status[0].tax_return_submitted;
          this.salary_and_wage_income = data.salary_and_wage_income;
        }
      },
      (error) => {
      }
    );
  }

}
