import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-cpa-dashboard',
  templateUrl: './cpa-dashboard.page.html',
  styleUrls: ['./cpa-dashboard.page.scss'],
})
export class CpaDashboardPage implements OnInit {
  items: any = [];
  search: string="";
  year: string="2023";
  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService) { }

  ngOnInit() {
    this.getDashboarCounts();
  }

  getDashboarCounts() {
    this.search = "";
    this.apiService.requestViaGet('/website/get_tax_dashboard_report_count/?year=' + this.year).then(
      (result: any) => {
        if (result.status) {
          // this.dashboard_counts = result.results;
          var value_arr: any = [];
          if (sessionStorage["current_role"] == "cpa") {
            value_arr = [{
              'name': "Total Tax Returns",
              'count':result.results.total_tax_returns
            }, {
              'name': "Consulting Call",
              'count':result.results.consulting_call
            }, {
              'name': "Organizer Submitted",
              'count':result.results.organizer_submitted
            }, {
              'name': "Returns Prepared",
              'count':result.results.tax_completed
            }, {
              'name': "Under Client Review",
              'count':result.results.under_client_review
            }, {
              'name': "Returns e-Filed",
              'count':result.results.returns_e_field
            }, {
              'name': "Assigned Task",
              'count':result.results.my_assigned_task
            }, {
              'name': "My Returns",
              'count':result.results.my_taken_wonership
            }, {
              'name': "In Progress",
              'count':result.results.total_tax_returns_progress
            }];
          }else{
            value_arr = [{
              'name': "Total Tax Returns",
              'count':result.results.total_tax_returns
            }, {
              'name': "Organizer Submitted",
              'count':result.results.organizer_submitted
            }, {
              'name': "Returns Prepared",
              'count':result.results.tax_completed
            }, {
              'name': "Under Client Review",
              'count':result.results.under_client_review
            }, {
              'name': "Returns e-Filed",
              'count':result.results.returns_e_field
            }, {
              'name': "Assigned Task",
              'count':result.results.my_assigned_task
            }, {
              'name': "My Returns",
              'count':result.results.my_taken_wonership
            }, {
              'name': "In Progress",
              'count':result.results.total_tax_returns_progress
            }];
          }
          this.items = value_arr;
        }
      },
      (error) => {
      }
    );
  }

}
