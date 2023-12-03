import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpaDashboardPageRoutingModule } from './cpa-dashboard-routing.module';

import { CpaDashboardPage } from './cpa-dashboard.page';
import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpaDashboardPageRoutingModule,
    AllImportModule
  ],
  declarations: [CpaDashboardPage]
})
export class CpaDashboardPageModule {}
