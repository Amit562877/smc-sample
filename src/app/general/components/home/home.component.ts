import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { environment } from 'src/environments/environment';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CourseFiltersService, UniversityFiltersService } from 'src/app/services/course-filters.service';
import { Router } from '@angular/router';
import { Searchhints } from 'src/app/models/course.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const setScreen: any;
declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private courseService: CourseService,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public courseFilterModel: CourseFiltersService,
    public universityfiltermodel: UniversityFiltersService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }
  searchhints = new Searchhints();
  universitylist: any = [];
  disciplinelist: any = [];
  rankinglist: any = [];
  countrycount: any;
  usercount: any;
  environment = environment;
  inputFocusFlag = true;
  isbuttonclicke = false;
  divFocusFlag = false;
  ngOnInit() {

    this.courseService.getinitialData().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universitylist = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
        this.disciplinelist = (data.outdatalist[1] !== 'No Data Found') ? JSON.parse(data.outdatalist[1]) : [];
        this.rankinglist = (data.outdatalist[2] !== 'No Data Found') ? JSON.parse(data.outdatalist[2]) : [];
        if (isPlatformBrowser(this._platformId)) {
          setScreen();
        }
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck()
    });
  }
  navigatetoCourse(did) {
    this.courseFilterModel.disciplineid = did;
    this.router.navigate(['/program/course-list']);
  }

  globalhints(e) {
    this.divFocusFlag = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#hint').show();
    }
    if (isPlatformBrowser(this._platformId)) {
      this.isbuttonclicke = false;
      if (e.which === 27) {
        this.isbuttonclicke = true;
      } else {
        if (this.courseFilterModel.searchstring.length > 0) {
          if (this.courseFilterModel.searchstring.length === 0) {
            this.searchhints = new Searchhints();
          } else if (e.which !== 40 && e.which !== 38 && e.which !== 37 && e.which !== 39) {
            this.courseService.globlahints(this.courseFilterModel.searchstring, this.searchhints.pageindex,
              this.searchhints.pagesize, 0, 'global').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                if (data.flag && data.outdatalist[0] !== 'No Data Found') {
                  this.searchhints.coursehint = JSON.parse(data.outdatalist[0]);
                  this.searchhints.coursehintcount = JSON.parse(data.outdatalist[1])[0].coursecount;
                  this.searchhints.universityhint = JSON.parse(data.outdatalist[2]);
                  this.searchhints.universityhintcount = JSON.parse(data.outdatalist[3])[0].universitycount;
                } else {
                  this.searchhints = new Searchhints();
                }
                this.cd.markForCheck()
              });
          }
        } else {
          this.searchhints = new Searchhints();
        }
      }
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
