import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  year: any = "";
  user: any = {};
  current_status: any = "";
  due_date: any = "";
  current_step: number = 0;
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    if (localStorage["user_detail"]) {
      this.user = JSON.parse(localStorage["user_detail"]);
      this.getStatus();
    }
  }

  getStatus() {
    this.apiService.requestViaGet('/website/user_get_tax_timeline_last_status/?user_id=' + this.user.id + '&year=' + this.year).then(
      (result: any) => {
        if (result.status) {
          this.current_status = result.message;
          this.due_date = result.date;
          this.current_step = result.position - 1;
        }
      },
      (error) => {
      }
    );
  }

}
