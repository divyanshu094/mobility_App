import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleCallPage } from './schedule-call.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleCallPageRoutingModule {}
