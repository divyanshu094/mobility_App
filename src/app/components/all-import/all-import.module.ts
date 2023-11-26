import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { BackHeaderComponent } from '../back-header/back-header.component';

@NgModule({
  declarations: [HeaderComponent,BackHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    BackHeaderComponent
  ]
})
export class AllImportModule { }
