import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { ProfileSetupComponent } from './components/profile-setup/profile-setup.component';
import { AuthGuardService } from '../auth/services/guards/auth-guard.service';
import { WidgetsetupComponent } from './components/widgetsetup/widgetsetup.component';
import { CustomAuthGuardService } from '../auth/services/guards/customauth-guard.service';
import { LeadComponent } from './components/lead/lead.component';


const routes: Routes = [
  {
    path: 'workspace',
    component: HomeComponent,
    canActivate: [CustomAuthGuardService],
    children: [
      {
        path: 'mapping',
        loadChildren: () => import('../../app/admin/mappings/mappings.module').then(m => m.MappingsModule)
      },
      {
        path: 'rolepermission',
        loadChildren: () => import('../../app/admin/rolepermission/rolepermission.module').then(m => m.RolepermissionModule)
      },
      {
        path: 'manage',
        loadChildren: () => import('../../app/admin/manage/manage.module').then(m => m.ManageModule)
      },
      // {
      //   path: 'mchangelog',
      //   loadChildren: () => import('../../app/admin/changelog/changelog.module').then(m => m.ChangelogModule)
      // },
      {
        path: 'courseissue',
        loadChildren: () => import('../../app/admin/courseissue/courseissue.module').then(m => m.CourseissueModule)
      },
      {
        path: 'universityissue',
        loadChildren:() => import('../../app/admin/university/university.module').then(m => m.UniversityModule)
      },
      {
        path: 'criteria',
        loadChildren: () => import('../../app/admin/criteria/criteria.module').then(m => m.CriteriaModule)
      },
      {
        path: 'report-issue',
        loadChildren: () => import('../../app/admin/report-issue/report-issue.module').then(m => m.ReportIssueModule)
      },
      {
        path: 'oneform',
        loadChildren: () => import('../../app/admin/oneform/oneform.module').then(m => m.OneformModule)
      },
      {
        path: 'email',
        loadChildren: () => import('../../app/admin/internal-email/internal-email.module').then(m => m.InternalEmailModule)
      },
      {
        path: 'student',
        loadChildren: () => import('../../app/admin/student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'profile',
        component: ProfileSetupComponent
      },
      {
        path: 'widget',
        component: WidgetsetupComponent
      },
      {
        path: 'lead',
        component: LeadComponent
      },

    ],
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'profile',
    component: ProfileSetupComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'assessment/:pid/:aid',
    component: AssessmentFormComponent
  },
  {
    path: 'assessment/:pid/:aid/:secid',
    component: AssessmentFormComponent
  },
  {
    path: 'review-form/:flag/:aid/:uid',
    component: ReviewFormComponent
  },
  {
    path: 'review-form/:flag/:aid/:uid/:uname',
    component: ReviewFormComponent
  },
  { path: 'admin/report_issue', loadChildren: () => import('./report-issue/report-issue.module').then(m => m.ReportIssueModule) }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  // constructor(public assignPermission: AssignPermissionService) {
  //   console.log(this.assignPermission.getRoutePermission());
  // }
}