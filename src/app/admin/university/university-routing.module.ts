import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversityissueComponent } from './components/universityissue/universityissue.component';
import {EdituniversityissueComponent} from './components/edituniversityissue/edituniversityissue.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { CustomAuthGuardService } from 'src/app/auth/services/guards/customauth-guard.service';

const routes: Routes = [
    {
      path: 'university-issue',
      component: UniversityissueComponent,
      canActivate: [AuthGuardService],
    },
    {
      path:'university-issue/edituniversityissue/:universityid',
      component:EdituniversityissueComponent,
      canActivate:[CustomAuthGuardService]

    }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UniversityRoutingModule { }
  