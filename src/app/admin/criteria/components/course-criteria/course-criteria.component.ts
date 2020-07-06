import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';


import { ToastService } from 'src/app/shared/services/message/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/message/loader.service';

declare const performjsAction: any;
declare const $: any;
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Criteria } from 'src/app/admin/models/criteria';
import { CourseCriteriaService } from '../../services/course-criteria.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from '../../services/excel.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Component({
  selector: 'app-course-criteria',
  templateUrl: './course-criteria.component.html',
  styleUrls: ['./course-criteria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CourseCriteriaComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  courselist: any = [];
  universitytype: any;
  universityidlist: any;
  universityidlistoriginal: any;
  studylevellist: any;
  countrylist: any;
  boardname: any = '';
  medianame: any = '';
  countryaname: any = '';
  boardtype: any = '';
  boardisexist: any = false;
  boardlist: any = [];
  medialist: any = [];
  criteriacountrylist: any = [];
  criteria = new Criteria();
  criteriaid: any = 0;
  courselistselected: any = [];
  submitted = false;
  countryid: any = '';
  dd
  datas = {
    "tenth": [],
    "twelveth": [],
    "diploma": [],
    "bachelor": []
  }
  willDownload = false;
  icountryid: any;
  arr = []
  tenarr = []
  tarr = []
  darr = []
  barr = []
  mcriterai = []
  interviewcriterai = []
  immigrationarr = []
  simmigration = []
  dataString
  arrs = []
  coursecriterai = {
    
    "countryid": Number,
    "studylevelid":Number,
    "universityid":Number,
    "courses":[],
    "countrylist":[],
}

  downloadJsonHref

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private criteriaService: CourseCriteriaService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private excelService: ExcelService,
    private encdec: EncDecService,
    @Inject(PLATFORM_ID) private _platformId: Object) { }

  ngOnInit() {
    this.loadService.loadme = true;
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.criteriaid = this.encdec.convertText('dec', params.criteriaid.toString());
      this.cd.markForCheck();
    });
  
    if (this.criteriaid > 0) {
       this.getDetailsForEdit();
    } else {
      this.criteriaService.getCriteriaFilter().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
       
        if (data.flag) {
          this.universitytype = data.outdatalist[2];
          this.universityidlist = data.outdatalist[0];
          this.universityidlistoriginal = data.outdatalist[0];
          this.studylevellist = data.outdatalist[1];
          this.countrylist = data.outdatalist[3];

          this.createDummyCriteria();
          this.cd.markForCheck();
          this.loadService.loadme = false;
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
      });
    }

    if (isPlatformBrowser(this._platformId)) {
      performjsAction();
    }

  }

  getDetailsForEdit() {
    this.criteriaService.getCourseCriteriaByID(this.criteriaid).pipe(takeUntil(this.componentDestroyed$)).subscribe(result => {

      if (result.flag) {

        if (result.outdatalist[0][0]) {
          this.criteria = result.outdatalist[0][0];
          this.courselistselected = JSON.parse(result.outdatalist[0][0].courselist);
          const educationreqlist = JSON.parse(result.outdatalist[0][0].educationreqlist);
          const cclist = JSON.parse(result.outdatalist[0][0].coursecountrylist);
          this.criteria.tenth = educationreqlist.filter(ej => ej.etype === 'tenth');
          this.criteria.tweth = educationreqlist.filter(ej => ej.etype === 'twelfth');
          this.criteria.diploma = educationreqlist.filter(ej => ej.etype === 'diploma');
          this.criteria.bachelor = educationreqlist.filter(ej => ej.etype === 'bachelor');
          if (!this.criteria.isapplicablebachelor) {
            this.addbachelor();
          }
          if (!this.criteria.isapplicablediploma) {
            this.adddiploma();
          }
          if (!this.criteria.isapplicabletwelfth) {
            this.addtweth();
          }
          if (!this.criteria.isapplicabletenth) {
            this.addtenth();
          }
          this.courselist = result.outdatalist[1];
          this.boardlist = result.outdatalist[2];
          this.medialist = result.outdatalist[3];
          this.criteriacountrylist = result.outdatalist[4];
          this.criteria.excludeimgrationrefusalcountry = [];
          this.criteria.spouseexcludeimgrationrefusalcountry = [];
         
          if (cclist) {
            for (const country of cclist) {
              if (country.usertype === 'self') {
                this.criteria.excludeimgrationrefusalcountry.push(country.countryid);
              } else if (country.usertype === 'spouse') {
                this.criteria.spouseexcludeimgrationrefusalcountry.push(country.countryid);
              }
            }
          }
          if (isPlatformBrowser(this._platformId)) {
            setTimeout(() => {
              $('.selectpicker').selectpicker();
            }, 100);
          }
          if (this.courselist.length === 0) {
            this.mservice.generateMessage('WARNING', 'Content not available', 'Courses are not available for selected criteria!');
          }
          if (isPlatformBrowser(this._platformId)) {
            setTimeout(() => {
              this.courselistselected.forEach(element => {
                $('#' + element.ecrid).attr('checked', true);
              });
              this.clearCheckAll('all', 'crs');
            }, 100);
            performjsAction();
          }

          this.loadService.loadme = false;
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED',
            'Records not available for your requested criteria, either deleted or not added.');
          this.loadService.loadme = false;
        }
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', result.message);
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });

  }
  getAllCourse(headform) {
    if (headform.valid) {
      this.loadService.loadme = true;
      this.criteriaService.getAllCourseList(this.criteria.universityid, this.criteria.studylevelid,
        this.criteria.countryid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.courselist = data.outdatalist[0];
            this.boardlist = data.outdatalist[2];
            this.criteriacountrylist = data.outdatalist[4];
            this.medialist = data.outdatalist[3];
            if (this.courselist.length === 0) {
              this.mservice.generateMessage('WARNING', 'Content not available', 'It`s maybe because you already mapped them or not have availability of the courses for the selected criteria!');
            }
            if (isPlatformBrowser(this._platformId)) {
              performjsAction();
            }

            this.loadService.loadme = false;
          } else {
            this.mservice.generateMessage('ERROR', 'FAILED', data.message);
            this.courselist = [];
            this.boardlist = [];
            this.criteriacountrylist = [];
            this.medialist = [];
            this.loadService.loadme = false;
          }
          this.cd.markForCheck()
        });
    }
  }
  clearFilter() {
    this.criteria = new Criteria();
    this.courselist = [];
    this.cd.markForCheck();
  }


  saveBoards(boardform) {
    if (boardform.valid) {
      this.loadService.loadme = true;
      this.boardisexist = false;
      this.criteriaService.saveBoards(this.boardname, this.boardtype, this.criteria.countryid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdatalist[0][0].id !== -1) {
            this.boardlist.push({ id: data.outdatalist[0][0].id, name: this.boardname, type: this.boardtype });
            this.boardlist = this.boardlist.splice(0);
            if (isPlatformBrowser(this._platformId)) {
              $('#addboard').modal('hide');
            }
            this.mservice.generateMessage('SUCCESS', 'SUCCESS',
              (this.boardtype === 'diploma' || this.boardtype === 'bachelor') ? 'Section' : 'Board' + ' name saved!.');
            this.boardname = '';
            this.boardtype = '';
          } else {
            this.boardisexist = true;
            this.mservice.generateMessage('ERROR', 'Already exists',
              (this.boardtype === 'diploma' || this.boardtype === 'bachelor') ? 'Section' : 'Board' +
                ' name is already exists for the country!.');
          }
          this.loadService.loadme = false;
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          this.loadService.loadme = false;
        }
        this.cd.markForCheck()
      });
    }
  }
  saveInterviewMedia(mediaform) {
    if (mediaform.valid) {
      this.loadService.loadme = true;
      this.boardisexist = false;
      this.criteriaService.saveInterviewMedia(this.medianame).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.medialist.push({ id: data.outdata, name: this.medianame });
            this.medialist = this.medialist.splice(0);
            this.medianame = '';
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }
            this.mservice.generateMessage('SUCCESS', 'SUCCESS', 'Media name saved!.');
          } else {
            this.boardisexist = true;
            this.mservice.generateMessage('ERROR', 'Already exists', 'Media name is already exists!.');
          }
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
        this.loadService.loadme = false;
        this.cd.markForCheck()
      });
    }
  }
  createDummyCriteria() {
    this.criteria.tenth = [];
    this.criteria.tenth.push({
      bid: '', required: '', gapallow: 0
    });
    this.criteria.tweth = [];
    this.criteria.tweth.push({
      bid: '', required: '', gapallow: 0
    });
    this.criteria.bachelor = [];
    this.criteria.bachelor.push({
      bid: '', required: '', gapallow: 0
    });
    this.criteria.diploma = [];
    this.criteria.diploma.push({
      bid: '', required: '', gapallow: 0
    });
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.selectpicker').selectpicker();
      }, 100);
    }
    this.cd.markForCheck();
  }
  getUniversityListByType() {
    if (this.criteria.universitytypeid > 0) {
      this.universityidlist = this.universityidlistoriginal.filter(u => u.universitytypeid === this.criteria.universitytypeid);
    } else {
      this.universityidlist = this.universityidlistoriginal;
    }
    this.cd.markForCheck();
  }
  addtenth() {
    this.criteria.tenth.push({
      bid: '', required: '', gapallow: 0
    });
    if (isPlatformBrowser(this._platformId)) {
      performjsAction();
    }
    this.cd.markForCheck();
  }
  removetenth(index) {
    this.criteria.tenth.splice(index, 1);
    this.cd.markForCheck();
  }
  addtweth() {
    this.criteria.tweth.push({
      bid: '', required: '', gapallow: 0
    });
    if (isPlatformBrowser(this._platformId)) {
      performjsAction();
    }
    this.cd.markForCheck();
  }
  removetweth(index) {
    this.criteria.tweth.splice(index, 1);
    this.cd.markForCheck();
  }
  addbachelor() {
    this.criteria.bachelor.push({
      bid: '', required: '', gapallow: 0
    });
    if (isPlatformBrowser(this._platformId)) {
      performjsAction();
    }
    this.cd.markForCheck();
  }
  removebachelor(index) {
    this.criteria.bachelor.splice(index, 1);
    this.cd.markForCheck();
  }
  adddiploma() {
    this.criteria.diploma.push({
      bid: '', required: '', gapallow: 0
    });
    if (isPlatformBrowser(this._platformId)) {
      performjsAction();
    }
    this.cd.markForCheck();
  }
  removediploma(index) {
    this.criteria.diploma.splice(index, 1);
    this.cd.markForCheck();
  }

  // set radio options
  setImmigrationOption(value, type) {
    if (type === 'img') {
      if (value === true) {
        this.criteria.isimmigrationrefusalallow = true;
      } else {
        this.criteria.isimmigrationrefusalallow = false;
        this.criteria.isimmigrationrefusalallowcases = false;
        this.criteria.excludeimgrationrefusalcountry = [];
      }
    } else if (type === 'imgcases') {
      if (value === true) {
        this.criteria.isimmigrationrefusalallowcases = true;
      } else {
        this.criteria.isimmigrationrefusalallowcases = false;
        this.criteria.excludeimgrationrefusalcountry = [];
      }
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          $('.selectpicker').selectpicker();
        }, 100);
      }

    }
    this.cd.markForCheck();
  }
  setSpouseImmigrationOption(value, type) {
    if (type === 'img') {
      if (value === true) {
        this.criteria.isimmigrationspouserefusalallow = true;
      } else {
        this.criteria.isimmigrationspouserefusalallow = false;
        this.criteria.isimmigrationspouserefusalallowcases = false;
        this.criteria.spouseexcludeimgrationrefusalcountry = [];
      }
    } else if (type === 'imgcases') {
      if (value === true) {
        this.criteria.isimmigrationspouserefusalallowcases = true;
      } else {
        this.criteria.isimmigrationspouserefusalallowcases = false;
        this.criteria.spouseexcludeimgrationrefusalcountry = [];
      }
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          $('.selectpicker').selectpicker();
        }, 100);
      }

    }
    this.cd.markForCheck();
  }
  setWorkExperienceOption(value) {
    if (value === true) {
      this.criteria.isworkexperienceapplicable = true;
    } else {
      this.criteria.isworkexperienceapplicable = false;
      this.criteria.workexperience = 0;
    }
    this.cd.markForCheck();
  }

  // select/unselect all check boxes
  checkAll(parentname: any, childname: any) {
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = document.getElementsByName(childname);
      const parentbox: any = document.getElementsByName(parentname);
      if (parentbox[0].checked) {
        for (const box of checkboxes) {
          box.checked = true;
        }
      } else {
        for (const box of checkboxes) {
          box.checked = false;
        }
      }
    }
    this.cd.markForCheck();
  }

  clearCheckAll(parentname: any, childname: any) {
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = document.getElementsByName(childname);
      const parentbox: any = document.getElementsByName(parentname);
      let checkedboxes = 0;
      for (const box of checkboxes) {
        if (box.checked === true) {
          checkedboxes++;
        }
      }
      if (checkedboxes === checkboxes.length) {
        parentbox[0].checked = true;
      } else {
        parentbox[0].checked = false;
      }
      this.cd.markForCheck();
    }

  }
  // save all criteria
  saveCriteria(mainform) {
    if (mainform.valid) {
      this.loadService.loadme = true;
      this.submitted = true;
      const checkboxeslist = [];
      if (isPlatformBrowser(this._platformId)) {

        const checkboxes: any = document.getElementsByName('crs');
        for (const box of checkboxes) {
          if (box.checked === true) {
            checkboxeslist.push(box.id);
          }
        }
      }      
      if (checkboxeslist.length > 0) {
        const courselistids = checkboxeslist.join(',');
        this.criteria.excludeimgrationrefusalcountry = this.criteria.excludeimgrationrefusalcountry.join(',');
        this.criteria.spouseexcludeimgrationrefusalcountry = this.criteria.spouseexcludeimgrationrefusalcountry.join(',');
        // console.log("SaveCriterai==>",this.criteria)
        this.criteriaService.saveCriteria(this.criteria, courselistids).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.mservice.generateMessage('SUCCESS', 'SUCCESS', 'Criteria saved!');
            this.criteria = new Criteria();
            this.submitted = false;
            this.loadService.loadme = false;
            this.router.navigate(['user/workspace/criteria/course-criteria']);
          } else {
            this.mservice.generateMessage('ERROR', 'FAILED', data.message);
            this.submitted = false;
            this.loadService.loadme = false;
          }
          this.cd.markForCheck()
        });
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', 'Please select atleast one course to go.');
        this.submitted = false;
      }
    }
  }

  saveCriteriaCountry(mediaform) {
    if (mediaform.valid) {
      this.loadService.loadme = true;
      this.criteriaService.saveCriteriaCountry(this.countryaname).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.criteriacountrylist.push({ id: data.outdata, name: this.countryaname });
            this.criteriacountrylist = this.criteriacountrylist.splice(0);
            this.countryaname = '';
            if (isPlatformBrowser(this._platformId)) {
              $('.selectpicker').selectpicker('refresh');
              $('#country').modal('hide');
            }

            this.mservice.generateMessage('SUCCESS', 'SUCCESS', 'Country name saved!.');
          } else {
            this.mservice.generateMessage('ERROR', 'Already exists', 'Country name is already exists!.');
          }
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
        this.loadService.loadme = false;
        this.cd.markForCheck()
      });
    }
  }
  resetCriteria() {
    this.criteria = new Criteria();
    this.createDummyCriteria();
    this.courselist = [];
    this.courselistselected = [];
    this.cd.markForCheck();
  }
  resetPartialInfor() {
    if (!this.criteria.isgapallow) {
      this.criteria.gapduration = 0;
      this.criteria.workexperience = 0;
      this.criteria.isworkexperienceapplicable = false;
    }
    if (!this.criteria.isimmigrationapplicable) {
      this.criteria.isimmigrationapplicable = false;
      this.criteria.isimmigrationrefusalallow = false;
      this.criteria.isimmigrationrefusalallowcases = false;
      this.criteria.excludeimgrationrefusalcountry = [];
    }
    if (!this.criteria.ismarriageapplicable) {
      this.criteria.spouseincome = 0;
      this.criteria.spousequalification = '';
      this.criteria.marriageduration = 0;
      this.criteria.isspouseimmigrationapplicable = false;
      this.criteria.isimmigrationspouserefusalallow = false;
      this.criteria.isimmigrationspouserefusalallowcases = false;
      this.criteria.spouseexcludeimgrationrefusalcountry = [];
    }
    if (!this.criteria.isspouseimmigrationapplicable) {
      this.criteria.isimmigrationspouserefusalallow = false;
      this.criteria.isimmigrationspouserefusalallowcases = false;
      this.criteria.spouseexcludeimgrationrefusalcountry = [];
    }
    if (!this.criteria.isinterviewapplicable) {
      this.criteria.ineterviewmediaid = 0;
      this.criteria.interviewprocess = '';
    }
    if (!this.criteria.isapplicablebachelor) {
      this.criteria.bachelor = [];
      this.criteria.bachelor.push({
        bid: '', required: '', gapallow: 0
      });
    }
    if (!this.criteria.isapplicablediploma) {
      this.criteria.diploma = [];
      this.criteria.diploma.push({
        bid: '', required: '', gapallow: 0
      });
    }
    if (!this.criteria.isapplicabletwelfth) {
      this.criteria.tweth = [];
      this.criteria.tweth.push({
        bid: '', required: '', gapallow: 0
      });
    }
    if (!this.criteria.isapplicabletenth) {
      this.criteria.tenth = [];
      this.criteria.tenth.push({
        bid: '', required: '', gapallow: 0
      });
    }
    this.cd.markForCheck();

  }
  public trackByIndex(index: number) {
    return index;
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
