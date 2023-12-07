import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-cpa-dashboard',
  templateUrl: './cpa-dashboard.page.html',
  styleUrls: ['./cpa-dashboard.page.scss'],
})
export class CpaDashboardPage implements OnInit {
  items: any = [];
  search: string = "";
  year: any = "";
  years_arr: any = [];
  constructor(private router: Router, private apiService: ApiserviceService, private commonService: CommonserviceService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.getDashboarCounts();
    for (let i = new Date().getFullYear(); i > 2020; i--) {
      this.years_arr.push(i);
    }
  }

  getDashboarCounts() {
    this.apiService.requestViaGet('/website/get_tax_dashboard_report_count/?year=' + this.year).then(
      (result: any) => {
        if (result.status) {
          // this.dashboard_counts = result.results;
          var value_arr: any = [];
          if (sessionStorage["current_role"] == "cpa") {
            value_arr = [{
              'name': "Total Tax Returns",
              'count': result.results.total_tax_returns,
              'img': "./assets/icon/cpa_dash/total_returns.svg"
            }, {
              'name': "Consulting Call",
              'count': result.results.consulting_call,
              'img': "./assets/icon/cpa_dash/consulting_call.svg"
            }, {
              'name': "Organizer Submitted",
              'count': result.results.organizer_submitted,
              'img': "./assets/icon/cpa_dash/organizer_submitted.svg"
            }, {
              'name': "Returns Prepared",
              'count': result.results.tax_completed,
              'img': "./assets/icon/cpa_dash/return_prepared.svg"
            }, {
              'name': "Under Client Review",
              'count': result.results.under_client_review,
              'img': "./assets/icon/cpa_dash/under_client.svg"
            }, {
              'name': "Returns e-Filed",
              'count': result.results.returns_e_field,
              'img': "./assets/icon/cpa_dash/returns_efilled.svg"
            }, {
              'name': "Assigned Task",
              'count': result.results.my_assigned_task,
              'img': "./assets/icon/cpa_dash/assigned_task.svg"
            }, {
              'name': "My Returns",
              'count': result.results.my_taken_wonership,
              'img': "./assets/icon/cpa_dash/my_returns.svg"
            }, {
              'name': "In Progress",
              'count': result.results.total_tax_returns_progress,
              'img': "./assets/icon/cpa_dash/in_progress.svg"
            }];
          } else {
            value_arr = [{
              'name': "Total Tax Returns",
              'count': result.results.total_tax_returns,
              'img': "./assets/icon/cpa_dash/total_returns.svg"
            }, {
              'name': "Organizer Submitted",
              'count': result.results.organizer_submitted,
              'img': "./assets/icon/cpa_dash/organizer_submitted.svg"
            }, {
              'name': "Returns Prepared",
              'count': result.results.tax_completed,
              'img': "./assets/icon/cpa_dash/return_prepared.svg"
            }, {
              'name': "Under Client Review",
              'count': result.results.under_client_review,
              'img': "./assets/icon/cpa_dash/under_client.svg"
            }, {
              'name': "Returns e-Filed",
              'count': result.results.returns_e_field,
              'img': "./assets/icon/cpa_dash/returns_efilled.svg"
            }, {
              'name': "Assigned Task",
              'count': result.results.my_assigned_task,
              'img': "./assets/icon/cpa_dash/assigned_task.svg"
            }, {
              'name': "My Returns",
              'count': result.results.my_taken_wonership,
              'img': "./assets/icon/cpa_dash/my_returns.svg"
            }, {
              'name': "In Progress",
              'count': result.results.total_tax_returns_progress,
              'img': "./assets/icon/cpa_dash/in_progress.svg"
            }];
          }
          this.items = value_arr;
        }
      },
      (error) => {
      }
    );
  }

  gotoPage(item: any) {
    this.router.navigate(['/tax-list', item.name, this.year]);
  }

}
