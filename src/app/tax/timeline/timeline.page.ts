import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TimelineUploadComponent } from 'src/app/components/timeline-upload/timeline-upload.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  timeline: any = [];
  imgArr: any = [];
  user: any;
  year: any = "";
  user_id: any;
  from: any = "";
  client_name: string = "";
  client_email: any;
  profile_pic: any;
  tax_id:any;
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiserviceService, public commonService: CommonserviceService, private modalCtrl: ModalController) {
    this.year = this.route.snapshot.paramMap.get("year");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
    this.from = this.route.snapshot.paramMap.get("from");
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage["user_detail"]);
    if (this.from != 'list') {
      this.user_id = this.user.id;
      this.year = new Date().getFullYear();
    }
    this.getTimeline();
  }

  getTimeline() {
    this.apiService.requestViaGet('/website/user_get_tax_timeline_status/?year=' + this.year + '&user_id=' + this.user_id).then(
      (result: any) => {
        if (result.status) {
          this.timeline = result.results.tax_user_timeline;
          this.client_name = result.results.first_name + ' ' + result.results.last_name
          this.tax_id = result.results.user_tax_status[0].tax_return;
          // this.f_name = result.results.first_name;
          // this.l_name = result.results.last_name;
          this.client_email = result.results.email;
          this.profile_pic = result.results.profile?.photo.file;
          this.imgArr = [{
            "img": "./assets/icon/call_with_expert.svg"
          }, {
            "img": "./assets/icon/eng_letter.svg"
          }, {
            "img": "./assets/icon/tax_organizer.svg"
          }, {
            "img": "./assets/icon/return_prep.svg"
          }, {
            "img": "./assets/icon/return_review.svg"
          }, {
            "img": "./assets/icon/client_review.svg"
          }, {
            "img": "./assets/icon/return_finalized.svg"
          }, {
            "img": "./assets/icon/eFile_return.svg"
          }]
        }
      },
      (error) => {
      }
    );
  }

  isVisible(step: any, index: any) {
    if (localStorage.getItem("current_role") == "cpa" && (step == 'Tax Return Preparation') && this.timeline[index - 1].completed) {
      return true;
    } else if (localStorage.getItem("current_role") == "reviewer" && (step == 'Tax Return Review') && this.timeline[index - 1].completed) {
      return true;
    } else {
      return false;
    }
  }

  gotoPage(name: any) {
    var url = ''
    if (name.toLowerCase() == 'call with tax expert') {
      url = '/schedule-call'
    } else if (name.toLowerCase() == 'engagement letter') {
      url = '/eng-letter'
    } else if (name.toLowerCase() == 'tax organizer') {
      url = '/organizer'
    }
    if (url && this.from != 'list')
      this.router.navigate([url]);
  }

  async uploadAttachment(step: any, doc_name: any, status: any) {
    const modal = await this.modalCtrl.create({
      component: TimelineUploadComponent,
      breakpoints: [0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass: 'otp-modal',
      componentProps: {
        step: step,
        doc_name: doc_name,
        status: status,
        "id": this.tax_id,
        // "row_id": this.row_id,
      }
    });
    await modal.present();
  }

}
