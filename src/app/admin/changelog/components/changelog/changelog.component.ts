import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ChangeLogFilter } from 'src/app/admin/models/changelogfilter';

import { CourseService } from 'src/app/services/course.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, JsonPipe } from '@angular/common';
import { ChangelogService } from '../../services/changelog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
declare const $: any;
declare const diff_match_patch: any;
declare const performjsAction: any;

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangelogComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  ChangeLogFiltermodel = new ChangeLogFilter();
  constructor(
    private adataservice: AuthdataService,
    private changeLogService: ChangelogService,
    private courseService: CourseService,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }
  logdata: any = [];
  logcount: any;
  logtype: any;
  logresponse: any;
  coursedataresponse: any;
  logresponsetype: any;
  currentlog: any;
  //datas:any;
  ismorepage = false;
  logstatus = [{ id: 1, name: 'New' },
  { id: 2, name: 'Approved' },
  { id: 3, name: 'Rejected' },
  { id: 4, name: 'Revised' }];
  universitylist: any;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  newHtml: any;
  oldHtml: any;
  originalJson: any;
  userid: any;
  userdata: any;
  permissions: any = {};
  displayerror: any;
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Change logs');

    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';

    if (this.userdata != '') {
      this.userid = this.userdata.uid;
    } else {
      this.userid = 1;
    }
    this.getAllLogData();
  }
  differenceFinder(newData, oldData) {
    if (isPlatformBrowser(this._platformId)) {
      const text1 = String(newData);
      const text2 = String(oldData);
      const dmp = new diff_match_patch();
      const newDataDiff = dmp.diff_main(text1, text2);
      const oldDataDiff = dmp.diff_main(text2, text1);
      this.newHtml = dmp.diff_prettyHtml(newDataDiff);
      this.oldHtml = dmp.diff_prettyHtml(oldDataDiff);
      this.newHtml = this.newHtml.replace(/&para;/gi, '');
      this.oldHtml = this.oldHtml.replace(/&para;/gi, '');
      this.cd.markForCheck();
    }

  }
  getAllLogData() {
    this.loadService.loadme = true;
    this.ChangeLogFiltermodel.pageindex = 1;
    this.changeLogService.getAllLogs(this.ChangeLogFiltermodel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
     if (data.flag) {
        this.logdata = data.outdatalist[0];
        this.logtype = data.outdatalist[1];
        this.logcount = data.outdatalist[2][0].logcount;
        this.universitylist = data.outdatalist[3];
        this.loadService.loadme = false;
        if (isPlatformBrowser(this._platformId)) {
          performjsAction();
        }
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        this.logdata = [];
        this.logtype = [];
        this.logcount = 0;
        this.loadService.loadme = false;
      }
    });
  }
  dateChange(event) {
    this.ChangeLogFiltermodel.startdate = event.startDate;
    this.ChangeLogFiltermodel.enddate = event.endDate;
    this.getAllLogData();
    this.cd.markForCheck();
  }
  pageChanged(event) {
    this.ChangeLogFiltermodel.pageindex = event;
    this.gelLogsbyFilter();
    this.cd.markForCheck();
  }
  gelLogsbyFilter() {
    this.changeLogService.getAllLogs(this.ChangeLogFiltermodel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.logdata = data.outdatalist[0];
        this.logcount = data.outdatalist[2][0].logcount;
        if (isPlatformBrowser(this._platformId)) {
          performjsAction();
        }
      }
      this.cd.markForCheck();
    });

  }

  getAllLogResponse(log: any, changetype: any) {
    this.loadService.loadme = true;
    this.currentlog = log;
    this.changeLogService.getLogResponse(this.currentlog.id, changetype).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.logresponse = data.outdatalist[0][0].logresponse;
        if (data.outdatalist[1] && data.outdatalist[1][0].coursedata) {
          this.coursedataresponse = data.outdatalist[1][0].coursedata;
        } else {
          this.coursedataresponse = [];
        }
        if (changetype == 4) {
          // revise response
          this.originalJson = data.outdatalist[0][0].logresponse;
          this.differenceFinder(this.coursedataresponse, this.logresponse);
        } else {
          this.originalJson = data.outdatalist[1][0].coursedata;
          this.differenceFinder(this.logresponse, this.coursedataresponse);
          this.logresponse = JSON.parse(this.logresponse);
        }
        // this.coursedataresponse = JSON.parse(this.coursedataresponse);

        if (isPlatformBrowser(this._platformId)) {
          performjsAction();
        }
        this.loadService.loadme = false;
        this.cd.markForCheck();
      }
    });

  }
  requestChange(logdata) {
    this.loadService.loadme = true;
    const logdatareq = [JSON.parse(logdata.logdata)];
    this.changeLogService.requestForChange(logdatareq, logdata.id, logdata.logtype, logdata.universityid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.getAllLogData();

      } else {
        this.loadService.loadme = false;
      }
      this.cd.markForCheck();
    });
  }

  changeLogStatus(logid: any, status: any) {
    this.loadService.loadme = true;
    let payload = {}
    if (status === 2) {
      payload = {
        logid, status,
        coursedataresponse: this.originalJson
      }
    } else if (status === 4) {
      payload = {
        logid, status,
        coursedataresponse: this.originalJson
      }
    } else {
      payload = {
        logid, status,
        coursedataresponse: ''
      }
    }

    this.changeLogService.editLogStatus(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        let responsedata = '';
        if (status === 2) {
          responsedata = this.coursedataresponse
        } else if (status === 4) {
          responsedata = this.logresponse;
        }
        this.courseService.saveCourse(responsedata, this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(datares => {
          if (datares.flag) {
            this.cd.markForCheck();
            this.loadService.loadme = false;
            this.mservice.generateMessage('SUCCESS', 'Course updated successfully.', 'SUCCESS');
          } else {
            this.loadService.loadme = false;
            this.mservice.generateMessage('ERROR', data.message, 'FAILED');
          }
        });
      }

    });
  }
  showerror(reason) {
    var r1 = JSON.parse(reason);
    if (r1.reason) {
      this.displayerror = r1.reason
    } else {
      this.displayerror = JSON.stringify(r1)
    }
    $("#myModal").modal('toggle');
  }
  formatJson(jsondata: any) {
    return JSON.stringify(jsondata);
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
