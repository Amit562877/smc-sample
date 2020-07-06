import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangelogService } from '../../services/changelog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


declare const $: any;
declare const performjsAction: any;
@Component({
  selector: 'app-changelog-response',
  templateUrl: './changelog-response.component.html',
  styleUrls: ['./changelog-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangelogResponseComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private changeLogService: ChangelogService,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef

  ) { }
  logid: any;
  changetype: any;
  logresponse: any;
  currentindex = 0;
  maxindex = 0;
  currentlog: any;
  ngOnInit() {
    this.loadService.loadme = true;
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.logid = params.logid.toString();
      this.changetype = params.changetype.toString();
      this.cd.markForCheck();
    });
    this.changeLogService.getLogResponse(this.logid, this.changetype).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {

        if (isPlatformBrowser(this._platformId)) {
          this.logresponse = data.outdatalist[0];
          // let tmp = this.logresponse[0].logresponse.replace(/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i, '');
          // /^[ -~]+$/
          // let tmp = this.logresponse[0].logresponse.replace(/^[ -~]+$/, '');
          // $('#logresponse').html(tmp);
          $('#logresponse').html(this.logresponse[0].logresponse);
          this.currentlog = this.logresponse[0];
          performjsAction();
          $('del, ins').each((i: any, item: any) => {
            this.maxindex++;
            if (i === this.currentindex) {
              $(window).scrollTop($(item).offset().top);
              $(item).effect('highlight', {}, 3000);
            }
          });
          this.loadService.loadme = false;
        }
        this.cd.markForCheck();
      }
    });
  }
  changeLogStatus(logid: any, status: any) {
    this.loadService.loadme = true;
    let payload = {
      logid, status
    }
    this.changeLogService.editLogStatus(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
        this.cd.markForCheck();
      }
      else {
        this.loadService.loadme = false;
      }
    });
  }
  requestChange(logdata) {
    this.loadService.loadme = true;
    const logdatareq = [JSON.parse(logdata.logdata)];
    this.changeLogService.requestForChange(logdatareq, logdata.id, logdata.logtype, logdata.universityid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        // this.getAllLogData();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
      }
      this.cd.markForCheck();
    });
  }

  nextChange() {

    if ((this.currentindex < this.maxindex)) {
      this.currentindex++;
    } else {
      this.mservice.generateMessage('WARNING', 'WARNING', 'You are at last change.');
    }
    if (isPlatformBrowser(this._platformId)) {
      $('del, ins').each((i: any, item: any) => {
        if (i === this.currentindex) {
          $(window).scrollTop($(item).offset().top);
          $(item).effect('highlight', {}, 3000);
        }
      });
    }
    this.cd.markForCheck();

  }
  prevChange() {
    if ((this.currentindex > 0)) {
      this.currentindex--;
    } else {
      this.mservice.generateMessage('WARNING', 'WARNING', 'You are at first change.');
    }
    if (isPlatformBrowser(this._platformId)) {
      $('del, ins').each((i: any, item: any) => {
        if (i === this.currentindex) {
          $(window).scrollTop($(item).offset().top);
          $(item).effect('highlight', {}, 3000);
        }
      });
    }
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
