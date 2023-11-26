import { Component } from '@angular/core';
import { CommonserviceService } from './services/commonservice.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  org_name:any="";
  name:any="";
  profile_pic:any="";
  public appPages = [
    { title: 'My Profile', url: 'fs', icon: './assets/icon/my_profile.svg' },
    { title: 'Documents', url: 'fds', icon: './assets/icon/documents_menu.svg' },
    { title: 'Notification', url: 'ds', icon: './assets/icon/bell_icon.svg' },
  ];
  constructor(public commonService: CommonserviceService,private alertController: AlertController,private router: Router) {
    var user_detail=JSON.parse(localStorage["user_detail"]);
    this.profile_pic=user_detail.profile.photo.file;
    this.name=user_detail.first_name+' '+user_detail.last_name;
    this.org_name=user_detail.membership[0].organizations.org_name;
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Would you want to logout?',
      buttons: [{
        text: 'Yes',
        role: 'confirm',
        handler: () => {
          this.router.navigate(['/']);
        },
      }
      ,'No'],
    });

    await alert.present();
  }
}
