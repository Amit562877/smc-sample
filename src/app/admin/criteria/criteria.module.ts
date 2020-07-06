import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriteriaRoutingModule } from './criteria-routing.module';
import { CourseCriteriaComponent } from './components/course-criteria/course-criteria.component';
import { CourseCriteriaListComponent } from './components/course-criteria-list/course-criteria-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CourseCriteriaComponent,
    CourseCriteriaListComponent,
  ],
  imports: [
    CommonModule,
    CriteriaRoutingModule,
    SharedModule
  ]
})
export class CriteriaModule { }
