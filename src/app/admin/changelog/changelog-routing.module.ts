import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { ChangelogResponseComponent } from './components/changelog-response/changelog-response.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'change-log',
    component: ChangelogComponent,
    canActivate: [AuthGuardService],

  },
  {
    path: 'change-log-response/:logid/:changetype',
    component: ChangelogResponseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangelogRoutingModule { }
