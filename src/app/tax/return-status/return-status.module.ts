import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnStatusPageRoutingModule } from './return-status-routing.module';

import { ReturnStatusPage } from './return-status.page';

import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnStatusPageRoutingModule,
    AllImportModule
  ],
  declarations: [ReturnStatusPage]
})
export class ReturnStatusPageModule {}
