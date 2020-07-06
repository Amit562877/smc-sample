import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MhistoryComponent } from './components/mhistory/mhistory.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'history',
    component: MhistoryComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
