import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonserviceService } from '../services/commonservice.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AddDocumentComponent } from '../components/add-document/add-document.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  user_id: string = "";
  documents: any = [];
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService, public popoverCtrl: PopoverController, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    var user = JSON.parse(localStorage["user_detail"]);
    this.user_id = user.id;
    this.getDocuments();
  }

  async addDocument() {
    const modal = await this.modalCtrl.create({
      component: AddDocumentComponent,
      breakpoints: [0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass: 'otp-modal',
    });
    await modal.present();
  }

  getDocuments() {
    this.apiService.requestViaGet('/employee/master_document/?user_id=' + this.user_id).then(
      (result: any) => {
        if (result.status) {
          this.documents = result.results;
        }
      },
      (error) => {
      }
    );
  }

  edit(data: any) {

  }

  async delete(data: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Would you like to delete this record?',
      buttons: [{
        text: 'Yes',
        role: 'confirm',
        handler: () => {
          this.deleteDocument(data.id);
        },
      }
        , 'No'],
    });

    await alert.present();
  }

 async deleteDocument(id: any) {
    this.apiService.requestViaDelete('/employee/update_master_document/' + id + '/').then(
      async (result: any) => {
        if (result.status) {
          this.getDocuments();
          await this.popoverCtrl.dismiss();
          this.commonService.showSuccess("Success", result.message)
        } else {
          this.commonService.showError("Alert", "Error");
        }
      },
      (error) => {
      }
    );
  }
}
