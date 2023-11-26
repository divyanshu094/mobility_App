import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  otpController(event: any, next: any, prev: any) {
    // if (event.target.value.length < 1 && prev) {
    //   prev.setFocus()
    // }else if (next && event.target.value.length > 0) {
    //   next.setFocus();
    // }else {

    // }
    if (event.keyCode == 8 && prev) {
      prev.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (next) {
        next.setFocus();
      }
    } else {
      // event.path[0].value = '';
    }
  }

}
