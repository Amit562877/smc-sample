import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UniversityDetailService } from 'src/app/services/university-detail.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { environment } from 'src/environments/environment';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Searchhints } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { UniversityFiltersService } from 'src/app/services/course-filters.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare const setScreen: any;
declare const $: any;
@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UniversityListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private universityService: UniversityDetailService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private courseService: CourseService,
    public universityfiltermodel: UniversityFiltersService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }
  searchhints = new Searchhints();
  universitylist: any = [];
  rankinglist: any = [];
  institutetypelist: any = [];
  countrylist: any = [];
  statelist: any = [];
  citylist: any = [];
  originalstatelist: any = [];
  originalcitylist: any = [];
  environment = environment;
  throttle = 150;
  scrollDistance = 1;
  scrollUpDistance = 2;
  universitycount = 0;
  isbuttonclicke = false;
  divFocusFlag = false;
  inputFocusFlag = false;
  ngOnInit() {
    this.loadService.ispanel = true;
    this.getUniversityByFilter();
  }
  getUnivesityList(name) {
    this.universityfiltermodel.searchstring = name;
    this.searchhints = new Searchhints();
    this.getUniversityByFilter();
    this.cd.markForCheck()
  }
  getUniversityByFilter() {
    this.universityService.getUniversity(this.universityfiltermodel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universitylist = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
        this.universitycount = JSON.parse(data.outdatalist[1])[0].universitycount;
        this.rankinglist = JSON.parse(data.outdatalist[2]);
        this.countrylist = JSON.parse(data.outdatalist[3]);
        this.statelist = JSON.parse(data.outdatalist[4]);
        this.citylist = JSON.parse(data.outdatalist[5]);
        this.originalstatelist = JSON.parse(data.outdatalist[4]);
        this.originalcitylist = JSON.parse(data.outdatalist[5]);
        this.institutetypelist = JSON.parse(data.outdatalist[6]);
        this.filterstate();
        this.filtercity();
        this.cd.markForCheck()
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
    });
    if (isPlatformBrowser(this._platformId)) {
      setScreen();
    }
  }
  onScrollDown() {
    this.universityfiltermodel.pageindex = this.universityfiltermodel.pageindex + 1;
    if (this.universityfiltermodel.pageindex <= Math.ceil(this.universitycount / this.universityfiltermodel.pagesize)) {
      this.universityService.getUniversity(this.universityfiltermodel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.universitylist = this.universitylist.concat(JSON.parse(data.outdatalist[0]));
        } else {
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
        }
        this.cd.markForCheck()
      });
      if (isPlatformBrowser(this._platformId)) {
        setScreen();
      }
    }
  }
  filterstate() {
    this.statelist = this.originalstatelist.filter(data => data.countryid === this.universityfiltermodel.countryid);
    this.citylist = [];
    this.universityfiltermodel.stateid = 0;
    this.universityfiltermodel.cityid = 0;
    this.cd.markForCheck()
  }
  filtercity() {
    this.citylist = this.originalcitylist.filter(data => data.stateid === this.universityfiltermodel.stateid);
    this.universityfiltermodel.cityid = 0;
    this.cd.markForCheck()
  }
  clearFilter() {
    this.universityfiltermodel = new UniversityFiltersService();
    this.getUniversityByFilter();
    this.cd.markForCheck()
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
        if (e.which === 13 || this.universityfiltermodel.searchstring.length === 0) {
          if (this.universityfiltermodel.searchstring.length === 0) {
            this.universityfiltermodel.searchstring = '';
          } else if ($('ul li.active a div span').text().length > 0) {
            this.universityfiltermodel.searchstring = $('ul li.active a div span').text();
          }
          this.getUniversityByFilter();
          this.searchhints = new Searchhints();
        } else if (e.which !== 40 && e.which !== 38 && e.which !== 37 && e.which !== 39) {
          this.courseService.globlahints(this.universityfiltermodel.searchstring, this.searchhints.pageindex,
            this.searchhints.pagesize, 0, 'university').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag && data.outdatalist[0] !== 'No Data Found') {
                this.searchhints.coursehint = JSON.parse(data.outdatalist[0]);
                // this.encyptcourseid(JSON.parse(data.outdatalist[0]));
                this.searchhints.coursehintcount = JSON.parse(data.outdatalist[1])[0].universitycount;
                if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
                  this.searchhints.ismorepage = true;
                } else {
                  this.searchhints.ismorepage = false;
                }
                setTimeout(() => {
                  $('ul li:first-child').addClass('active');
                }, 100);
              } else {
                this.searchhints = new Searchhints();
              }
              this.cd.markForCheck()
            });
        } else if (e.which === 40 || e.which === 38) {
          const current = $('ul li.active');
          switch (e.which) {
            case 38:
              $('ul li.active').prev().addClass('active');
              current.removeClass('active');
              break;
            case 40:
              $('ul li.active').next().addClass('active');
              current.removeClass('active');
              break;
          }
          if ($('ul li.active').length === 0) {
            if (e.which === 38) {
              $('ul li:first-child').addClass('active');
            } else {
              $('ul li:last-child').addClass('active');
            }
          }
          const container = $('ul');
          const scrollTo = $('ul li.active');
          container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
          }, 100);
          // $('ul').animate({ scrollTop: $('ul li.active').position().top }, 'slow');
        }
      }
    }
  }

  getNextHint() {
    this.isbuttonclicke = false;
    this.divFocusFlag = false;
    if (this.searchhints.ismorepage) {
      this.searchhints.pageindex = this.searchhints.pageindex + 1;
      this.courseService.globlahints(this.universityfiltermodel.searchstring, this.searchhints.pageindex,
        this.searchhints.pagesize, 0, 'university').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag && data.outdatalist[0]) {
            this.searchhints.coursehint = this.searchhints.coursehint.concat(JSON.parse(data.outdatalist[0]));
            this.searchhints.coursehintcount = JSON.parse(data.outdatalist[1])[0].universitycount;
            if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
              this.searchhints.ismorepage = true;
            } else {
              this.searchhints.ismorepage = false;
            }
            setScreen();
          } else {
            this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          }
          this.cd.markForCheck()
        });
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.loadService.ispanel = true;
  }
}
