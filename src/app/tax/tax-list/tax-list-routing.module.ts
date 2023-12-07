import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxListPage } from './tax-list.page';

const routes: Routes = [
  {
    path: '',
    component: TaxListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxListPageRoutingModule {}
