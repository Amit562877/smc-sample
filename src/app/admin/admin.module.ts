import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminRoutingModule } from './admin-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { CoursePreferenceComponent } from './components/course-preference/course-preference.component';
import { ProfileSetupComponent } from './components/profile-setup/profile-setup.component';
import { WidgetsetupComponent } from './components/widgetsetup/widgetsetup.component';
import { LeadComponent } from './components/lead/lead.component';



@NgModule({
  declarations: [
    AssessmentFormComponent,
    HomeComponent,
    ReviewFormComponent,
    LogoutComponent,
    CoursePreferenceComponent,
    ProfileSetupComponent,
    WidgetsetupComponent,
    LeadComponent
   
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    InfiniteScrollModule,
  ], providers: [],
  // exports: [ArrayFilterPipe, SafePipe],
})
export class AdminModule { }
