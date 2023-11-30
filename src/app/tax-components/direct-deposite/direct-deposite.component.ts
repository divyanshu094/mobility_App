import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-direct-deposite',
  templateUrl: './direct-deposite.component.html',
  styleUrls: ['./direct-deposite.component.scss'],
})
export class DirectDepositeComponent implements OnInit {
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
