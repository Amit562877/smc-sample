import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { UniversityService } from '../../services/university.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { environment } from 'src/environments/environment';
//import {UniversitySearchService} from '../../services/university-search.service';
import { Searchhints } from '../../models/universitysearch.model';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare const $: any;
@Component({
  selector: 'app-univrsityissue',
  templateUrl: './universityissue.component.html',
  styleUrls: ['./universityissue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniversityissueComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  universitylist = [];
  universitycnt = 0;
  universitycount
  countrylist = [];
  searchstring = '';
  universitytype = []
  countryid = 0;
  universitytypeid = 0;
  searchhints = new Searchhints();
  divFocusFlag = false;
  inputFocusFlag = false;
  isbuttonclicke = false;
  constructor(
    private uservice: UniversityService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService,
    private encdec: EncDecService,
    private httpclient: HttpClient,
    //private univsearch:UniversitySearchService,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('University Issue');
    this.getAllUniversity();
    this.getdropdownvalue();
  }
  getdropdownvalue() {
    this.loadService.loadme = true;
    this.uservice.getdropdownvalue().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data) {
        this.countrylist = JSON.parse(data.outdatalist[0]);
        this.universitytype = JSON.parse(data.outdatalist[6]);
        this.cd.markForCheck();

      }
    })
  }
  getAllUniversity() {
    this.loadService.loadme = true;
    console.log("universitytypeid", this.countryid)
    this.uservice.getuniversity(this.pageIndex, this.pageSize, this.countryid, this.universitytypeid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universitylist = JSON.parse(data.outdatalist[0]);
        this.universitycnt = JSON.parse(data.outdatalist[1]);
        this.universitycount = this.universitycnt[0].univcnt
        // console.log(" this.universitycount",data)
        this.loadService.loadme = false;
        this.cd.markForCheck();
        //console.log( this.universitylist)
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getAllUniversity();
    this.cd.markForCheck();
  }
  getUniversityByFilter() {
    // this.advanceFilterFlag = false;
    this.isbuttonclicke = true;
    this.loadService.loadme = true;
    this.searchhints = new Searchhints();  
    
    this.uservice.getAllUniversity(this.searchstring).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdatalist[0] !== 'No Data Found') {
          // this.coursedetails.coursedata = this.encyptcourseid(JSON.parse(data.outdatalist[0]));
          this.universitylist = JSON.parse(data.outdatalist[0]);
          this.universitycnt = JSON.parse(data.outdatalist[1]);
          this.universitycount = this.universitycnt[0].univcnt
        } else {
          this.universitylist = undefined;
          this.universitycount = undefined;
        }


        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);

        this.loadService.loadme = false;
        this.cd.markForCheck();
      }
    });
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
        // if (this.courseFilterModel.searchstring.length > 2 || this.courseFilterModel.searchstring.length === 0) {
        if (this.searchstring.length > 2) {
          if (e.which === 13 || this.searchstring.length === 0) {
            this.getUniversityByFilter();
          } else if (e.which !== 40 && e.which !== 38 && e.which !== 37 && e.which !== 39) {
            this.uservice.globlahints(this.searchstring, this.searchhints.pageindex,
              this.searchhints.pagesize, 0, 'university').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

                if (data.flag && data.outdatalist[0] !== 'No Data Found') {
                  this.searchhints.universityhint = JSON.parse(data.outdatalist[0]);
                  // this.encyptcourseid(JSON.parse(data.outdatalist[0]));
                  this.searchhints.universityhintcount = JSON.parse(data.outdatalist[1])[0].universitycount;
                  
                  if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
                    this.searchhints.ismorepage = true;
                  } else {
                    this.searchhints.ismorepage = false;
                  }
                  this.cd.markForCheck();
                  setTimeout(() => {
                    $('#list li:first-child').addClass('active');
                  }, 100);
                } else {
                  this.searchhints = new Searchhints();
                }
              });
          } else if (e.which === 40 || e.which === 38) {
            const current = $('#list li.active');
            switch (e.which) {
              case 38:
                $('#list li.active').prev().addClass('active');
                current.removeClass('active');
                break;
              case 40:
                $('#list li.active').next().addClass('active');
                current.removeClass('active');
                break;
            }
            const container = $('#list');
            const scrollTo = $('#list li.active');
            container.animate({
              scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            }, 100);
            // $('ul').animate({ scrollTop: $('ul li.active').position().top }, 'slow');
          }
        } else {
          this.searchhints = new Searchhints();
        }
      }
    }
  }
  getNextHint() {
    this.isbuttonclicke = false;
    this.divFocusFlag = false;
    if (this.searchhints.ismorepage) {
      this.searchhints.pageindex = this.searchhints.pageindex + 1;
      this.uservice.globlahints(this.searchstring, this.searchhints.pageindex,
        this.searchhints.pagesize, 0, 'university').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag && data.outdatalist[0]) {
            this.searchhints.universityhint = JSON.parse(data.outdatalist[0]);
            this.searchhints.universityhintcount = JSON.parse(data.outdatalist[1])[0].universitycount;
            if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
              this.searchhints.ismorepage = true;
            } else {
              this.searchhints.ismorepage = false;
            }
            this.cd.markForCheck();
          } else {
            this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          }
        });
    }
  }
  public trackByIndex(index: number) {
    return index;
  }
  getCourseByHint(cname) {    
    this.searchstring = cname;    
    this.getUniversityByFilter();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
