import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolepermissionRoutingModule } from './rolepermission-routing.module';
import { RoleComponent } from './components/role/role.component';
import { PermissionComponent } from './components/permission/permission.component';
import { RolewisepermissionComponent } from './components/rolewisepermission/rolewisepermission.component';
import { AdvancePermissionComponent } from './components/advance-permission/advance-permission.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenupermissionComponent } from './components/menupermission/menupermission.component';

@NgModule({
  declarations: [
    RoleComponent,
    PermissionComponent,
    RolewisepermissionComponent,
    AdvancePermissionComponent,
    MenuComponent,
    MenupermissionComponent,
  ],
  imports: [
    CommonModule,
    RolepermissionRoutingModule,
    SharedModule
  ]
})
export class RolepermissionModule { }
