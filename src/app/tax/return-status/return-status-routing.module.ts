import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnStatusPage } from './return-status.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnStatusPageRoutingModule {}
