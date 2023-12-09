import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { BackHeaderComponent } from '../back-header/back-header.component';
import { OtpComponent } from '../otp/otp.component';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { StepperComponent } from '../stepper/stepper.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AmountFormatDirective } from 'src/app/directive/amount/amount-format.directive';
import { AddTravelDetailComponent } from '../add-travel-detail/add-travel-detail.component';
import { TimelineUploadComponent } from '../timeline-upload/timeline-upload.component';
import { OptionsComponent } from '../options/options.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BackHeaderComponent,
    OtpComponent,
    ForgotPassComponent,
    AddDocumentComponent,
    StepperComponent,
    AmountFormatDirective,
    AddTravelDetailComponent,
    TimelineUploadComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule
  ],
  exports: [
    HeaderComponent,
    BackHeaderComponent,
    OtpComponent,
    ForgotPassComponent,
    AddDocumentComponent,
    StepperComponent,
    MatDatepickerModule,
    AmountFormatDirective,
    AddTravelDetailComponent,
    TimelineUploadComponent,
    OptionsComponent
  ]
})
export class AllImportModule { }
