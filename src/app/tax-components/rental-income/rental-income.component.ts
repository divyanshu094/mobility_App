import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rental-income',
  templateUrl: './rental-income.component.html',
  styleUrls: ['./rental-income.component.scss'],
})
export class RentalIncomeComponent  implements OnInit {
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
