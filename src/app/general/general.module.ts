import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseCardsComponent } from './components/course-cards/course-cards.component';
import { CourseCardsRelatedComponent } from './components/course-cards-related/course-cards-related.component';
import { UniversityDetailComponent } from './components/university-detail/university-detail.component';
import { SharedModule } from '../shared/shared.module';
import { UniversityListComponent } from './components/university-list/university-list.component';
import { SearchComponent } from './components/search/search.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  LoginOpt
} from 'angularx-social-login';
import { VisachecklistComponent } from './components/visachecklist/visachecklist.component';
import { FundcalcComponent } from './components/fundcalc/fundcalc.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email',
  return_scopes: true,
  prompt: 'consent',
  ux_mode: 'redirect',
  redirect_uri: window.location.origin + '/program/search/url/'
};

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('336074679439-9dhe891pk2oeh9165p2fekq6p0c7d771.apps.googleusercontent.com', googleLoginOptions)
      }
    ]
  );
  return config;
}
@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    CourseCardsComponent,
    CourseCardsRelatedComponent,
    NotfoundComponent,
    HomeComponent,
    UniversityDetailComponent,
    UniversityListComponent,
    SearchComponent,
    VisachecklistComponent,
    FundcalcComponent
  ], providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule,
    SocialLoginModule,
  ]
})
export class GeneralModule { }
