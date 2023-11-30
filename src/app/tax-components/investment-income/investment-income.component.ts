import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-investment-income',
  templateUrl: './investment-income.component.html',
  styleUrls: ['./investment-income.component.scss'],
})
export class InvestmentIncomeComponent  implements OnInit {

  @Output() pageChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }

  next() {
    // this.pageChange.emit("next");
  }

  prev() {
    this.pageChange.emit("prev");
  }

}
