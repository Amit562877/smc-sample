import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from './general/components/notfound/notfound.component';
const routes: Routes = [
  {
    path: 'program',
    loadChildren: () => import('../app/general/general.module').then(m => m.GeneralModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'restrict',
    loadChildren: () => import('./restrict-resource/restrict-resource.module').then(m => m.RestrictResourceModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '',
    redirectTo: '/program/course-list',
    pathMatch: 'full'
  },
  {
    path: 'course-list',
    redirectTo: '/program/course-list',
  },
  {
    path: 'login',
    redirectTo: '/auth/login',
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false, onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
