import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { AppinitComponent } from './components/appinit/appinit.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password/reset',
    component: ResetpasswordComponent
  },
  {
    path: 'password/reset/changepassword/:userid',
    component: ChangePasswordComponent
  },
  {
    path: 'password/setpassword/:userid',
    component: SetPasswordComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'appinit',
    component: AppinitComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
