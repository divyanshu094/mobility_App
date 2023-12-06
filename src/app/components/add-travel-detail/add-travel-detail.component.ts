import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-add-travel-detail',
  templateUrl: './add-travel-detail.component.html',
  styleUrls: ['./add-travel-detail.component.scss'],
})
export class AddTravelDetailComponent implements OnInit {
  countryList: any;
  fromStateList: any = [];
  toStateList: any = [];
  assignmentTypeArr: any;
  fromCountry: any;
  fromState: any;
  toCountry: any;
  toState: any;
  start_date: any;
  end_date: any;
  assignment_type: any;
  remark: any;

  constructor(private apiService: ApiserviceService, private commonService: CommonserviceService, private modalCtrl: ModalController, public datepipe: DatePipe) { }

  ngOnInit() {
    // this.getCountry();
    this.getAssignmentType();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  getCountry() {
    this.apiService.requestViaGet('/superadmin/country/').then(
      (result: any) => {
        if (result.status) {
          this.countryList = result.results;
        } else {
          this.commonService.showError("Alert", "No Record Found");
        }
      },
      (error) => {
      }
    );
  }

  getStates(id: any, type: any) {
    this.apiService.requestViaGet('/superadmin/state_by_country/' + id + '/').then(
      (result: any) => {
        if (result.status) {
          if (type == "from") {
            this.fromStateList = [];
            this.fromStateList = result.results;
          } else {
            this.toStateList = [];
            this.toStateList = result.results;
          }
        } else {
          this.commonService.showError("Alert", "No Record Found");
        }
      },
      (error) => {
      }
    );
  }

  getAssignmentType() {
    this.apiService.requestViaGet('/superadmin/assignment_type/').then(
      (result: any) => {
        if (result.status) {
          this.assignmentTypeArr = result.results;
          this.getCountry();
        }
      }, (err) => {
      }
    );
  }

  addDetails() {
    if (!this.fromCountry) {
      this.commonService.showAlert("Alert", "Please select from country");
      return;
    } else if (!this.fromState) {
      this.commonService.showAlert("Alert", "Please select from state");
      return;
    } else if (!this.toCountry) {
      this.commonService.showAlert("Alert", "Please select to country");
      return;
    } else if (!this.toState) {
      this.commonService.showAlert("Alert", "Please select to state");
      return;
    } else if (!this.start_date) {
      this.commonService.showAlert("Alert", "Please select start date");
      return;
    } else if (!this.end_date) {
      this.commonService.showAlert("Alert", "Please select end date");
      return;
    } else if (!this.assignment_type) {
      this.commonService.showAlert("Alert", "Please select assignment type");
      return;
    }

    var post_json = {
      "from_date": this.datepipe.transform(this.start_date, 'yyyy-MM-dd'),
      "to_date": this.datepipe.transform(this.end_date, 'yyyy-MM-dd'),
      "source_city": this.fromState,
      "destination_city": this.toState,
      "remark": this.remark,
      "source_country": this.fromCountry,
      "destination_country": this.toCountry,
      "assignment_type": this.assignment_type
    }
    this.apiService.requestViaPost('/employee/calendar_event/', post_json).then(
      (result: any) => {
        if (result.status) {
          this.cancel();
          this.commonService.showSuccess("Success", result.message);
        } else {
          this.commonService.showError("Alert", result.message);
        }
      },
      (error) => {
      }
    );

  }
}
