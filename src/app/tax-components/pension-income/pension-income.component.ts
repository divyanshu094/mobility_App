import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pension-income',
  templateUrl: './pension-income.component.html',
  styleUrls: ['./pension-income.component.scss'],
})
export class PensionIncomeComponent  implements OnInit {

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
