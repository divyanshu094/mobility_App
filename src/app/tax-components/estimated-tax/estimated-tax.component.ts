import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-estimated-tax',
  templateUrl: './estimated-tax.component.html',
  styleUrls: ['./estimated-tax.component.scss'],
})
export class EstimatedTaxComponent implements OnInit {
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
