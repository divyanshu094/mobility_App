import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent implements OnInit {
  email:any="";
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService, private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  sendMail() {
    var postParams = {
      email: this.email
    };
    this.apiService.requestViaPost('/api/custom/password_reset/', postParams).then(
      (result: any) => {
        console.log(result)
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess('Success', result.message);
        } else {
          this.commonService.showError('Alert', result.message);
        }
      }, (err) => {
        console.log(err);

      }
    );
  }

}
