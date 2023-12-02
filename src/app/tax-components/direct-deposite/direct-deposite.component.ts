import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-direct-deposite',
  templateUrl: './direct-deposite.component.html',
  styleUrls: ['./direct-deposite.component.scss'],
})
export class DirectDepositeComponent implements OnInit {
  @Output() pageChange = new EventEmitter<string>();
  direct_deposit_direct_debit_in_formation: any = {};
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getFilledData();
  }

  next() {
    // this.saveData();
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
          this.direct_deposit_direct_debit_in_formation = data.direct_deposit_direct_debit_in_formation;
        }
      },
      (error) => {
      }
    );
  }

  saveData() {
    if (this.direct_deposit_direct_debit_in_formation.attachment_file.length > 0)
      this.direct_deposit_direct_debit_in_formation.attachment_file.push(...this.direct_deposit_direct_debit_in_formation.attchments.map((item: { id: any; }) => item.id));
    var json = {
      "final_submitted": false,
      "tax_return": this.direct_deposit_direct_debit_in_formation.tax_return,
      "page_no": 4,
      "direct_deposit_direct_debit_in_formation": this.direct_deposit_direct_debit_in_formation,
      "tax_file_uploaded":[]
    }
    this.apiService.requestViaPost('/website/tax_return_preparation/', json).then(
      (result: any) => {
        if (result.status) {

        }
      }, (err: any) => {
      });

  }


}
