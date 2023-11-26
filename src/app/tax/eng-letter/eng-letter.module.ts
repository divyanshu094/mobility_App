import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngLetterPageRoutingModule } from './eng-letter-routing.module';

import { EngLetterPage } from './eng-letter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EngLetterPageRoutingModule
  ],
  declarations: [EngLetterPage]
})
export class EngLetterPageModule {}
