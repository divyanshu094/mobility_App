import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonserviceService } from '../services/commonservice.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  user_id: string = "";
  documents: any = [];
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService, public popoverCtrl: PopoverController) { }

  ngOnInit() {
    var user = JSON.parse(localStorage["user_detail"]);
    this.user_id = user.id;
    this.getDocuments();
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

  delete(data: any) {

  }
}
