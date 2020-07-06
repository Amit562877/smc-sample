import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';

import { MstudylevelComponent } from './components/mstudylevel/mstudylevel.component';
import { McurrencyComponent } from './components/mcurrency/mcurrency.component';
import { MdisciplineComponent } from './components/mdiscipline/mdiscipline.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MapCurrencyComponent } from './components/map-currency/map-currency.component';
import { McampuslocationComponent } from './components/mcampuslocation/mcampuslocation.component';

@NgModule({
  declarations: [
    MstudylevelComponent,
    McurrencyComponent,
    MdisciplineComponent,
    MapCurrencyComponent,
    McampuslocationComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    SharedModule
  ]
})
export class ManageModule { }
