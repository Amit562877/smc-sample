import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseissueRoutingModule } from './courseissue-routing.module';
import { CourseIssueComponent } from './components/course-issue/course-issue.component';
import { CourseIssueEditComponent } from './components/course-issue-edit/course-issue-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CourseIssueComponent,
    CourseIssueEditComponent,
  ],
  imports: [
    CommonModule,
    CourseissueRoutingModule,
    SharedModule
  ]
})
export class CourseissueModule { }
