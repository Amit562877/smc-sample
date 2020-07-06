import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { StudyLevelComponent } from './components/study-level/study-level.component';
import { UniversityFormMappingsListComponent } from './components/university-form-mappings-list/university-form-mappings-list.component';
import { UniversityFormMappingsComponent } from './components/university-form-mappings/university-form-mappings.component';
import { UniversityFormMappingsPreviewComponent } from './components/university-form-mappings-preview/university-form-mappings-preview.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
// import { AssignPermissionService } from 'src/app/shared/services/assign-permission.service';

const routes: Routes = [
  {
    path: 'managediscipline',
    component: DisciplineComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'managestudylevel',
    component: StudyLevelComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'university-form-mapping',
    component: UniversityFormMappingsListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pdf-university-form-mapping/:masterid',
    component: UniversityFormMappingsComponent,

  },
  {
    path: 'pdf-university-form-mapping-preview/:masterid',
    component: UniversityFormMappingsPreviewComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingsRoutingModule { }
