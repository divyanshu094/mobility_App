import { Component } from '@angular/core';
import { CommonserviceService } from './services/commonservice.service';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { ApiserviceService } from './services/apiservice.service';
// import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  org_name: any = "";
  name: any = "";
  profile_pic: any = "";
  public appPages = [
    { title: 'Dashboard', url: this.getDashUrl(), icon: './assets/icon/my_profile.svg' },
    { title: 'My Profile', url: '/tax-profile', icon: './assets/icon/my_profile.svg' },
    { title: 'Documents', url: '/documents', icon: './assets/icon/documents_menu.svg', },
    { title: 'Notification', url: '/notification', icon: './assets/icon/bell_icon.svg' },
  ];
  constructor(private apiService: ApiserviceService, public commonService: CommonserviceService, private alertController: AlertController, private router: Router, private toastCtrl: ToastController, private platform: Platform, private navCtrl: NavController) {
    this.initApp();
  }

  getDashUrl() {
    var url = '/user-dashboard';
    if (localStorage["current_role"] != 'tax_user') {
      url = '/cpa-dashboard';
    }
    return url;
  }

  initApp() {
    const token = localStorage['loggedIn'];
    if (token) {
      this.getPersonalInfo();
      this.router.navigate([this.getDashUrl()]);
    }

    //================native back button handling===============================>
    var lastTimeBackPress = 0;
    var timePeriodToExit = 2000;
    this.platform.backButton.subscribeWithPriority(0, async () => {
      if (this.router.url === '/user-dashboard' || this.router.url === 'cpa-dashboard' || this.router.url === '/login') {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          App.exitApp(); //Exit from app
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Press back again to exit App.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

          lastTimeBackPress = new Date().getTime();
        }
      } else {
        this.navCtrl.back();
      }
    });
  }

  getPersonalInfo() {
    this.apiService.requestViaGet('/employee/update_employee/' + JSON.parse(localStorage["user_detail"]).id + '/').then(
      (result: any) => {
        if (result.status) {
          var personalInfo = result.results;
          this.profile_pic=personalInfo.profile.photo.file;
          localStorage.setItem("user_detail",JSON.stringify(personalInfo));
        } else {
          this.commonService.showError("Alert", "No Record Found");
        }
      },
      (error) => {
      }
    );
  }

  showDetails() {
    if (localStorage["user_detail"])
      var user_detail = JSON.parse(localStorage["user_detail"]);
    if (user_detail) {
      this.profile_pic = user_detail.profile.photo.file;
      this.name = user_detail.first_name + ' ' + user_detail.last_name;
      this.org_name = user_detail.membership[0].organizations.org_name;
    }
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Would you want to logout?',
      buttons: [{
        text: 'Yes',
        role: 'confirm',
        handler: () => {
          // localStorage.clear();
          localStorage.removeItem('loggedIn');
          localStorage.clear();
          this.router.navigate(['/']);
        },
      }
        , 'No'],
    });

    await alert.present();
  }

  // async performBiometricVerificatin() {
  //   const result = await NativeBiometric.isAvailable();

  //   if (!result.isAvailable) return;

  //   const isFaceID = result.biometryType == BiometryType.FACE_ID;

  //   const verified = await NativeBiometric.verifyIdentity({
  //     reason: "For easy log in",
  //     title: "Log in",
  //     subtitle: "Maybe add subtitle here?",
  //     description: "Maybe a description too?",
  //   })
  //     .then(() => true)
  //     .catch(() => false);

  //   if (!verified) return;

  //   const credentials = await NativeBiometric.getCredentials({
  //     server: "www.example.com",
  //   });
  // }
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM DD , YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};