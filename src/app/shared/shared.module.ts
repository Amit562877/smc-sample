import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';

import { CapitalizePipe, RolePermissionPipe, AdvacenPermissionPipe, MenuPermissionPipe, SubMenuCountPipe } from './pipes/firstcharactercolor.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { ValidationDirective } from './directive/validation.directive';
import { ClearValidationDirective } from './directive/clear-validation.directive';
import { DaterangepickerDirective } from './directive/daterangepicker.directive';
import { DragDirective, DropDirective } from './directive/drag.directive';
import {
  GroupByPipe, FilterPipe, OptionalFiltersec, OptionalFilter,
  FilterPipe2, FilterPipe3, FilterPipe4, ControlFilter, OrderByPipe,
  SafeHtmlPipe, FilterPipeOptionval, GetCommentCount
} from './pipes/oneform.pipe';
import { HrefPipe, PageCountPipe, RangePipe, ReasonPipe } from './pipes/href.pipe';
import { ArrayFilterPipe, ArrayFilterV2Pipe } from './pipes/filter.pipe';
import { SafePipe } from './pipes/safeurl.pipe';
import { ScollfocusDirective } from './directive/scollfocus.directive';
import { TogglenavDirective } from './directive/togglenav.directive';
import { FirstCharacterPipe, FirstCharacterColorPipe } from './pipes/utility.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollSpyDirective } from './directive/scroll-spy.directive';
import { CourseSearchCardsComponent } from './components/course-search-cards/course-search-cards.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { UsercommentsComponent } from './components/usercomments/usercomments.component';
import { SharelinkComponent } from './components/sharelink/sharelink.component';
import { SplitStringVarPipe } from './pipes/split-string-var.pipe';
import { GooglePlacesDirective } from './directive/google-places.directive';
import { ShortNumberPipe } from './pipes/ShortNumber.pipe';
import { AdvancedFilterMainComponent } from './components/advanced-filter-main/advanced-filter-main.component';
import { AdvancedfilterPipe } from './pipes/advancedfilter.pipe';
import { EncPipe } from './pipes/encdec.pipe';
import { DatePipe } from './pipes/dateformat.pipe';
import { LoginModelComponent } from './components/login-model/login-model.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
@NgModule({
  declarations: [
    FirstCharacterColorPipe,
    FirstCharacterPipe,
    
    CapitalizePipe,
    ValidationDirective,
    ClearValidationDirective,
    DaterangepickerDirective,
    DragDirective,
    DropDirective,
    RolePermissionPipe,
    AdvacenPermissionPipe,
    GroupByPipe,
    FilterPipe,
    OptionalFiltersec,
    OptionalFilter,
    FilterPipe2,
    FilterPipe3,
    FilterPipe4,
    GooglePlacesDirective,
    ControlFilter,
    OrderByPipe,
    SafeHtmlPipe,
    FilterPipeOptionval,
    HrefPipe,
    PageCountPipe,
    RangePipe,
    ReasonPipe,
    ArrayFilterPipe,
    SafePipe,
    ScollfocusDirective,
    TogglenavDirective,
    ArrayFilterV2Pipe,
    ScrollSpyDirective,
    UsercommentsComponent,
    CourseSearchComponent,
    CourseSearchCardsComponent,
    SharelinkComponent,
    SplitStringVarPipe,
    ShortNumberPipe,
    AdvancedFilterMainComponent,
    AdvancedfilterPipe,
    MenuPermissionPipe,
    SubMenuCountPipe,
    EncPipe,
    LoginModelComponent,
    NavigationMenuComponent,
    GetCommentCount,
    DatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    NgbModule,
  ],
  exports: [
    FirstCharacterColorPipe,
    FirstCharacterPipe,
    InfiniteScrollModule,
    NgxPaginationModule,
    FormsModule,
    ValidationDirective,
    ClearValidationDirective,
    DaterangepickerDirective,
    DragDirective,
    DropDirective,
    RolePermissionPipe,
    AdvacenPermissionPipe,
    GroupByPipe,
    FilterPipe,
    OptionalFiltersec,
    OptionalFilter,
    FilterPipe2,
    FilterPipe3,
    FilterPipe4,
    GooglePlacesDirective,
    ControlFilter,
    OrderByPipe,
    GetCommentCount,
    SafeHtmlPipe,
    FilterPipeOptionval,
    HrefPipe,
    PageCountPipe,
    RangePipe,
    ReasonPipe,
    ArrayFilterPipe,
    SafePipe,
    ScollfocusDirective,
    TogglenavDirective,
    ArrayFilterV2Pipe,
    ScrollSpyDirective,
    NgbModule,
    UsercommentsComponent,
    CourseSearchComponent,
    CourseSearchCardsComponent,
    SharelinkComponent,
    SplitStringVarPipe,
    ShortNumberPipe,
    AdvancedFilterMainComponent,
    MenuPermissionPipe,
    SubMenuCountPipe,
    EncPipe,
    LazyLoadImageModule,
    LoginModelComponent,
    NavigationMenuComponent,
    DatePipe
  ]
})
export class SharedModule {
  static forChild() {
    return {
      ngModule: SharedModule,
    };
  }
}
