import { Component, Injectable, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonserviceService } from '../services/commonservice.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AddDocumentComponent } from '../components/add-document/add-document.component';
import { OptionsComponent } from '../components/options/options.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  user_id: string = "";
  documents: any = [];
  filterTerm:any="";
  constructor(private apiService: ApiserviceService, public commonService: CommonserviceService, public popoverCtrl: PopoverController, private modalCtrl: ModalController, private alertController: AlertController) { }

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

    modal.onDidDismiss().then((data) => {
      this.getDocuments();
    });
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

  async showOptions(ev: any, item: any) {
    const pop = await this.popoverCtrl.create({
      component: OptionsComponent,
      cssClass: 'optionsPopOver',
      event: ev,
      showBackdrop: true
    })

    pop.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned.data);
      if (dataReturned.data == 'del') {
        this.delete(item)
      } else if (dataReturned.data == 'edit') {
        this.edit(item);
      }
    })

    return await pop.present();

  }

  async edit(data: any) {
    const modal = await this.modalCtrl.create({
      component: AddDocumentComponent,
      breakpoints: [0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass: 'otp-modal',
      componentProps:{
        "data":data
      }
    });
    await modal.present();

    modal.onDidDismiss().then((data) => {
      this.getDocuments();
    });
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
          this.commonService.showSuccess("Success", result.message)
        } else {
          this.commonService.showError("Alert", "Error");
        }
      },
      (error) => {
      }
    );
  }
  
  onSearchInput(e:any) {
    console.log(e);
  }
}