import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDashboardPageRoutingModule } from './user-dashboard-routing.module';

import { UserDashboardPage } from './user-dashboard.page';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { HeaderComponent } from '../../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDashboardPageRoutingModule,
    RoundProgressModule
  ],
  declarations: [UserDashboardPage,HeaderComponent]
})
export class UserDashboardPageModule {}
