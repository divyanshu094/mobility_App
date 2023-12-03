import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpaDashboardPage } from './cpa-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CpaDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpaDashboardPageRoutingModule {}
