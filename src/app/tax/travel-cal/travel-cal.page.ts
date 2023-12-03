import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-travel-cal',
  templateUrl: './travel-cal.page.html',
  styleUrls: ['./travel-cal.page.scss'],
})
export class TravelCalPage implements OnInit {
  public namesOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  days: any = [];
  viewMonth: number = 0;
  mnthName: string = "";
  calender_Events: any = [];
  calEvents: any = [];
  user: any;
  year: any = ""
  constructor(private apiService: ApiserviceService, public commonService: CommonserviceService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage["user_detail"]);
    this.getTravelEvents();
  }

  getTravelEvents() {
    this.apiService.requestViaGet('/employee/calendar_event/?user_id=' + this.user.id).then(
      (result: any) => {
        if (result.status) {
          this.calender_Events = result.results;
          this.renderCalender(new Date());
        }
      },
      (error) => {
      }
    );
  }

  nextMonth() {
    var nxtMnth: any = this.viewMonth + 2;

    if (nxtMnth > 12) {
      nxtMnth = 1;
      this.year++;
    }
    if (nxtMnth < 10) {
      nxtMnth = '0' + nxtMnth;
    }
    var date = nxtMnth + '/01/' + this.year;
    this.renderCalender(new Date(date))
  }

  previousMonth() {
    var preMnth: any = this.viewMonth;
    if (preMnth == 0) {
      preMnth = 12;
      this.year--;
    }
    if (preMnth < 10) {
      preMnth = '0' + preMnth;
    }
    var date = preMnth + '/01/' + this.year;
    this.renderCalender(new Date(date))
  }

  renderCalender(date:any) {
    //var htmlContent = "";
    this.days = [];
    var FebNumberOfDays: any = 28;
    var counter = 1;
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var cyear = currentDate.getFullYear();

    var dateNew = new Date(date);
    var month = dateNew.getMonth();
    var day = dateNew.getDate();
    var year = dateNew.getFullYear();

    var nextMonth = month + 1;
    var prevMonth = month - 1;

    if (year == cyear && month == currentMonth) {
      day = currentDate.getDate();
    }

    if (month == 1) {
      if ((year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0)) {
        FebNumberOfDays = 29;
      } else {
        FebNumberOfDays = 28;
      }
    }


    var dayPerMonth = ["31", "" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
    var nextDate = new Date(nextMonth + ' 1 ,' + year);
    var weekdays = nextDate.getDay();
    //  var weekdays2 = weekdays;
    var numOfDays: any = dayPerMonth[month];

    this.viewMonth = month;
    this.mnthName = this.monthNames[month];
    this.year = year;

    while (weekdays > 1) {
      this.days.push('');
      weekdays--;
    }
    var items = ['W', 'P', 'H']
    for (let i = 1; i <= numOfDays; i++) {
      var randomdate: any = new Date(year, month, i, 0, 0, 0, 0).getTime();
      var item = [];
      item = this.calender_Events.filter((x: { from_date: string | number | Date; to_date: string | number | Date; }) => (new Date(x.from_date).getTime() <= randomdate + 20000000) && (new Date(x.to_date).getTime() >= randomdate));
      var isweekend = false;
      if (new Date(randomdate).getDay() == 6 || new Date(randomdate).getDay() == 0) {
        isweekend = true;
      }
      if (i == day && month == currentMonth && year == cyear) {
        var json = {
          'date': i,
          'isToday': true,
          'event': item,
          'isweekend': isweekend
        }
      } else {

        var json = {
          'date': i,
          'isToday': false,
          'event': item,
          'isweekend': isweekend
        }
      }

      this.days.push(json);
      counter++;
    }
  }


  viewEvents(data:any) {
    if (data && data.event.length > 0) {
      // $('.calBtn').trigger('click');
      this.calEvents = data.event;
    }
  }

  getActivity(event: any, type: any) {
    // console.log('event is as ::::', event)
    if (type == 'activity') {
      if (event[0].assignment_type.assigment_name)
        return event[0].assignment_type.assigment_name.charAt(0)
      return ''
    }
    else if (type == 'location')
      return event[event.length - 1].city_name
    else
      return ''
  }
}
