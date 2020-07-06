import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { CourseCriteriaService } from '../../services/course-criteria.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExcelService } from '../../services/excel.service';
import { Criteria } from 'src/app/admin/models/criteria';
import { element } from 'protractor';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare const $: any;
declare const performjsAction: any;
@Component({
  selector: 'app-course-criteria-list',
  templateUrl: './course-criteria-list.component.html',
  styleUrls: ['./course-criteria-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCriteriaListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private criteriaService: CourseCriteriaService,
    private mservice: ToastService, private router: Router,
    private route: ActivatedRoute,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    private excelService: ExcelService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
    private httpclient: HttpClient,
  ) { }
  universityid: any = '';
  studylevelid: any = '';
  countryid: any = '';
  pageindex = 1;
  pagesize = 10;
  universitytypeid: any = '';
  criterialist: any = [];
  criteriacount = 0;
  universitytype: any;
  universityidlist: any;
  universityidlistoriginal: any;
  studylevellist: any;
  countrylist: any;
  courselist: any = [];
  criteriacountrylist: any = [];
  utype = [];
  ulist = [];
  slevellist = [];
  countrylists = [];
  medialist: any = [];
  medianame: any = '';
  courseslist: any = [];
  boardlist: any = [];
  boardname: any;
  boardtype: any;
  boardisexist: any = false;
  // arr = []
  tenthboardcnt = 0;
  twelvethcnt = 0;
  diplomacnt = 0;
  bachelorcnt = 0;
  tenarr: any;

  twelvearr = [];
  darr = [];
  barr = [];

  alreadyexits: any;
  icountryid: any;
  criteria = new Criteria();
  coursecriterai = {
    countrylists: [],
    studylevellist: [],
    universitytypelist: [],
    courses: [],
    countrylist: [],
    universitylist: []
  }
  datas = {
    tenth: [],
    twelveth: [],
    diploma: [],
    bachelor: []
  }
  boardandinterviewdata = []
  medianames: any
  downloadJsonHref;
  permissions: any = {};
  userdata: any;
  boarddata: any;
  uid: any;
  progress = 0;
  prepare = false;
  download = false;
  downloadpr = 0;
  totalsize = 0;
  downloadedsize = 0;
  speed = '';
  ngOnInit() {

    this.uid = this.adataservice.getUserId();
    this.permissions = this.adataservice.getPermission('Criteria');
    // console.log("YESSSS",this.permissions)
    this.loadService.loadme = true;
    this.criteriaService.getCriteriaFilter().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universitytype = data.outdatalist[2];
        this.universityidlist = data.outdatalist[0];
        this.universityidlistoriginal = data.outdatalist[0];
        this.studylevellist = data.outdatalist[1];
        this.countrylist = data.outdatalist[3];

      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
      this.cd.markForCheck()
    });
    this.criteriaService.getCourseCriteria(this.universityid, this.studylevelid,
      this.countryid, this.pageindex, this.pagesize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.criterialist = data.outdatalist[0];
          if (this.criterialist.length === 0) {
            this.router.navigate(['/user/workspace/criteria/course-criteria-manage']);
          }
          this.criteriacount = data.outdatalist[1][0].recordcount;
          this.loadService.loadme = false;
          if (isPlatformBrowser(this._platformId)) {
            performjsAction();
          }

        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          this.criterialist = [];
        }
        this.cd.markForCheck()
      });
  }
  getAllCriteria() {
    this.loadService.loadme = true;
    this.pageindex = 1;
    this.criteriaService.getCourseCriteria(this.universityid, this.studylevelid,
      this.countryid, this.pageindex, this.pagesize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.criterialist = data.outdatalist[0];
          this.criteriacount = data.outdatalist[1][0].recordcount;
          this.loadService.loadme = false;
          if (isPlatformBrowser(this._platformId)) {
            performjsAction();
          }

        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          this.criterialist = [];
          this.loadService.loadme = false;
        }
        this.cd.markForCheck()
      });
  }
  getUniversityListByType() {

    if (this.criteria.universitytypeid > 0) {
      this.universityidlist = this.universityidlistoriginal.filter(u => u.universitytypeid === this.criteria.universitytypeid);
    } else {
      this.universityidlist = this.universityidlistoriginal;
    }
    this.cd.markForCheck();
  }
  pageChanged(event) {
    this.pageindex = event;
    this.getAllCriteriaByFilter();
    this.cd.markForCheck();
  }
  getAllCriteriaByFilter() {
    this.loadService.loadme = true;
    this.criteriaService.getCourseCriteria(this.universityid, this.studylevelid,
      this.countryid, this.pageindex, this.pagesize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.criterialist = data.outdatalist[0];
          this.criteriacount = data.outdatalist[1][0].recordcount;
          this.loadService.loadme = false;
          if (isPlatformBrowser(this._platformId)) {
            performjsAction();
          }

        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          this.criterialist = [];
          this.loadService.loadme = false;
        }
        this.cd.markForCheck()
      });
  }

  deleteCriteriaMapping(criteriaid: any) {
    this.loadService.loadme = true;
    this.criteriaService.deleteCriteriaMapping(criteriaid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.criterialist = this.criterialist.filter(cc => cc.id !== criteriaid);
        this.loadService.loadme = false;
        this.mservice.generateMessage('SUCCESS', 'SUCCESS', 'Criteria mapping deleted!.');
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
      this.cd.markForCheck()
    });
  }
  getrelateddata(headform) {
    if (headform.valid) {
      // this.loadService.loadme = true;
      $('#downloadcriteria').modal('hide');
      const req = new HttpRequest('GET', `${environment.API_URL}api/courseCriteria/v1/getCriteria?universityid=${this.criteria.universityid}
      &studylevelid=${this.criteria.studylevelid}&countryid=${this.criteria.countryid}`, {
        reportProgress: true,
        observe: 'events',
      });
      this.httpclient.request(req).subscribe((event: HttpEvent<any>) => {
        $('#progress').modal({ backdrop: 'static', keyboard: false, show: true });
        this.prepare = true;
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            this.download = true;
            this.prepare = false;
            this.cd.markForCheck();
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
            let data = event.body;
            if (event.body.flag) {
              this.courselist = data.outdatalist[0];
              // this.boardlist = data.outdatalist[2];
              this.criteriacountrylist = data.outdatalist[4];

              this.universitytype.forEach(element => {
                if (element.id == this.criteria.universitytypeid) {
                  this.utype.push({ id: element.id, name: element.univtype })
                }
              });
              this.universityidlist.forEach(element => {
                if (element.id == this.criteria.universityid) {
                  this.ulist.push(
                    { id: element.id, name: element.name }
                  );
                }
              });
              this.countrylist.forEach(element => {
                if (element.id == this.criteria.countryid) {
                  this.countrylists.push({
                    id: element.id,
                    name: element.name
                  });
                }
              });
              this.studylevellist.forEach(element => {
                if (element.id == this.criteria.studylevelid) {
                  this.slevellist.push({
                    id: element.id,
                    name: element.name
                  });
                }
              });
              this.coursecriterai['countrylists'] = this.countrylists
              this.coursecriterai['studylevellist'] = this.slevellist
              this.coursecriterai['universitytypelist'] = this.utype
              this.coursecriterai['courses'] = this.courselist
              this.coursecriterai['countrylist'] = this.criteriacountrylist
              this.coursecriterai['universitylist'] = this.ulist

              this.generateExcel()
              this.loadService.loadme = false;
            } else {
              this.mservice.generateMessage('ERROR', 'FAILED', data.message);
              this.courselist = [];
              this.criteriacountrylist = [];
              this.loadService.loadme = false;
            }
            this.cd.markForCheck()

        }
      });

    }
  }
  generateExcel() {
    this.excelService.generateExcels(this.coursecriterai);
    this.cd.markForCheck();
  }
  onFileChange(ev) {
    let courselistids = [];
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      jsonData.selectedcriterai.forEach(element => {
        this.criteria.countryid = element.countryid,
          this.criteria.universitytypeid = element.universitytypeid,
          this.criteria.universityid = element.universityid,
          this.criteria.studylevelid = element.studylevelid
      });
      jsonData.criterai.forEach(element => {
        if (element.NameOFtheCriterai == 'isapplicabletenth') {
          this.criteria.isapplicabletenth = element.checkornot
        } else if (element.NameOFtheCriterai == 'isapplicabletwelfth') {
          this.criteria.isapplicabletwelfth = element.checkornot
        } else if (element.NameOFtheCriterai == 'isapplicablebachelor') {
          this.criteria.isapplicablebachelor = element.checkornot
        } else if (element.NameOFtheCriterai == 'isapplicablediploma') {
          this.criteria.isapplicablediploma = element.checkornot
        } else if (element.NameOFtheCriterai == 'isgapallow') {
          this.criteria.isgapallow = element.checkornot
          if (this.criteria.isgapallow == true) {
            this.criteria.gapduration = element.Years
          }
        } else if (element.NameOFtheCriterai == 'isworkexperienceapplicable') {
          this.criteria.isworkexperienceapplicable = element.checkornot
          if (this.criteria.isworkexperienceapplicable == true) {
            this.criteria.workexperience = element.Years
          }

        } else if (element.NameOFtheCriterai == 'ismarriageapplicable') {
          this.criteria.ismarriageapplicable = element.checkornot
          if (this.criteria.ismarriageapplicable == true) {
            this.criteria.marriageduration = element.Years
            this.criteria.spousequalification = element.spousequalification
            this.criteria.spouseincome = element.spouseIncomebyyear
          }
        } else if (element.NameOFtheCriterai == 'isspouseimmigrationapplicable') {
          this.criteria.isspouseimmigrationapplicable = element.checkornot
        } else if (element.NameOFtheCriterai == 'isimmigrationspouserefusalallow') {
          this.criteria.isimmigrationspouserefusalallow = element.checkornot
        } else if (element.NameOFtheCriterai == 'fundInformation') {
          this.criteria.fundinmonths = element.Month
        } else if (element.NameOFtheCriterai == 'remark') {
          this.criteria.remarks = element.remarkcomment
        } else if (element.NameOFtheCriterai == 'isinterviewapplicable') {
          this.criteria.isinterviewapplicable = element.checkornot
          if (this.criteria.isinterviewapplicable == true) {
            this.criteria.interviewprocess = element.Interviewprocess
            this.medianames = element.media
          }
        } else if (element.NameOFtheCriterai == 'isimmigrationspouserefusalallowcases') {
          this.criteria.isimmigrationspouserefusalallowcases = element.checkornot
        } else if (element.NameOFtheCriterai == 'isimmigrationapplicable') {
          this.criteria.isimmigrationapplicable = element.checkornot
        } else if (element.NameOFtheCriterai == 'isimmigrationrefusalallow') {
          this.criteria.isimmigrationrefusalallow = element.checkornot
        } else if (element.NameOFtheCriterai == 'isimmigrationrefusalallowcases') {
          this.criteria.isimmigrationrefusalallowcases = element.checkornot
        }
      });
      if (this.criteria.isimmigrationspouserefusalallowcases == true) {
        this.criteria.spouseexcludeimgrationrefusalcountry = []
        jsonData.countrylist.forEach(element => {
          if (element.spouseexcludeimgrationrefusalcountry == 'yes') {
            this.criteria.spouseexcludeimgrationrefusalcountry.push(element.id)
          }
        });
        this.criteria.spouseexcludeimgrationrefusalcountry = this.criteria.spouseexcludeimgrationrefusalcountry.join(',')
      } else {
        this.criteria.spouseexcludeimgrationrefusalcountry = []
      }
      if (this.criteria.isimmigrationrefusalallowcases == true) {
        this.criteria.excludeimgrationrefusalcountry = []
        jsonData.countrylist.forEach(element => {
          if (element.excludeimgrationrefusalcountry == 'yes') {
            this.criteria.excludeimgrationrefusalcountry.push(element.id);
          }
        });
        this.criteria.excludeimgrationrefusalcountry = this.criteria.excludeimgrationrefusalcountry.join(',');
      } else {
        this.criteria.spouseexcludeimgrationrefusalcountry = []
      }
      this.courseslist = [];
      jsonData.Courses.forEach(element => {
        if (element.select == 'yes') {
          this.courseslist.push(element.id);
        }
      });
      courselistids = this.courseslist.join(',');
      if (this.medianames) {
        this.boardandinterviewdata.push({ name: this.medianames, boardtype: null, countryid: 0, type: 'interviewdata', createdby: this.uid, updatedby: this.uid })
      }

      jsonData.EducationRequirement.forEach(element => {
        this.boardandinterviewdata.push({
          name: element.Boardname,
          boardtype: element.Boardtype,
          countryid: this.criteria.countryid,
          type: "boarddata",
          createdby: this.uid,
          updatedby: this.uid
        })
      });
      const eductionaldata = jsonData.EducationRequirement
      this.criteria.tenth = [];
      this.criteria.tweth = [];
      this.criteria.diploma = [];
      this.criteria.bachelor = [];
      const bords = {
        boardandinterview: this.boardandinterviewdata,
        universitytypeid: this.criteria.universitytypeid,
        universityid: this.criteria.universityid,
        studylevelid: this.criteria.studylevelid
      };
      this.criteriaService.saveboardandinterview(bords).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        // console.log("DATA==>", data)
        if (data.flag == true) {
          const interviewdata = data.outdatalist[1]
          this.boarddata = data.outdatalist[0]
          this.alreadyexits = data.outdatalist[2]
          interviewdata.forEach(element => {
            if (element.name == this.medianames) {
              this.medialist.push({ id: element.id, name: element.name });
              this.medialist = this.medialist.splice(0);
              this.medianame = '';
              this.criteria.ineterviewmediaid = element.id
              this.cd.markForCheck();
            }
          })

          if (this.boarddata.length > 0) {
            this.boarddata.forEach(data => {
              if (data.type == 'tenth') {
                for (let i = 0; i < eductionaldata.length; i++) {
                  if (data.type == eductionaldata[i].Boardtype && data.name == eductionaldata[i].Boardname)
                    this.criteria.tenth.push({
                      bid: data.id, required: eductionaldata[i].Requiredmarks, gapallow: eductionaldata[i].AttempsAllows
                    });
                }
              }
              if (data.type == 'twelfth') {
                for (let i = 0; i < eductionaldata.length; i++) {
                  if (data.type == eductionaldata[i].Boardtype && data.name == eductionaldata[i].Boardname)
                    this.criteria.tweth.push({
                      bid: data.id, required: eductionaldata[i].Requiredmarks, gapallow: eductionaldata[i].AttempsAllows
                    });
                }
              }
              if (data.type == 'bachelor') {
                for (let i = 0; i < eductionaldata.length; i++) {
                  if (data.type == eductionaldata[i].Boardtype && data.name == eductionaldata[i].Boardname)
                    this.criteria.bachelor.push({
                      bid: data.id, required: eductionaldata[i].Requiredmarks, gapallow: eductionaldata[i].AttempsAllows
                    });
                }
              }
              if (data.type == 'diploma') {
                for (let i = 0; i < eductionaldata.length; i++) {
                  if (data.type == eductionaldata[i].Boardtype && data.name == eductionaldata[i].Boardname)
                    this.criteria.diploma.push({
                      bid: data.id, required: eductionaldata[i].Requiredmarks, gapallow: eductionaldata[i].AttempsAllows
                    });
                }
              }
            })
          }
          if (this.alreadyexits.length == 0) {
            this.criteria.id = 0
          } else {
            this.alreadyexits.forEach(element => {
              this.criteria.id = element.id
              if (element.isdeleted == true) {
                element.isdeleted = false
              }
            })
          }
          this.criteriaService.saveCriteria(this.criteria, courselistids).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
            if (data.flag) {
              this.mservice.generateMessage('SUCCESS', 'SUCCESS', 'Criteria saved!');
              this.criteria = new Criteria();
              this.loadService.loadme = false;
              this.router.navigate(['user/workspace/criteria/course-criteria']);
              this.getAllCriteria();
              this.cd.markForCheck();
            } else {
              this.mservice.generateMessage('ERROR', 'FAILED', data.message);
              this.loadService.loadme = false;
              this.cd.markForCheck();
            }
          });
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
      })
    };
    reader.readAsBinaryString(file);
  }
  generateExcelSample() {
    this.excelService.generateExcelForCourseCriteraiSample();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
