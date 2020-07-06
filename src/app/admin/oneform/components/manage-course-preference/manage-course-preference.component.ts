import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UnivOneFormService } from '../../services/univ-one-form.service';
import { ManageCoursePreferenceService } from '../../services/manage-course-preference.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-manage-course-preference',
  templateUrl: './manage-course-preference.component.html',
  styleUrls: ['./manage-course-preference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCoursePreferenceComponent implements OnInit, OnDestroy {
  constructor(
    private univOneFormService: UnivOneFormService,
    private coursePrefService: ManageCoursePreferenceService,
    private mservice: ToastService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService
  ) { }
  componentDestroyed$: Subject<boolean> = new Subject();
  allpreflimit: any;
  prefLimit: any;
  prefid = 0;
  univid = '';
  studylevelid = '';
  displayboxes: any;
  universitylist: any;
  studylevellist: any;
  model = {};
  pageIndex = 1;
  pageSize = 10;
  totalrecords = 0;
  submitted = false;
  permissions: any = {};
  isedited = false;
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Course Preference');
    if (isPlatformBrowser(this._platformId)) {
      $('#AddUniversityId').hide();
      $('#displayUniversityRecords').show();
      $('#footerSection').show();
      this.cd.markForCheck();
      this.GetAllCoursePref();
    }

  }

  AddNewUnivCoursePref() {
    if (isPlatformBrowser(this._platformId)) {
      $('#displayUniversityRecords').hide();
      $('#footerSection').hide()
      $('#AddUniversityId').show();
      this.cd.markForCheck();
    }

    this.coursePrefService.getalluniversity().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0]) {
        this.universitylist = data.outdatalist[0];
        this.studylevellist = data.outdatalist[1];
        this.cd.markForCheck();
      }
    });
  }
  EditUniversityCoursePref(list) {
    this.isedited = true;
    this.prefid = list.id;
    this.univid = list.univid;
    this.studylevelid = (list.studylevelid === undefined) ? '' : list.studylevelid;
    this.prefLimit = list.preflimit;
    this.AddNewUnivCoursePref();
    if (isPlatformBrowser(this._platformId)) {
      $('#AddUniversityId').show();
      $('#displayUniversityRecords').hide();
      $('#footerSection').hide()
    }
    this.cd.markForCheck();
  }
  DeleteUniversityCoursePref(list) {
    this.coursePrefService.deleteUniversityCoursePref(list.id).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', data.message, '');
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
      }
      this.GetAllCoursePref();
      this.cd.markForCheck();
    });
  }
  ClearField() {
    this.isedited = false;
    if (isPlatformBrowser(this._platformId)) {
      $('#AddUniversityId').hide();
      $('#displayUniversityRecords').show();
      $('#footerSection').show();
    }

    this.studylevelid = '';
    this.univid = '';
    this.submitted = false;
    this.prefLimit = '';
    this.cd.markForCheck();
  }
  SaveUnivCoursePref(addPrefForm) {
    this.submitted = true;
    if (addPrefForm.valid) {
      this.isedited = false;
      this.submitted = false;
      const payload = {
        id: this.prefid,
        univid: this.univid,
        studylevelid: this.studylevelid,
        preflimit: this.prefLimit,
        // isactive: this.isactive,
        // isdelete: false,
        createdby: 1
      };
      this.coursePrefService.saveUnivCoursePref(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', data.message, '');
          this.ClearField();
          this.GetAllCoursePref();
          this.cd.markForCheck();
        } else {
          this.ClearField();
          this.mservice.generateMessage('ERROR', data.message, '');
        }
      });
    }

  }
  GetAllCoursePref() {
    this.coursePrefService.getAllUniversityCoursePref(this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(getData => {
      if (getData.flag && getData.outdatalist[0]) {
        this.allpreflimit = getData.outdatalist[0];
        if (this.allpreflimit.length > 0) {
          this.totalrecords = this.allpreflimit[0].totalrecord;
        }
        this.cd.markForCheck();
      } else {
        this.allpreflimit = [];
        // alert('Some Error Occured');
      }
    });
  }
  changePageSize() {
    this.pageIndex = 1;
    this.GetAllCoursePref();
    this.cd.markForCheck();
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.GetAllCoursePref()
    this.cd.markForCheck();
  }
  ConvertToInt(val) {
    return parseInt(val);
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
