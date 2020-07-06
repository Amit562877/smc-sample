import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MstudylevelComponent } from './components/mstudylevel/mstudylevel.component';
import { McurrencyComponent } from './components/mcurrency/mcurrency.component';
import { MdisciplineComponent } from './components/mdiscipline/mdiscipline.component';
import { MapCurrencyComponent } from './components/map-currency/map-currency.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
import { McampuslocationComponent } from './components/mcampuslocation/mcampuslocation.component';


const routes: Routes = [
  {
    path: 'manage-studylevel',
    component: MstudylevelComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-currency',
    component: McurrencyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-discipline',
    component: MdisciplineComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-country',
    component: MapCurrencyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-university',
    component: McampuslocationComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
