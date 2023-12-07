import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.page.html',
  styleUrls: ['./tax-list.page.scss'],
})
export class TaxListPage implements OnInit {
  year: any = "";
  type: any = "";
  page: number = 1;
  returns: any = [];
  total_records: number = 0;
  search: any = "";
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiserviceService, public commonService: CommonserviceService) {
    this.year = this.route.snapshot.paramMap.get("year");
    this.type = this.route.snapshot.paramMap.get("type");
  }

  ngOnInit() {
    this.callApis();
  }

  callApis() {
    if (this.type == 'My Returns') {
      this.getMy();
    } else if (this.type == 'Assigned Task') {
      this.AssignedToMe();
    } else if (this.type == 'In Progress') {
      this.getInprogress();
    } else if (this.type == 'Returns Prepared') {
      this.getCompleted();
    } else if (this.type == 'Under Client Review') {
      this.getUnderClientReview();
    } else if (this.type == 'Returns e-Filed') {
      this.getReturnsFilled();
    } else if (this.type == 'Total Tax Returns') {
      this.getTotalTaxReturns();
    } else if (this.type == 'Consulting Call') {
      this.getConsultingCalls();
    } else if (this.type == 'Organizer Submitted') {
      this.getOrganizerSubmitted();
    }
  }

  loadData(event: any) {
    if (this.returns.length < this.total_records) {
      this.page++;
      this.callApis();
    }
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);
  }

  getMy() {
    this.apiService.requestViaGet('/website/my_taken_ownership/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { reviewer_data: { action_taken_by_reviewer: { first_name: string; last_name: string; }; }; tax_return: { id: any; user: { first_name: string; last_name: string; user_tax_status: { updated_date: any; }[]; id: any; tax_return_last_status: any; }; action_taken_by_on_tax: { first_name: string; last_name: string; }; }; }) => {
          var signer = "";
          if (element.reviewer_data.action_taken_by_reviewer?.first_name) {
            signer = element.reviewer_data.action_taken_by_reviewer?.first_name + ' ' + element.reviewer_data.action_taken_by_reviewer?.last_name;
          }
          var obj = {
            'id': element.tax_return.id,
            'client_name': element.tax_return.user.first_name + ' ' + element.tax_return.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.tax_return.user.user_tax_status[0].updated_date,
            'preparer': element.tax_return.action_taken_by_on_tax.first_name + ' ' + element.tax_return.action_taken_by_on_tax.last_name,
            'signer': signer,
            'user_id': element.tax_return.user.id,
            'status': element.tax_return.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  AssignedToMe() {
    this.apiService.requestViaGet('/website/my_assigned_task/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { reviewer_data: { action_taken_by_reviewer: { first_name: string; last_name: string; }; }; tax_return: { id: any; user: { first_name: string; last_name: string; user_tax_status: { updated_date: any; }[]; id: any; tax_return_last_status: any; }; action_taken_by_on_tax: { first_name: string; last_name: string; }; }; }) => {
          var signer = "";
          if (element.reviewer_data.action_taken_by_reviewer?.first_name) {
            signer = element.reviewer_data.action_taken_by_reviewer?.first_name + ' ' + element.reviewer_data.action_taken_by_reviewer?.last_name;
          }
          var obj = {
            'id': element.tax_return.id,
            'client_name': element.tax_return.user.first_name + ' ' + element.tax_return.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.tax_return.user.user_tax_status[0].updated_date,
            'preparer': element.tax_return.action_taken_by_on_tax.first_name + ' ' + element.tax_return.action_taken_by_on_tax.last_name,
            'signer': signer,
            'user_id': element.tax_return.user.id,
            'status': element.tax_return.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getInprogress() {
    this.apiService.requestViaGet('/website/total_tax_returns_progress/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { reviewer_data: { action_taken_by_reviewer: { first_name: string; last_name: string; }; }; tax_return: { id: any; user: { first_name: string; last_name: string; user_tax_status: { updated_date: any; }[]; id: any; tax_return_last_status: any; }; action_taken_by_on_tax: { first_name: string; last_name: string; }; }; }) => {
          var signer = "";
          if (element.reviewer_data.action_taken_by_reviewer?.first_name) {
            signer = element.reviewer_data.action_taken_by_reviewer?.first_name + ' ' + element.reviewer_data.action_taken_by_reviewer?.last_name;
          }
          var obj = {
            'id': element.tax_return.id,
            'client_name': element.tax_return.user.first_name + ' ' + element.tax_return.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.tax_return.user.user_tax_status[0].updated_date,
            'preparer': element.tax_return.action_taken_by_on_tax.first_name + ' ' + element.tax_return.action_taken_by_on_tax.last_name,
            'signer': signer,
            'user_id': element.tax_return.user.id,
            'status': element.tax_return.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getCompleted() {
    this.apiService.requestViaGet('/website/tax_completed/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { reviewer_data: { action_taken_by_reviewer: { first_name: string; last_name: string; }; }; tax_return: { id: any; user: { first_name: string; last_name: string; user_tax_status: { updated_date: any; }[]; id: any; tax_return_last_status: any; }; action_taken_by_on_tax: { first_name: string; last_name: string; }; }; }) => {
          var signer = "";
          if (element.reviewer_data.action_taken_by_reviewer?.first_name) {
            signer = element.reviewer_data.action_taken_by_reviewer?.first_name + ' ' + element.reviewer_data.action_taken_by_reviewer?.last_name;
          }
          var obj = {
            'id': element.tax_return.id,
            'client_name': element.tax_return.user.first_name + ' ' + element.tax_return.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.tax_return.user.user_tax_status[0].updated_date,
            'preparer': element.tax_return.action_taken_by_on_tax.first_name + ' ' + element.tax_return.action_taken_by_on_tax.last_name,
            'signer': signer,
            'user_id': element.tax_return.user.id,
            'status': element.tax_return.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getUnderClientReview() {
    this.apiService.requestViaGet('/website/under_client_review/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { action_taken_by_reviewer: { first_name: string; last_name: string; }; tax_return: { id: any; user: { first_name: string; last_name: string; user_tax_status: { updated_date: any; }[]; id: any; tax_return_last_status: any; }; action_taken_by_on_tax: { first_name: string; last_name: string; }; }; }) => {
          var signer = "";
          if (element.action_taken_by_reviewer?.first_name) {
            signer = element.action_taken_by_reviewer?.first_name + ' ' + element.action_taken_by_reviewer?.last_name;
          }
          var obj = {
            'id': element.tax_return.id,
            'client_name': element.tax_return.user.first_name + ' ' + element.tax_return.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.tax_return.user.user_tax_status[0].updated_date,
            'preparer': element.tax_return.action_taken_by_on_tax.first_name + ' ' + element.tax_return.action_taken_by_on_tax.last_name,
            'signer': signer,
            'user_id': element.tax_return.user.id,
            'status': element.tax_return.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getReturnsFilled() {
    this.apiService.requestViaGet('/website/returns_e_field/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { action_taken_by_reviewer: { first_name: string; last_name: string; }; tax_return: { id: any; user: { first_name: string; last_name: string; user_tax_status: { updated_date: any; }[]; id: any; tax_return_last_status: any; }; action_taken_by_on_tax: { first_name: string; last_name: string; }; }; }) => {
          var signer = "";
          if (element.action_taken_by_reviewer?.first_name) {
            signer = element.action_taken_by_reviewer?.first_name + ' ' + element.action_taken_by_reviewer?.last_name;
          }
          var obj = {
            'id': element.tax_return.id,
            'client_name': element.tax_return.user.first_name + ' ' + element.tax_return.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.tax_return.user.user_tax_status[0].updated_date,
            'preparer': element.tax_return.action_taken_by_on_tax.first_name + ' ' + element.tax_return.action_taken_by_on_tax.last_name,
            'signer': signer,
            'user_id': element.tax_return.user.id,
            'status': element.tax_return.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getConsultingCalls() {
    this.apiService.requestViaGet('/website/consulting_call/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { profile: any; first_name: string; last_name: string; id: any; tax_return_last_status: any; }) => {
          var signer = "";
          // if (element.action_taken_by_reviewer?.first_name) {
          //   signer = element.action_taken_by_reviewer?.first_name + ' ' + element.action_taken_by_reviewer?.last_name;
          // }
          var obj = {
            'client_name': element.first_name + ' ' + element.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.profile?.created_date,
            'preparer': '',
            'signer': signer,
            'user_id': element.id,
            'status': element.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getOrganizerSubmitted() {
    this.apiService.requestViaGet('/website/organizer_submitted/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: {
          base_data: any;
          user: any; profile: any; first_name: string; last_name: string; id: any; tax_return_last_status: any; 
}) => {
          var signer = "";
          // if (element.action_taken_by_reviewer?.first_name) {
          //   signer = element.action_taken_by_reviewer?.first_name + ' ' + element.action_taken_by_reviewer?.last_name;
          // }
          var obj = {
            'client_name': element.user.first_name + ' ' + element.user.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.base_data.created_date,
            'preparer': '',
            'signer': signer,
            'user_id': element.user.id,
            'status': element.user.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  getTotalTaxReturns() {
    this.apiService.requestViaGet('/website/total_tax_returns/?year=' + this.year + '&search=' + this.search + '&page=' + this.page).then(
      (result: any) => {
        // this.returns = [];
        this.total_records = result.count;
        result.results.forEach((element: { tax_organizer_working_directory: { action_taken_by: { last_name: string; }; }[]; user_tax_status: { updated_date: any; }[]; first_name: string; last_name: string; id: any; tax_return_last_status: any; }) => {
          var signer = "";
          // if (element.tax_organizer_working_directory[0]?.reviewer_data.action_taken_by_reviewer?.first_name) {
          //   signer = element.tax_organizer_working_directory[0]?.reviewer_data.action_taken_by_reviewer?.first_name + ' ' + element.tax_organizer_working_directory[0]?.reviewer_data.action_taken_by_reviewer?.last_name;
          // }
          var preparer = "";
          // if (element.tax_organizer_working_directory[0]?.action_taken_by.first_name) {
          //   preparer = element.tax_organizer_working_directory[0]?.action_taken_by.first_name + ' ' + element.tax_organizer_working_directory[0]?.action_taken_by.last_name;
          // }
          var obj = {
            // 'id': element.user_tax_status[0]?.tax_return,
            'client_name': element.first_name + ' ' + element.last_name,
            'tax_year': this.year,
            'return_type': '',
            'submitted_date': element.user_tax_status[0]?.updated_date,
            'preparer': preparer,
            'signer': signer,
            'user_id': element.id,
            'status': element.tax_return_last_status
          }

          this.returns.push(obj);
        })
      },
      (error) => {
      }
    );
  }

  openRecord(item: any) {
    this.router.navigate(['/timeline', item.user_id, this.year,'list']);
  }

}
