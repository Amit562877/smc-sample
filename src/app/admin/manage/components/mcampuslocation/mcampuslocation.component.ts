import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { McampuslocationExcelService } from '../../services/mcampuslocation-excel.service';
import * as XLSX from 'xlsx';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { McampuslocationService } from '../../services/mcampuslocation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpRequest, HttpEvent, HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-mcampuslocation',
  templateUrl: './mcampuslocation.component.html',
  styleUrls: ['./mcampuslocation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McampuslocationComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private campusService: McampuslocationService,
    private excelService: McampuslocationExcelService,
    private cd: ChangeDetectorRef,
    public loadService: LoaderService,
    private mservice: ToastService,
    private httpclient: HttpClient
  ) { }
  countryid = '0';
  universitytypeid: any = '0';
  universityid = '0';
  pageIndex = 1;
  pageSize = 10;
  universitydata = [];
  univcount: any;
  universitylist = [];
  universitylistoriginal = [];
  countrylist = [];
  universitytypelist = [];
  prepare = false;
  download = false;
  downloadpr = 0;
  totalsize = 0;
  downloadedsize = 0;
  speed = '';
  ngOnInit() {
    this.getUniversityDetailByProps();
  }

  getUniversityDetailByProps() {
    this.loadService.loadme = true;
    this.campusService.getUniversity(this.countryid, this.universitytypeid, this.universityid, this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universitydata = data.outdatalist[0];
        this.univcount = data.outdatalist[1][0].univcount;
        this.universitylistoriginal = data.outdatalist[2];
        this.universitytypelist = data.outdatalist[3];
        this.countrylist = data.outdatalist[4];
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  generateExcel() {
    this.prepare = true;
    let univdata = [];
    const objparams = {
      countryid: this.countryid,
      universityid: this.universityid,
      universitytypeid: this.universitytypeid
    };
    const req = new HttpRequest('POST', `${environment.API_URL}api/courseCriteria/v1/getCampusDetailsforexcel`,
      objparams, {
      reportProgress: true
    });

    this.httpclient.request(req).subscribe((event: HttpEvent<any>) => {

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
          console.log('Response received');
          this.loadService.downloadPDF = false;
          this.download = false;
          this.prepare = false;
          this.downloadpr = 0;

          this.cd.markForCheck();
          let data = event.body;
          if (data.flag) {
            $('#progress').modal('hide');
            univdata = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
            this.excelService.generateExcelForCampusdetail(univdata);
          }
          break;
      }
    });
  }
  importExcel(event) {
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
        this.cd.markForCheck();
        this.excelService.importExcelForCampus(jsonData).subscribe((event: HttpEvent<any>) => {
          this.prepare = true;
          $('#progress').modal({ backdrop: 'static', keyboard: false, show: true });
          switch (event.type) {
            case HttpEventType.UploadProgress:
              console.log('UploadProgress received');
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
              console.log('Response received');
              this.loadService.downloadPDF = false;
              this.download = false;
              this.prepare = false;
              this.downloadpr = 0;
              $('#progress').modal('hide');
              this.cd.markForCheck();
              let data = event.body;
              if (data.flag) {
                this.mservice.generateMessage('SUCCESS', 'Records updated successfully.', 'SUCCESS');
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
  generateExcelForUnivSample() {
    this.excelService.generateExcelForUnivSample();
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getUniversityDetailByProps();
    this.cd.markForCheck();
  }
  getUniversityListByType() {
    if (this.universitytypeid > 0) {
      this.universitylist = this.universitylistoriginal.filter(u => u.universitytypeid === parseInt(this.universitytypeid, 10));
    } else {
      this.universitylist = this.universitylistoriginal;
    }
    this.cd.markForCheck();
  }
}
