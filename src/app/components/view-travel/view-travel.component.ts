import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.scss'],
})
export class ViewTravelComponent implements OnInit {
  @Input() calender_Events: any;
  constructor() { }

  ngOnInit() { 
    console.log(this.calender_Events);
    
  }

}
