import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-business-income',
  templateUrl: './business-income.component.html',
  styleUrls: ['./business-income.component.scss'],
})
export class BusinessIncomeComponent  implements OnInit {
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
