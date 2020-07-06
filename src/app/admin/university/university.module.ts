import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversityissueComponent } from './components/universityissue/universityissue.component';
import { UniversityRoutingModule } from './university-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EdituniversityissueComponent } from './components/edituniversityissue/edituniversityissue.component';


@NgModule({
  declarations: [UniversityissueComponent, EdituniversityissueComponent],
  imports: [
    CommonModule,
    UniversityRoutingModule,
    SharedModule
  ]
})
export class UniversityModule { }
