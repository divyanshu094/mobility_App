import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelCalPageRoutingModule } from './travel-cal-routing.module';

import { TravelCalPage } from './travel-cal.page';

import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelCalPageRoutingModule,
    AllImportModule
  ],
  declarations: [TravelCalPage]
})
export class TravelCalPageModule {}
