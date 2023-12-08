import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})
export class ServiceListPage implements OnInit {
  serviceList: any = [];
  year: any;
  user_id: any;
  total_amount: any = "";
  selectedData: any = [];
  client_name: string = "";
  f_name: any;
  l_name: any;
  client_email: any;
  profile_pic: any;
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiserviceService, public commonService: CommonserviceService) {
    this.year = this.route.snapshot.paramMap.get("year");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
  }

  ngOnInit(): void {
    this.getServiceList();
    this.getTimeline();
  }

  getTimeline() {
    this.apiService.requestViaGet('/website/user_get_tax_timeline_status/?year=' + this.year + '&user_id=' + this.user_id).then(
      (result: any) => {
        if (result.status) {
          this.client_name = result.results.first_name + ' ' + result.results.last_name
          this.f_name = result.results.first_name;
          this.l_name = result.results.last_name;
          this.client_email = result.results.email;
          this.profile_pic = result.results.profile?.photo.file;
        }
      },
      (error) => {
      }
    );
  }

  getServiceList() {
    this.apiService.requestViaGet('/website/tax_organizer_user_service/?year=' + this.year + '&user_id=' + this.user_id).then(
      (result: any) => {
        if (result.status) {
          this.serviceList = result.results;
          for (let i = 0; i < this.serviceList.length; i++) {
            this.serviceList[i].service_id = this.serviceList[i].id;
            if (this.serviceList[i].selected || this.serviceList[i].required)
              this.selectedData.push(this.serviceList[i])
          }
          this.updateAmount({});
        }
      },
      (error) => {
      }
    );
  }

  updateAmount(item: any) {
    if (!item.fees) {
      item.fees = 0;
    }
    this.total_amount = this.selectedData.map((t: { fees: any; }) => t.fees).reduce((acc: number, value: string) => acc + parseInt(value), 0);
  }

  changeStatus(event: any, item: any) {
    if (event) {
      // item.service_id = item.id;
      this.selectedData.push(item);
    } else {
      var index = this.selectedData.findIndex((x: { id: any; }) => x.id === item.id);
      this.selectedData.splice(index, 1);
    }
    item.required = event;
    this.updateAmount(item);
  }


  updateUserServiceList(status: any) {
    var json = {
      "service_data": this.serviceList,
      "service_status": status
    }
    this.apiService.requestViaPost('/website/tax_organizer_user_service/', json).then(
      (result: any) => {
        if (result.status) {
          if (status) {
            this.commonService.showSuccess("Success", "Service list updated successfully and Engagment letter sent on email");
          } else {
            this.commonService.showSuccess("Success", "Service list updated successfully");
          }
          // this.getServiceList();
        }
      },
      (error) => {
      }
    );
  }

}
