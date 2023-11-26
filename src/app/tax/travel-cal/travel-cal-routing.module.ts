import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelCalPage } from './travel-cal.page';

const routes: Routes = [
  {
    path: '',
    component: TravelCalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelCalPageRoutingModule {}
