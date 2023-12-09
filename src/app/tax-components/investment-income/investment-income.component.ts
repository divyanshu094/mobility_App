import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-investment-income',
  templateUrl: './investment-income.component.html',
  styleUrls: ['./investment-income.component.scss'],
})
export class InvestmentIncomeComponent implements OnInit {

  @Output() pageChange = new EventEmitter<string>();
  investment_income: any = [];
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getFilledData();
  }

  next() {
    this.saveData();
    this.pageChange.emit("next");
  }

  prev() {
    this.saveData();
    this.pageChange.emit("prev");
  }

  getFilledData() {
    this.apiService.requestViaGet('/website/tax_return_preparation/').then(
      (result: any) => {
        if (result.status) {
          var data = result.results;
          // this.isSubmitted=data.user.user_tax_status[0].tax_return_submitted;
          this.investment_income = data.salary_and_wage_income;
        }
      },
      (error) => {
      }
    );
  }


  saveData() {
    for (let i = 0; i < this.investment_income.length; i++) {
      this.investment_income[i].uploading_to_documents_interest_attachment_file = this.investment_income[i].uploading_to_documents_interest_attachment_file?.id ? this.investment_income[i].uploading_to_documents_interest_attachment_file.id : "";
    }
    var json = {
      "final_submitted": false,
      "tax_return": this.investment_income.tax_return,
      "page_no": 6,
      "investment_income": this.investment_income,
      "base_data": {}
    }
    this.apiService.requestViaPost('/website/tax_return_preparation/', json).then(
      (result: any) => {
        if (result.status) {

        }
      }, (err: any) => {
      });

  }

}
