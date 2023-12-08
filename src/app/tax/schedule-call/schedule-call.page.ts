import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-call',
  templateUrl: './schedule-call.page.html',
  styleUrls: ['./schedule-call.page.scss'],
})
export class ScheduleCallPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const calendlyWidgetContainer:any = document.getElementById('calendly-widget-container');
    calendlyWidgetContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', "https://calendly.com/steve_rao/30min");
    iframe.setAttribute('style', 'min-width:320px;min-height:580px;');
    calendlyWidgetContainer.appendChild(iframe);
  }

}
