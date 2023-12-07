import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaxListPageRoutingModule } from './tax-list-routing.module';

import { TaxListPage } from './tax-list.page';
import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaxListPageRoutingModule,
    AllImportModule
  ],
  declarations: [TaxListPage]
})
export class TaxListPageModule {}
