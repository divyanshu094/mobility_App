import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonserviceService } from '../services/commonservice.service';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any = "";
  password: any = '';
  type: any = 'password';
  // @HostBinding() type: string='password';
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  constructor(private router: Router, private apiService: ApiserviceService, private commonService: CommonserviceService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  toggleEye() {
    this.type = this.type == "password" ? "text" : "password";
  }

  async loginViaOTP() {
    const modal = await this.modalCtrl.create({
      component: OtpComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass: 'otp-modal'
    });
    await modal.present();
  }

  signIn() {
    if (!this.username) {
      this.commonService.showAlert('Alert', 'Please enter Username');
      return;
    }

    if (!this.password) {
      this.commonService.showAlert('Alert', 'Please enter password');
      return;
    }

    let postParams = {
      username: this.username,
      password: this.password,
    }

    this.apiService.requestViaPost('/api/custom/login/', postParams).then(
      (result: any) => {
        if (result.access && result.status) {
          this.onSuccessLogin(result);
        } else {
          this.commonService.showError('Error', result.message);
        }
      }, (err) => {
      }
    );
  }

  onSuccessLogin(result: any) {
    this.commonService.saveToken(result['access']);
    this.commonService.saveRefreshToken(result['refresh']);
    localStorage.clear();
    localStorage.setItem("user_detail", JSON.stringify(result.user));
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
            this.router.navigate(['cpa-dahboard']);
          } else if (isReviewer) {
            sessionStorage.setItem("current_role", "reviewer");
            this.router.navigate(['reviwer-dahboard']);
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
