import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-business-income',
  templateUrl: './business-income.component.html',
  styleUrls: ['./business-income.component.scss'],
})
export class BusinessIncomeComponent  implements OnInit {
  @Output() pageChange = new EventEmitter<string>();
  base_data:any={}
  business_income_and_expenses:any={}
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
          this.business_income_and_expenses = data.business_income_and_expenses;
        }
      },
      (error) => {
      }
    );
  }

  saveData() {
    // for (let i = 0; i < this.salary_and_wage_income.length; i++) {
    //   this.salary_and_wage_income[i].w2_uploaded_attachment_file = this.salary_and_wage_income[i].w2_uploaded_attachment_file?.id ? this.salary_and_wage_income[i].w2_uploaded_attachment_file.id : "";
    // }
    var json = {
      "final_submitted": false,
      "tax_return": this.business_income_and_expenses.tax_return,
      "page_no": 7,
      "business_income_and_expenses": this.business_income_and_expenses,
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
