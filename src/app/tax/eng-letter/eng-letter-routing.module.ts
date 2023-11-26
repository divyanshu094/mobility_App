import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngLetterPage } from './eng-letter.page';

const routes: Routes = [
  {
    path: '',
    component: EngLetterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngLetterPageRoutingModule {}
