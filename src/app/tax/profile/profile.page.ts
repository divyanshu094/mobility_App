import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_id: any;
  personalInfo: any = {
    profile: {}
  };
  profile_pic:any="";
  constructor(private apiService: ApiserviceService, public commonService: CommonserviceService) { }

  ngOnInit() {
    var user = JSON.parse(localStorage["user_detail"]);
    this.user_id = user.id;
    this.getPersonalInfo();
  }

  getPersonalInfo() {
    this.apiService.requestViaGet('/employee/update_employee/' + this.user_id + '/').then(
      (result: any) => {
        if (result.status) {
          this.personalInfo = result.results;
          this.personalInfo.profile.username = this.personalInfo.username;
          this.personalInfo.profile.email = this.personalInfo.email;
          this.profile_pic = this.personalInfo.profile.photo?.file
          if (this.personalInfo.profile.photo) {
            this.personalInfo.profile.photo = this.personalInfo.profile.photo.id;
          }

          this.personalInfo.profile.first_name = this.personalInfo.first_name;
          this.personalInfo.profile.middle_name = this.personalInfo.middle_name;
          this.personalInfo.profile.last_name = this.personalInfo.last_name;
        } else {
          this.commonService.showError("Alert", "No Record Found");
        }
      },
      (error) => {
      }
    );
  }

  savePersonal() {
    if (!this.personalInfo.profile.first_name) {
      this.commonService.showAlert('Alert', 'Please enter first name');
      return;
    } else if (!this.personalInfo.profile.last_name) {
      this.commonService.showAlert('Alert', 'Please enter last name');
      return;
    }
    this.personalInfo.profile.supervisor = this.personalInfo.profile.supervisor?.id;
    this.apiService.requestViaPatch('/employee/update_employee/' + this.user_id + '/', this.personalInfo.profile).then(
      (result: any) => {
        if (result.status) {
          this.commonService.showSuccess("Success", result.message);
          this.getPersonalInfo();
        } else {
          this.commonService.showError("Alert", "Error");
        }
      },
      (error) => {
      }
    );
  }

}
