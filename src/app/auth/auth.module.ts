import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { SharedModule } from '../shared/shared.module';
import { AppinitComponent } from './components/appinit/appinit.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetpasswordComponent,
    SignupComponent,
    ChangePasswordComponent,
    SetPasswordComponent,
    AppinitComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
