import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { CourseIssueService } from '../../services/course-issue.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import * as XLSX from 'xlsx';
import { CourseIssueExcelService } from '../../services/courseissueexcel.service';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-course-issue',
  templateUrl: './course-issue.component.html',
  styleUrls: ['./course-issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseIssueComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  universityid = 0;
  studylevelid = 0;  
  issuetype = 0;
  pageIndex = 1;
  pageSize = 10;
  courselist = [];
  universitylist = [];
  studylevellist = []; 
  coursecount = 0;
  prepare = false;
  download = false;
  downloadpr = 0;
  totalsize = 0;
  downloadedsize = 0;
  speed = '';
  constructor(
    private cservice: CourseIssueService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService,
    private excelService: CourseIssueExcelService,
    private encdec: EncDecService,
    private httpclient: HttpClient
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Course Issue');
    this.getAllCourses();
  }
  getAllCourses() {
    this.loadService.loadme = true;
    this.cservice.getCourse(this.universityid, this.studylevelid, this.pageIndex, this.pageSize, this.issuetype).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.courselist = data.outdatalist[0];
        this.coursecount = data.outdatalist[1][0].coursecount;
        this.universitylist = data.outdatalist[2];
        this.studylevellist = data.outdatalist[3];
        
        
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getAllCourses();
    this.cd.markForCheck();
  }
  generateExcel() {
    let coursedata = [];
    const objparams = {
      universityid: this.encdec.encryptSensitive(this.universityid),
      studylevelid: this.encdec.encryptSensitive(this.studylevelid),
      issuetype: this.encdec.encryptSensitive(this.issuetype),
    }
    const req = new HttpRequest('POST', `${environment.API_URL}api/courseCriteria/v1/getCourseforexcel`,
      objparams, {
      reportProgress: true
    });
    this.httpclient.request(req).subscribe((event: HttpEvent<any>) => {
      this.prepare = true;
      $('#progress').modal({ backdrop: 'static', keyboard: false, show: true });
      switch (event.type) {
        case HttpEventType.DownloadProgress:
          this.download = true;
          this.prepare = false;
          this.totalsize = event.total;
          this.speed = (Math.round((event.loaded - this.downloadedsize) / 1024) < 1024) ? Math.round((event.loaded - this.downloadedsize) / 1024) + '/kbps' : Math.round(((event.loaded - this.downloadedsize) / 1024) / 1024) + '/mbps';
          this.downloadedsize = event.loaded;
          this.totalsize = event.total;
          this.downloadpr = Math.round(100 * event.loaded / event.total);
          this.cd.markForCheck();
          break;
        case HttpEventType.Response:
          this.loadService.downloadPDF = false;
          this.download = false;
          this.prepare = false;
          this.downloadpr = 0;
          $('#progress').modal('hide');
          this.cd.markForCheck();
          let data = event.body;
          if (data.flag) {
            coursedata = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
            this.cd.markForCheck();
            this.excelService.generateExcelForCoursedetail(coursedata);
          }
      }
    });
  }
  generateExcelSample() {
    this.excelService.generateExcelForCourseSample();
  }

  importExcel(event) {
    this.prepare = true;
    const filename = event.target.files[0].name;
    const fileExtention = (filename.lastIndexOf('.') > 0) ? filename.substring(filename.lastIndexOf('.') + 1, filename.length) : '';
    if (fileExtention === 'xlsx' || fileExtention === 'xls') {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        const workBook = XLSX.read(data, { type: 'binary' });
        const jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.excelService.importExcelForCourse(jsonData).subscribe((event: HttpEvent<any>) => {
          $('#progress').modal({ backdrop: 'static', keyboard: false, show: true });
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.download = true;
              this.prepare = false;
              this.totalsize = event.total;
              this.speed = (Math.round((event.loaded - this.downloadedsize) / 1024) < 1024) ? Math.round((event.loaded - this.downloadedsize) / 1024) + '/kbps' : Math.round(((event.loaded - this.downloadedsize) / 1024) / 1024) + '/mbps';
              this.downloadedsize = event.loaded;
              this.totalsize = event.total;
              this.downloadpr = Math.round(100 * event.loaded / event.total);
              this.cd.markForCheck();
              break;
            case HttpEventType.Response:
              this.loadService.downloadPDF = false;
              this.download = false;
              this.prepare = false;
              this.downloadpr = 0;
              $('#progress').modal('hide');
              this.cd.markForCheck();
              let data = event.body;
              if (data.flag) {
                this.mservice.generateMessage('SUCCESS', 'Course updated successfully.', 'SUCCESS');
              } else {
                this.mservice.generateMessage('ERROR', data.message, 'FAILED');
              }
              break;
          }
        });
        const file: any = document.getElementById('upload-photo');
        file.value = null;
      };
      reader.readAsBinaryString(file);
    } else {
      this.mservice.generateMessage('ERROR', 'Please provide valid file.', 'Extention issue');
      const file: any = document.getElementById('upload-photo');
      file.value = null;
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
