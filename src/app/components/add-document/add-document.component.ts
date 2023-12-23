import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})
export class AddDocumentComponent implements OnInit {
  @Input() data: any;
  doc_name: any = "";
  pic: any;
  user_id: any = '';
  isEdit:boolean=false;
  constructor(private apiService: ApiserviceService, public commonService: CommonserviceService, private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.data) {
      this.doc_name = this.data.title;
      const pathSegments = this.data.file.split('?')[0].split('/');
      var file_name = pathSegments[pathSegments.length - 1];
      this.pic={};
      this.pic.name = file_name
      this.isEdit=true;
    }
    this.user_id = JSON.parse(localStorage["user_detail"]).id;
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  takePicture = async () => {
    this.commonService.takePicture().then((file: any) => {
      this.pic = file
    });
  };

  uploadPiture = async () => {
    this.commonService.uploadPiture().then((file: any) => {
      this.pic = file
    });
  };

  removeFile() {
    this.pic = "";
  }

  action(){
    if(this.isEdit){
      this.updateDoc();
    }else{
        this.addFiles();
    }
  }

  addFiles() {

    if (!this.doc_name) {
      this.commonService.showAlert("Alert", "Please enter document name");
      return;
    } else if (!this.pic) {
      this.commonService.showAlert("Alert", "Please select file");
      return;
    }

    const formData = new FormData()
    formData.append('file', this.pic);
    formData.append('title', this.doc_name);
    formData.append('user', this.user_id);
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

  updateDoc() {
    var post_data = {
      "title": this.doc_name,
      "description":this.data.description
    }

    this.apiService.requestViaPatch('/employee/update_master_document/' + this.data.id + '/', post_data).then(
      (result: any) => {
        if (result.status) {
          this.commonService.showSuccess("Success", result.message);
          this.cancel();
        } else {
          this.commonService.showError("Error", result.error)
        }
      }, (err) => {

      }
    );
  }
}
