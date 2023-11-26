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
    this.user = JSON.parse(localStorage["user_detail"]);
    // this.user_id = this.route.snapshot.paramMap.get("id");
    this.user_id=this.user.id;
    this.getTimeline();
    // this.timeline = [
    //   {
    //     "name": "Call with Tax Expert",
    //     "status": "Done",
    //     "completed": true,
    //     "date": "2023-10-13T19:58:32.425716",
    //     "doc_name": "",
    //     "file": ""
    //   },
    //   {
    //     "name": "Engagement Letter",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "Engagement Letter",
    //     "file": [
    //       {
    //         "id": 791,
    //         "created_date": "2023-11-20T16:11:25.571625",
    //         "updated_date": "2023-11-20T16:11:25.571648",
    //         "status": false,
    //         "file": "https://mobilitybackend.s3.amazonaws.com/dev/master/logo_xsLgJXR.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4EDEFENEFXLNB6DX%2F20231125%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231125T160014Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=58a308a24e3b6f15a2779215528d879e1ef7ccc0b7e0a54bd6fa18b9479eae33",
    //         "title": "Engagement Letter",
    //         "description": null,
    //         "is_deleted": false,
    //         "user": 185
    //       }
    //     ]
    //   },
    //   {
    //     "name": "Tax Organizer",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "Organizer",
    //     "file": []
    //   },
    //   {
    //     "name": "Tax Return Preparation",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "Tax Return",
    //     "file": []
    //   },
    //   {
    //     "name": "Tax Return Review",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "Review Points",
    //     "file": []
    //   },
    //   {
    //     "name": "Sent for Client Review",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "Final return",
    //     "file": []
    //   },
    //   {
    //     "name": "Return Finalized",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "Client Approval",
    //     "file": []
    //   },
    //   {
    //     "name": "e-file Return",
    //     "status": "Awaited",
    //     "completed": false,
    //     "date": null,
    //     "doc_name": "E-File Report",
    //     "file": []
    //   }
    // ]
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

}
