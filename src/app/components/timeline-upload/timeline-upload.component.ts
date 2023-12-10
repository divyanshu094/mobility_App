import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-timeline-upload',
  templateUrl: './timeline-upload.component.html',
  styleUrls: ['./timeline-upload.component.scss'],
})
export class TimelineUploadComponent implements OnInit {
  @Input() step: any;
  @Input() doc_name: any;
  @Input() id: any;
  @Input() row_id: any;
  @Input() status: any;
  prepared_attachment: any = [];
  remark: any;
  constructor(private router: Router, private apiService: ApiserviceService, private commonService: CommonserviceService, private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  chooseFile = async () => {
    this.commonService.uploadPiture().then((file: any) => {
      this.prepared_attachment.push(file)
    });
  };

  removeFile(index:number){
    this.prepared_attachment.splice(index,1);
  }

  action() {
    if(!this.remark){
      this.commonService.showAlert("Alert", "Please enter comment");
      return;
    }

    if (this.step.name == 'e-file Return') {
      this.uploadFinalReturn();
    } else if (localStorage.getItem("current_role") == "cpa") {
      this.uploadPreparedReturn();
    } else if (localStorage.getItem("current_role") == "reviewer") {
      this.uploadReturnReviewer();
    } else {
      if (this.doc_name == 'Engagement Letter') {
        this.uploadEngLetter();
      } else {
        this.userSubmit();
      }
    }
  }

  uploadFinalReturn() {
    if (this.prepared_attachment.length < 1 && this.status) {
      this.commonService.showAlert("Alert", "Please attach document");
      return;
    }
    var postdata = {
      "tax_id": this.id,
      "status": this.status,
      "comment": this.remark,
      "e_filed_attachment_file": this.prepared_attachment
    }
    this.apiService.requestViaPost('/website/e_filed_submitted_tax/', postdata).then(
      (result: any) => {
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess("Success", result.message);
        } else {
          this.commonService.showAlert("Alert", result.message);
        }
      },
      (error) => {
      }
    );
  }

  uploadPreparedReturn() {
    if (this.prepared_attachment.length < 1 && this.status) {
      this.commonService.showAlert("Alert", "Please attach document");
      return;
    }
    for (let i = 0; i < this.step.file.length; i++) {
      this.prepared_attachment.push(this.step.file[i].id)
    }
    var postdata = {
      "tax_id": this.id,
      "status": this.status,
      "comment": this.remark,
      "attachment_file": this.prepared_attachment,
      "tax_return_pdf": []
    }
    this.apiService.requestViaPost('/website/upload_taxreturn_completed/', postdata).then(
      (result: any) => {
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess("Success", result.message);
        } else {
          this.commonService.showAlert("Alert", result.message);
        }
      },
      (error) => {
      }
    );
  }

  uploadReturnReviewer() {
    if (this.prepared_attachment.length < 1 && this.status) {
      this.commonService.showAlert("Alert", "Please attach document");
      return;
    }

    for (let i = 0; i < this.step.file.length; i++) {
      this.prepared_attachment.push(this.step.file[i].id)
    }

    var postdata = {
      "tax_id": this.id,
      "status": this.status,
      "tax_completed_by_cpa_id": this.row_id,
      "comment": this.remark,
      "reviewer_attachment_file": this.prepared_attachment,
      "reviewer_tax_return_pdf": []
    }

    this.apiService.requestViaPost('/website/reviewer_upload_taxreturn_completed/', postdata).then(
      (result: any) => {
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess("Success", result.message);
        } else {
          this.commonService.showAlert("Alert", result.message);
        }
      },
      (error) => {
      }
    );
  }

  userSubmit() {
    if (this.prepared_attachment.length < 1 && this.status) {
      this.commonService.showAlert("Alert", "Please attach document");
      return;
    }
    var postdata = {
      "tax_id": this.id,
      "tax_user_comment": this.remark,
      "user_attachment_file": this.prepared_attachment,
      "status": this.status
    }
    this.apiService.requestViaPost('/website/user_update_status_for_submitted_tax/', postdata).then(
      (result: any) => {
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess("Success", result.message);
        } else {
          this.commonService.showAlert("Alert", result.message);
        }
      },
      (error) => {
      }
    );
  }

  uploadEngLetter() {
    if (this.prepared_attachment.length < 1) {
      this.commonService.showAlert("Alert", "Please attach document");
      return;
    }
    var postdata = {
      "year": this.row_id,
      "attachment_atached_by_user": this.prepared_attachment[0],
    }
    this.apiService.requestViaPost('/website/user_upload_engagement_letter/', postdata).then(
      (result: any) => {
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess("Success", result.message);
        } else {
          this.commonService.showAlert("Alert", result.message);
        }
      },
      (error) => {
      }
    );
  }

}
