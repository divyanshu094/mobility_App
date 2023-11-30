import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  @Output() pageChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }

  next(){
    this.pageChange.emit("next");
  }

}
