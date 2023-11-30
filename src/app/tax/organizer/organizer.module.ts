import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizerPageRoutingModule } from './organizer-routing.module';

import { OrganizerPage } from './organizer.page';
import { AllImportModule } from 'src/app/components/all-import/all-import.module';
import { PersonalInfoComponent } from 'src/app/tax-components/personal-info/personal-info.component';
import { InvestmentIncomeComponent } from 'src/app/tax-components/investment-income/investment-income.component';
import { DirectDepositeComponent } from 'src/app/tax-components/direct-deposite/direct-deposite.component';
import { EstimatedTaxComponent } from 'src/app/tax-components/estimated-tax/estimated-tax.component';
import { SalaryWageComponent } from 'src/app/tax-components/salary-wage/salary-wage.component';
import { PensionIncomeComponent } from 'src/app/tax-components/pension-income/pension-income.component';
import { BusinessIncomeComponent } from 'src/app/tax-components/business-income/business-income.component';
import { RentalIncomeComponent } from 'src/app/tax-components/rental-income/rental-income.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizerPageRoutingModule,
    AllImportModule
  ],
  declarations: [
    OrganizerPage, 
    PersonalInfoComponent, 
    DirectDepositeComponent, 
    EstimatedTaxComponent, 
    SalaryWageComponent, 
    InvestmentIncomeComponent,
    PensionIncomeComponent,
    BusinessIncomeComponent,
    RentalIncomeComponent
  ]
})
export class OrganizerPageModule { }
