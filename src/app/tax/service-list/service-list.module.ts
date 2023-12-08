import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceListPageRoutingModule } from './service-list-routing.module';

import { ServiceListPage } from './service-list.page';
import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceListPageRoutingModule,
    AllImportModule
  ],
  declarations: [ServiceListPage]
})
export class ServiceListPageModule {}
