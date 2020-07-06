import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingsRoutingModule } from './mappings-routing.module';
import { UniversityFormMappingsComponent } from './components/university-form-mappings/university-form-mappings.component';
import { UniversityFormMappingsListComponent } from './components/university-form-mappings-list/university-form-mappings-list.component';
import { ControlbarComponent } from './components/controlbar/controlbar.component';
import { PropertybarComponent } from './components/propertybar/propertybar.component';
import { StudyLevelComponent } from './components/study-level/study-level.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { UniversityFormMappingsPreviewComponent } from './components/university-form-mappings-preview/university-form-mappings-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UniversityFormMappingsComponent,
    UniversityFormMappingsListComponent,
    ControlbarComponent,
    PropertybarComponent,
    DisciplineComponent,
    StudyLevelComponent,
    UniversityFormMappingsPreviewComponent
  ],
  imports: [
    CommonModule,
    MappingsRoutingModule,
    SharedModule
  ]
})
export class MappingsModule { }
