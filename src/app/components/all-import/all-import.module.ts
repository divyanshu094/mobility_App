import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { BackHeaderComponent } from '../back-header/back-header.component';
import { OtpComponent } from '../otp/otp.component';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { AddDocumentComponent } from '../add-document/add-document.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BackHeaderComponent,
    OtpComponent,
    ForgotPassComponent,
    AddDocumentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    BackHeaderComponent,
    OtpComponent,
    ForgotPassComponent,
    AddDocumentComponent
  ]
})
export class AllImportModule { }
