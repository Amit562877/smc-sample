import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageOneformComponent } from './components/manage-oneform/manage-oneform.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ExternalFormMappingComponent } from './components/external-form-mapping/external-form-mapping.component';
import { UnivOneFormComponent } from './components/univ-one-form/univ-one-form.component';
import { ManageCoursePreferenceComponent } from './components/manage-course-preference/manage-course-preference.component';
import { ExternalApplicationFormComponent } from './components/external-application-form/external-application-form.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';

const routes: Routes = [
  {
    path: 'manageOneform',
    component: ManageOneformComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'conditions',
    component: ConditionsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'external-form-mapping/:productid/:studylevelid',
    component: ExternalFormMappingComponent,
  },
  {
    path: 'univ-one-form',
    component: UnivOneFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-course-preference',
    component: ManageCoursePreferenceComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'external-application-form/:productid',
    component: ExternalApplicationFormComponent,
  },
  {
    path: 'view-applications',
    component: ViewApplicationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneformRoutingModule { }
