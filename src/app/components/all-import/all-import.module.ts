import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { BackHeaderComponent } from '../back-header/back-header.component';
import { OtpComponent } from '../otp/otp.component';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';


@NgModule({
  declarations: [HeaderComponent, BackHeaderComponent, OtpComponent, ForgotPassComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    BackHeaderComponent,
    OtpComponent,
    ForgotPassComponent
  ]
})
export class AllImportModule { }
