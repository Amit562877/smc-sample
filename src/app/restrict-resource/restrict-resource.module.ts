import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictResourceRoutingModule } from './restrict-resource-routing.module';
import { CourseCompareComponent } from './components/course-compare/course-compare.component';
import { CourseDetailPdfComponent } from './components/course-detail-pdf/course-detail-pdf.component';
import { UniversityFormMappingsPreviewComponent } from './components/university-form-mappings-preview/university-form-mappings-preview.component';
import { SharedModule } from '../shared/shared.module';
import { VisaChecklistComponent } from './components/visa-checklist/visa-checklist.component';
import { FundCalculatorComponent } from './components/fund-calculator/fund-calculator.component';
import { ReviewformComponent } from './components/reviewform/reviewform.component';

@NgModule({
  declarations: [CourseCompareComponent, CourseDetailPdfComponent,
    UniversityFormMappingsPreviewComponent,
    VisaChecklistComponent,
    FundCalculatorComponent,
    ReviewformComponent],
  imports: [
    CommonModule,
    SharedModule,
    RestrictResourceRoutingModule
  ]
})
export class RestrictResourceModule { }
