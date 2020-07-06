import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCompareComponent } from './components/course-compare/course-compare.component';
import { CourseDetailPdfComponent } from './components/course-detail-pdf/course-detail-pdf.component';
import { UniversityFormMappingsPreviewComponent } from './components/university-form-mappings-preview/university-form-mappings-preview.component';
import { VisaChecklistComponent } from './components/visa-checklist/visa-checklist.component';
import { FundCalculatorComponent } from './components/fund-calculator/fund-calculator.component';
import { ReviewformComponent } from './components/reviewform/reviewform.component';

const routes: Routes = [
  {
    path: 'compare/:compareid/:al/:ao/:aw',
    component: CourseCompareComponent
  },
  {
    path: 'course-detail/:viewtype/:universityid/:universitycampus/:courseid/:currency/:uid/:al/:ao/:aw',
    component: CourseDetailPdfComponent
  },
  {
    path: 'pdf-university-form-mapping-preview/:masterid/:userid',
    component: UniversityFormMappingsPreviewComponent
  },
  {
    path: 'visachecklist/:documentid',
    component: VisaChecklistComponent
  },
  {
    path: 'fundcalculator/:data',
    component: FundCalculatorComponent
  }, {
    path: 'review-form/:aid/:uid/:al/:ao/:aw',
    component: ReviewformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestrictResourceRoutingModule { }
