import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @Input() username: any;
  otp: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };
  constructor(private router: Router, private apiService: ApiserviceService, private commonService: CommonserviceService, private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  otpController(event: any, next: any, prev: any) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }else if (next && event.target.value.length > 0) {
      next.setFocus();
    }else {

    }
    // if (event.keyCode == 8 && prev) {
    //   prev.setFocus();
    // } else if (event.keyCode >= 48 && event.keyCode <= 57) {
    //   if (next) {
    //     next.setFocus();
    //   }
    // } else {
    //   // event.path[0].value = '';
    // }
  }

  loginWithOTP() {
    if (!this.username) {
      this.commonService.showAlert("Alert", "Please enter username")
      return;
    }

    var otp=this.otp.first+this.otp.second+this.otp.third+this.otp.forth+this.otp.fifth+this.otp.sixth;

    // if (!this.email_otp) {
    //   this.commonService.showAlert("Alert", "Please enter OTP")
    //   return;
    // }
    var postParams = {
      username: this.username,
      otp: otp
    };
    this.apiService.requestViaPost('/employee/login_with_otp/', postParams).then(
      (result: any) => {
        console.log(result)
        if (result.status) {
          this.onSuccessLogin(result);
        } else {
          this.commonService.showError('Alert', result.message);
        }
      }, (err) => {
        console.log(err);

      }
    );
  }

  onSuccessLogin(result: any) {
    sessionStorage.clear();
    this.commonService.saveToken(result['access']);
    this.commonService.saveRefreshToken(result['refresh']);
    sessionStorage.setItem("user_detail", JSON.stringify(result.user));
    if (result.user.membership && result.user.membership[0]?.role.length > 0) {
      if (result.user.membership[0].organizations.master_permission_module.length > 0) {
        if (result.user.membership[0].organizations.master_permission_module[0].module.toLowerCase().trim() == "tax master") {
          var isCpa = result.user.membership[0].role.find((val: { name: string; }) => { return val.name == 'CPA (certified public accountant)' });
          var isCpaMember = result.user.membership[0].role.find((val: { name: string; }) => { return val.name == 'Tax Preparer' || val.name == 'CPA Team Members' });
          var isAdmin = result.user.membership[0].role.find((val: { name: string; }) => { return val.name == 'Admin' });
          var isReviewer = result.user.membership[0].role.find((val: { name: string; }) => { return val.name == 'Reviewer' });
          sessionStorage.setItem("module", "tax");
          if (isCpa || isCpaMember) {
            sessionStorage.setItem("current_role", "cpa");
            this.router.navigate(['/cpa-dashboard']);
          } else if (isReviewer) {
            sessionStorage.setItem("current_role", "reviewer");
            this.router.navigate(['/cpa-dashboard']);
          } else {
            if (isAdmin) {
              sessionStorage.setItem("current_role", "tax_admin");
              this.router.navigate(['/user-dashboard']);
            } else {
              sessionStorage.setItem("current_role", "tax_user");
              if (result.user.membership[0].user_joined_meeting) {
                this.router.navigate(['/user-dashboard']);
              } else {
                sessionStorage.setItem("module", "");
                this.router.navigate(['/schedule-call']);
              }
            }

          }

        } else {
          sessionStorage.setItem("module", "travel");
          if (result.user.membership[0].role[0].id == 5) {
            sessionStorage.setItem("current_role", "superadmin");
            this.router.navigate(['/superadmin/dashboard']);
          } else if (result.user.membership[0].role[0].id == 7) {
            sessionStorage.setItem("current_role", "vendor");
            this.router.navigate(['/vendor/tickets']);
          } else if (result.user.membership[0].role[0].id == 1) {
            sessionStorage.setItem("current_role", "admin");
            this.router.navigate(['/gm-dashboard']);
          } else {
            sessionStorage.setItem("current_role", "employee");
            this.router.navigate(['/dashboard']);
          }
        }
      } else {
        sessionStorage.setItem("module", "travel");
        if (result.user.membership[0].role[0].id == 5) {
          sessionStorage.setItem("current_role", "superadmin");
          this.router.navigate(['/superadmin/dashboard']);
        } else if (result.user.membership[0].role[0].id == 7) {
          sessionStorage.setItem("current_role", "vendor");
          this.router.navigate(['/vendor/tickets']);
        } else if (result.user.membership[0].role[0].id == 1) {
          sessionStorage.setItem("current_role", "admin");
          this.router.navigate(['/gm-dashboard']);
        } else {
          sessionStorage.setItem("current_role", "employee");
          this.router.navigate(['/dashboard']);
        }
      }
    } else {
      sessionStorage.setItem("module", "travel");
      sessionStorage.setItem("current_role", "employee");
      this.router.navigate(['/dashboard']);
    }
  }

}
