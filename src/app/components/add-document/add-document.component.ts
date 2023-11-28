import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})
export class AddDocumentComponent  implements OnInit {
  doc_name:any="";
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService, private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  uploadFiles() {

    if (!this.doc_name) {
      this.commonService.showAlert("Alert", "Please enter document name");
      return;
    // } else if (!this.pic) {
    //   this.commonService.showAlert("Alert", "Please select file");
    //   return;
    }

    // var user_id = JSON.parse(localStorage.getItem("user_detail")).id;
    const formData = new FormData()
    // formData.append('file', this.pic);
    formData.append('title', this.doc_name);
    // formData.append('user', user_id);
    this.apiService.requestViaPost('/employee/master_document/', formData).then((result: any) => {
      console.log(result);
      if (result.status) {
        this.commonService.showSuccess("Success", "Document uploded successfully!")
        this.cancel();
      }
    },
      error => {
        console.log(error.error)
        this.commonService.showError("Alert", error.error);
      }
    );
  }
}
