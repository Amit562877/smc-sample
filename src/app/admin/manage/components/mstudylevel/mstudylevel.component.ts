import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Studylevel } from 'src/app/admin/models/studylevel';
import { StudylevelService } from 'src/app/admin/manage/services/studylevel.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';


declare const $: any;
@Component({
  selector: 'app-mstudylevel',
  templateUrl: './mstudylevel.component.html',
  styleUrls: ['./mstudylevel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MstudylevelComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  studylevellist = [];
  studylevelcount: any;
  studylevel = new Studylevel();
  constructor(
    private cservice: StudylevelService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Study level/Manage');
    this.getAllStudylevelByFilter();
  }
  addNewStudylevel(headform) {
    if (headform.valid) {
      this.cservice.addStudyLevel(this.studylevel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.getAllStudylevelByFilter();
            this.studylevel = new Studylevel();
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }
            this.cd.markForCheck()
          } else {
            this.mservice.generateMessage('ERROR', this.studylevel.name + ' is already in use.', '');
            this.loadService.loadme = false;
          }
        } else {
          this.mservice.generateMessage('ERROR', data.message, '');
          this.loadService.loadme = false;
        }
      });
    }
  }
  getAllStudylevelByFilter() {
    this.loadService.loadme = true;
    this.cservice.getAllStudyLevel(this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.studylevellist = data.outdatalist[0];
        this.studylevelcount = data.outdatalist[1][0].studylevelcount;
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  cancelProcess() {
    this.studylevel = new Studylevel();
    this.cd.markForCheck();
  }
  editStudylevel(studylevel) {
    this.studylevel = studylevel;
    this.cd.markForCheck();
  }
  deleteStudyLevel(studylevel) {
    studylevel.isdeleted = true;
    this.cservice.addStudyLevel(studylevel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdata !== -1) {
          this.getAllStudylevelByFilter();
          this.studylevel = new Studylevel();

        } else {
          this.mservice.generateMessage('ERROR', this.studylevel.name + ' is already in use.', '');
          this.loadService.loadme = false;
        }
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getAllStudylevelByFilter();
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
