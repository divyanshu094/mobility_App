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
  base_data:any={};
  isSubmitted:boolean=false;
  constructor(private apiService: ApiserviceService, public datepipe: DatePipe, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getFilledData();
   }

  next(){
    this.pageChange.emit("next");
  }

  getFilledData() {
    this.apiService.requestViaGet('/website/tax_return_preparation/').then(
      (result: any) => {
        if (result.status) {
          var data = result.results;
          this.isSubmitted=data.user.user_tax_status[0].tax_return_submitted;
          this.base_data = data.base_data;
        }
      },
      (error) => {
      }
    );
  }

}
