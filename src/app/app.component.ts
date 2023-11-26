import { Component } from '@angular/core';
import { CommonserviceService } from './services/commonservice.service';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
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
    { title: 'My Profile', url: '/profile', icon: './assets/icon/my_profile.svg' },
    { title: 'Documents', url: '/documents', icon: './assets/icon/documents_menu.svg', },
    { title: 'Notification', url: '/notification', icon: './assets/icon/bell_icon.svg' },
  ];
  constructor(public commonService: CommonserviceService, private alertController: AlertController, private router: Router, private toastCtrl: ToastController, private platform: Platform, private navCtrl: NavController) {
    this.initApp();
  }

  initApp() {
    //================native back button handling===============================>
    var lastTimeBackPress = 0;
    var timePeriodToExit = 2000;
    this.platform.backButton.subscribeWithPriority(0, async () => {
      if (this.router.url === '/dashboard') {
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
      } else if (this.router.url === '/login') {
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
          localStorage.clear();
          sessionStorage.clear();
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
