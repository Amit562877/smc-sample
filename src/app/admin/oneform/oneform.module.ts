import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OneformRoutingModule } from './oneform-routing.module';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ExternalFormMappingComponent } from './components/external-form-mapping/external-form-mapping.component';
import { UnivOneFormComponent } from './components/univ-one-form/univ-one-form.component';
import { ExternalApplicationFormComponent } from './components/external-application-form/external-application-form.component';
import { ManageOneformComponent } from './components/manage-oneform/manage-oneform.component';
import { ManageCoursePreferenceComponent } from './components/manage-course-preference/manage-course-preference.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';


@NgModule({
  declarations: [
    ConditionsComponent,
    ExternalFormMappingComponent,
    UnivOneFormComponent,
    ExternalApplicationFormComponent,
    ManageOneformComponent,
    ManageCoursePreferenceComponent,
    ViewApplicationsComponent,
  ],
  imports: [
    CommonModule,
    OneformRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class OneformModule { }
