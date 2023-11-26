import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'My Profile', url: 'fs', icon: './assets/icon/my_profile.svg' },
    { title: 'Documents', url: 'fds', icon: './assets/icon/documents_menu.svg' },
    { title: 'Notification', url: 'ds', icon: './assets/icon/bell_icon.svg' },
    { title: 'Log Out', url: '', icon: './assets/icon/signout.svg' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
