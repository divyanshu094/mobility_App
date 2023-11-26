import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaultPageRoutingModule } from './vault-routing.module';

import { VaultPage } from './vault.page';

import { AllImportModule } from 'src/app/components/all-import/all-import.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaultPageRoutingModule,
    AllImportModule
  ],
  declarations: [VaultPage]
})
export class VaultPageModule {}
