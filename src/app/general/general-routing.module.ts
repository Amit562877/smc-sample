import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { UniversityDetailComponent } from './components/university-detail/university-detail.component';
import { CourseSearchComponent } from '../shared/components/course-search/course-search.component';
import { UniversityListComponent } from './components/university-list/university-list.component';
import { SearchComponent } from './components/search/search.component';
import { AdvancedFilterMainComponent } from '../shared/components/advanced-filter-main/advanced-filter-main.component';
import { VisachecklistComponent } from './components/visachecklist/visachecklist.component';
import { FundcalcComponent } from './components/fundcalc/fundcalc.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'course-list',
    component: CourseListComponent
  },
  {
    path: 'course-detail/:viewtype/:universityid/:universitycampus/:courseid',
    component: CourseDetailComponent
  },
  {
    path: 'course-detail/search/:viewtype/:universityid/:universitycampus/:courseid',
    component: CourseDetailComponent
  },
  {
    path: 'course-search/:rno/:prid',
    component: CourseSearchComponent
  },
  {
    path: 'course-search/:rno/:prid/:aid',
    component: CourseSearchComponent
  },
  {
    path: 'course-search/:rno/:prid/:aid/:ispopup',
    component: CourseSearchComponent
  },
  {
    path: 'university-list',
    component: UniversityListComponent
  },
  {
    path: 'univ-detail/:universityid',
    component: UniversityDetailComponent
  },
  {
    path: 'search/:url',
    component: SearchComponent
  },
  {
    path: 'search/:code/:url',
    component: SearchComponent
  },
  {
    path: 'advanced-filter',
    component: AdvancedFilterMainComponent
  },
  {
    path: 'visachecklist',
    component: VisachecklistComponent
  },
  {
    path: 'fundcalc',
    component: FundcalcComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
