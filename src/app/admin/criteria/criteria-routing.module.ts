import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCriteriaListComponent } from './components/course-criteria-list/course-criteria-list.component';
import { CourseCriteriaComponent } from './components/course-criteria/course-criteria.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
import { CustomAuthGuardService } from 'src/app/auth/services/guards/customauth-guard.service';

const routes: Routes = [
  {
    path: 'course-criteria',
    component: CourseCriteriaListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'course-criteria-manage',
    component: CourseCriteriaComponent,
    canActivate: [CustomAuthGuardService],
  },
  {
    path: 'course-criteria-manage/:criteriaid',
    component: CourseCriteriaComponent,
    canActivate: [CustomAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriteriaRoutingModule { }
