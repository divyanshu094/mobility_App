import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  year: string="2023";
  user_id: any;
  constructor(private route: ActivatedRoute, private router: Router,private apiService: ApiserviceService, private commonService: CommonserviceService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage["user_detail"]);
    // this.user_id = this.route.snapshot.paramMap.get("id");
    this.user_id=this.user.id;
    this.getTimeline();
  }

  getTimeline() {
    this.apiService.requestViaGet('/website/user_get_tax_timeline_status/?year=' + this.year + '&user_id=' + this.user_id).then(
      (result: any) => {
        if (result.status) {
          this.timeline = result.results.tax_user_timeline;
          // this.client_name = result.results.first_name + ' ' + result.results.last_name
          // this.tax_id = result.results.user_tax_status[0].tax_return;
          // this.f_name = result.results.first_name;
          // this.l_name = result.results.last_name;
          // this.client_email = result.results.email;
          // this.profile_pic = result.results.profile?.photo.file;
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
    if (sessionStorage.getItem("current_role") == "cpa" && (step == 'Tax Return Preparation') && this.timeline[index - 1].completed) {
      return true;
    } else if (sessionStorage.getItem("current_role") == "reviewer" && (step == 'Tax Return Review') && this.timeline[index - 1].completed) {
      return true;
    } else {
      return false;
    }
  }

  gotoPage(name:any) {
    var url = ''
    if (name.toLowerCase() == 'call with tax expert') {
      url = '/schedule-call'
    } else if (name.toLowerCase() == 'engagement letter') {
      url = '/eng-letter'
    } else if (name.toLowerCase() == 'tax organizer') {
      url = '/organizer'
    }
    if (url)
      this.router.navigate([url]);
  }

}
