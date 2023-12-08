import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonserviceService } from '../services/commonservice.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  NotificationArr:any=[];
  constructor(private apiService: ApiserviceService, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.apiService.requestViaGet('/employee/user_get_notification/').then(
      (result: any) => {
        if (result.status) {
          this.NotificationArr = result.results;
        } else {
          this.commonService.showError("Alert", "No Record Found");
        }
      },
      (error) => {
      }
    );
  }
}
