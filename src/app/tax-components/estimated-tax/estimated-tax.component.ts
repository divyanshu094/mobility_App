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
  estimated_tax:any={};
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() { }

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
          this.estimated_tax = data.estimated_tax_dependents;
        }
      },
      (error) => {
      }
    );
  }

}
