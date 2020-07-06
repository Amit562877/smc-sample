import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseIssueComponent } from './components/course-issue/course-issue.component';
import { CourseIssueEditComponent } from './components/course-issue-edit/course-issue-edit.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
import { CustomAuthGuardService } from 'src/app/auth/services/guards/customauth-guard.service';

const routes: Routes = [
  {
    path: 'course-issue',
    component: CourseIssueComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'course-issue/edit-course-issue/:courseid',
    component: CourseIssueEditComponent,
    canActivate: [CustomAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseissueRoutingModule { }
