import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalEmailRoutingModule { }
