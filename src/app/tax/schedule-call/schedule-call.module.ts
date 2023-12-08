import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleCallPageRoutingModule } from './schedule-call-routing.module';

import { ScheduleCallPage } from './schedule-call.page';
import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleCallPageRoutingModule,
    AllImportModule
  ],
  declarations: [ScheduleCallPage]
})
export class ScheduleCallPageModule {}
