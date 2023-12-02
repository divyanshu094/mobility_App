import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-estimated-tax',
  templateUrl: './estimated-tax.component.html',
  styleUrls: ['./estimated-tax.component.scss'],
})
export class EstimatedTaxComponent implements OnInit {
  @Output() pageChange = new EventEmitter<string>();
  estimated_tax: any = {};
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getFilledData();
  }

  next() {
    // this.saveData();
    this.pageChange.emit("next");
  }

  prev() {
    // this.saveData();
    this.pageChange.emit("prev");
  }

  getFilledData() {
    this.apiService.requestViaGet('/website/tax_return_preparation/').then(
      (result: any) => {
        if (result.status) {
          var data = result.results;
          this.estimated_tax = data.estimated_tax_dependents;
        }
      },
      (error) => {
      }
    );
  }

  saveData() {
    this.estimated_tax.q1_ris1_date = this.estimated_tax.q4_state1_date ? this.datepipe.transform(this.estimated_tax.q1_ris1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q2_ris1_date = this.estimated_tax.q2_ris1_date ? this.datepipe.transform(this.estimated_tax.q2_ris1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q3_ris1_date = this.estimated_tax.q3_ris1_date ? this.datepipe.transform(this.estimated_tax.q3_ris1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q4_ris1_date = this.estimated_tax.q4_ris1_date ? this.datepipe.transform(this.estimated_tax.q4_ris1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q1_state1_date = this.estimated_tax.q1_state1_date ? this.datepipe.transform(this.estimated_tax.q1_state1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q2_state1_date = this.estimated_tax.q2_state1_date ? this.datepipe.transform(this.estimated_tax.q2_state1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q3_state1_date = this.estimated_tax.q3_state1_date ? this.datepipe.transform(this.estimated_tax.q3_state1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q4_state1_date = this.estimated_tax.q4_state1_date ? this.datepipe.transform(this.estimated_tax.q4_state1_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q1_ris2_date = this.estimated_tax.q1_ris2_date ? this.datepipe.transform(this.estimated_tax.q1_ris2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q2_ris2_date = this.estimated_tax.q2_ris2_date ? this.datepipe.transform(this.estimated_tax.q2_ris2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q3_ris2_date = this.estimated_tax.q3_ris2_date ? this.datepipe.transform(this.estimated_tax.q3_ris2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q4_ris2_date = this.estimated_tax.q4_ris2_date ? this.datepipe.transform(this.estimated_tax.q4_ris2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q1_state2_date = this.estimated_tax.q1_state2_date ? this.datepipe.transform(this.estimated_tax.q1_state2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q2_state2_date = this.estimated_tax.q2_state2_date ? this.datepipe.transform(this.estimated_tax.q2_state2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q3_state2_date = this.estimated_tax.q3_state2_date ? this.datepipe.transform(this.estimated_tax.q3_state2_date, 'yyyy-MM-dd') : ""
    this.estimated_tax.q4_state2_date = this.estimated_tax.q4_state2_date ? this.datepipe.transform(this.estimated_tax.q4_state2_date, 'yyyy-MM-dd') : ""
    if (this.estimated_tax.attchments)
      this.estimated_tax.attachment_file.push(...this.estimated_tax.attchments.map((item: { id: any; }) => item.id));

    var json = {
      "final_submitted": false,
      "tax_return": this.estimated_tax.tax_return,
      "page_no": 3,
      "estimated_tax": this.estimated_tax,
    }
    this.apiService.requestViaPost('/website/tax_return_preparation/', json).then(
      (result: any) => {
        if (result.status) {

        }
      }, (err: any) => {
      });

  }

}
