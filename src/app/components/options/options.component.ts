import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent  implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() {}

  edit() {
    this.popover.dismiss("edit");
  }

  delete() {
    this.popover.dismiss("del");
  }

}
