import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './components/permission/permission.component';
import { RolewisepermissionComponent } from './components/rolewisepermission/rolewisepermission.component';
import { AdvancePermissionComponent } from './components/advance-permission/advance-permission.component';
import { RoleComponent } from './components/role/role.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenupermissionComponent } from './components/menupermission/menupermission.component';
import { AuthGuardService } from 'src/app/auth/services/guards/auth-guard.service';
import { CustomAuthGuardService } from 'src/app/auth/services/guards/customauth-guard.service';

const routes: Routes = [
  {
    path: 'pemission',
    component: PermissionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'role-pemission/:roleid',
    component: RolewisepermissionComponent,
    canActivate: [CustomAuthGuardService],
  },
  // {
  //   path: 'advance-pemission',
  //   component: AdvancePermissionComponent,

  // },
  {
    path: 'menu-pemission',
    component: MenupermissionComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'advance-pemission/:userid',
  //   component: AdvancePermissionComponent,

  // },
  {
    path: 'role',
    component: RoleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolepermissionRoutingModule { }
