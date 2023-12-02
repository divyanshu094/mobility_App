import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  @Output() pageChange = new EventEmitter<string>();
  base_data: any = {};
  isSubmitted: boolean = false;
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getFilledData();
  }

  next() {
    this.saveData();
  }

  getFilledData() {
    this.apiService.requestViaGet('/website/tax_return_preparation/').then(
      (result: any) => {
        if (result.status) {
          var data = result.results;
          this.isSubmitted = data.user.user_tax_status[0].tax_return_submitted;
          this.base_data = data.base_data;
        }
      },
      (error) => {
      }
    );
  }

  saveData() {
    this.base_data.date_of_birth_t = this.datepipe.transform(this.base_data.date_of_birth_t, 'yyyy-MM-dd')
    this.base_data.date_of_birth_s = this.datepipe.transform(this.base_data.date_of_birth_s, 'yyyy-MM-dd')
    this.base_data.issue_date_t = this.datepipe.transform(this.base_data.issue_date_t, 'yyyy-MM-dd')
    this.base_data.issue_date_s = this.datepipe.transform(this.base_data.issue_date_s, 'yyyy-MM-dd')
    this.base_data.expiration_date_t = this.datepipe.transform(this.base_data.expiration_date_t, 'yyyy-MM-dd')
    if (this.base_data.attchments)
      this.base_data.attachment_file.push(...this.base_data.attchments.map((item: { id: any; }) => item.id));

    var json = {
      "final_submitted": false,
      "tax_return": this.base_data.id,
      "page_no": 1,
      "base_data": this.base_data
    }
    this.apiService.requestViaPost('/website/tax_return_preparation/', json).then(
      (result: any) => {
        if (result.status) {
          this.pageChange.emit("next");
        }
      }, (err: any) => {
      });

  }
}
