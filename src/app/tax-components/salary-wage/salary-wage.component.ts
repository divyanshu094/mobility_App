import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-salary-wage',
  templateUrl: './salary-wage.component.html',
  styleUrls: ['./salary-wage.component.scss'],
})
export class SalaryWageComponent  implements OnInit {

  @Output() pageChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }

  next() {
    this.pageChange.emit("next");
  }

  prev() {
    this.pageChange.emit("prev");
  }

}
