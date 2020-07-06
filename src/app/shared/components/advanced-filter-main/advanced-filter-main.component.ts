import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseAdvancedFiltersService, ManageAdvanceFilter } from 'src/app/services/course-filters.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdvCoursedetails, Country, Coursedetails, CourseFilter } from 'src/app/models/course.model';
import { AdvanceFilter } from 'src/app/models/advancefilter.model';
import { AdvancedfilterService } from '../../services/advancedfilter.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
declare const $: any;
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { EncDecService } from '../../services/enc-dec.service';
import { ToastService } from '../../services/message/toast.service';
import { LoaderService } from '../../services/message/loader.service';
@Component({
  selector: 'app-advanced-filter-main',
  templateUrl: './advanced-filter-main.component.html',
  styleUrls: ['./advanced-filter-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFilterMainComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  coursedetails = new AdvCoursedetails();
  universityidlistoriginal: any;
  universitytypeid: any = '';
  filterdata = new AdvanceFilter();
  countryJson = new Country();
  userid: any;
  nextFlag = false;
  prevFlag = false;
  saveFlag = false;
  userdata: any;
  step = 1;
  showresultFlag = false;
  filterCount = '';
  criteriaBoardListMain: any;
  criteriaBoardList: any;
  criteriaBoardType: any;
  isGap = false;
  courseCriteriaMoldel: any;
  @Output() advancedFilterModel = new EventEmitter<any>();
  constructor(
    private courseService: CourseService,
    public loadService: LoaderService,
    private advanceFilterService: AdvancedfilterService,
    public courseFilterModel: CourseAdvancedFiltersService,
    private adataservice: AuthdataService,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private jqservice: JQueryService,
    private mservice: ToastService,
  ) { }
  ngOnInit() {
    // this.jqservice.loadJS({src:'assets/js/jquery.magicsearch.min.js',defer: true, async: true})
    if (!this.filterdata.criteria) {
      this.filterdata.criteria = [];
      this.cd.markForCheck();
      this.addCriteriaTab();
    }
  }
  setGapAllowOption(value) {
    this.isGap = value;
    this.filterdata.isgapallow = value;
  }
  setWorkExperienceOption(value) {
    if (value === true) {
      this.filterdata.isworkexperienceapplicable = true;
    } else {
      this.filterdata.isworkexperienceapplicable = false;
      this.filterdata.workexperience = 0;
    }
    this.cd.markForCheck();
  }
  setImmigrationOption(value, type) {
    if (type === 'img') {
      if (value === true) {
        this.filterdata.isimmigrationrefusalallow = true;
      } else {
        this.filterdata.isimmigrationrefusalallow = false;
        this.filterdata.isimmigrationrefusalallowcases = false;
        this.filterdata.excludeimgrationrefusalcountry = [];
      }
    } else if (type === 'imgcases') {
      if (value === true) {
        this.filterdata.isimmigrationrefusalallowcases = true;
      } else {
        this.filterdata.isimmigrationrefusalallowcases = false;
        this.filterdata.excludeimgrationrefusalcountry = [];
      }
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          $('.selectpicker').selectpicker();
        }, 100);
      }

    }
    this.cd.markForCheck();
  }
  initializeJq() {
    this.saveFlag = false;
    this.showresultFlag = false;
    this.nextFlag = false;
    this.prevFlag = false;
    this.step = 1;
    this.setUserInfo();
    this.getDropDownValues();
    this.cd.markForCheck();
  }
  setUserInfo() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    if (this.userdata) {
      this.userid = this.userdata.uid;
      this.cd.markForCheck();
    }
  }
  getFilterData() {
    const newuserid = this.encdec.encryptSensitive(this.userid.toString());
    this.advanceFilterService.getFilterData(newuserid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0] && data.outdatalist[0].length > 0) {
        this.filterdata = JSON.parse(data.outdatalist[0][0].filterjson);
        this.getCriteriaBoardType();
        this.cd.markForCheck();
      }
      this.getCourseCount();
    });
  }
  addCriteriaTab() {
    this.filterdata.criteria.push({
      boardtype: '',
      boardname: '',
      marksobtained: '',
      attemptsmade: ''
    });

    this.cd.markForCheck();
  }

  removeCriteriaTab(index) {
    //console.log("this.filterdata.criteria.length ->", this.filterdata.criteria.length);
    if (this.filterdata.criteria.length > 1) {
      this.filterdata.criteria.splice(index, 1);
      this.getCourseCount();
      this.cd.markForCheck();
    }
  }
  saveDetails(event, step) {
    let payload = {
      userid: this.encdec.encryptSensitive(this.userid.toString()),
      filterjson: this.filterdata
    }
    this.advanceFilterService.saveAdvanceFilter(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (this.saveFlag && event === 's') {
        this.nextFlag = true;
        this.saveFlag = false;
        this.showresultFlag = true;
        this.prevFlag = true;
      } else if (event === 'n') {
        this.step = step;
        if (step === 3) {
          this.saveFlag = true;
          this.showresultFlag = false;
          this.nextFlag = true;
          this.prevFlag = true;
        } else {
          this.saveFlag = false;
          this.prevFlag = true;
          this.showresultFlag = false;
          this.nextFlag = false;
        }
        if (step === 1) {
          this.prevFlag = false;
        }
      }
      this.cd.markForCheck();

    });
  }
  getCourseCount() {
    this.fillAdvFilterModel();
    this.loadService.loadme = true;
    this.advanceFilterService.getCourseCount(this.courseCriteriaMoldel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.filterCount = JSON.parse(data.outdatalist[0])[0].coursecount + '';
        this.cd.markForCheck();
      }
      this.loadService.loadme = false;
    });
  }
  fillAdvFilterModel() {
    // let country = '';
    // let univname = '';
    // let discipline = '';
    // let excluseCountryList = '';


    // if (this.filterdata.excludeimgrationrefusalcountry) {

    //   for (let u of this.filterdata.excludeimgrationrefusalcountry) {
    //     excluseCountryList += u + ',';
    //   }
    //   excluseCountryList = excluseCountryList.substring(0, excluseCountryList.length - 1);
    // }


    // this.ManageAdvanceFilter.country = country;
    // this.ManageAdvanceFilter.discipline = discipline;
    // this.ManageAdvanceFilter.univname = univname;
    if (this.courseCriteriaMoldel) {
      if (this.filterdata.criteria.length == 1 && this.filterdata.criteria[0].boardtype == '' && this.filterdata.criteria[0].boardname == '') {
        this.courseCriteriaMoldel.criteriaJSON = [];
      } else {
        this.courseCriteriaMoldel.criteriaJSON = this.filterdata.criteria;
      }
      this.courseCriteriaMoldel.etype = this.filterdata.etype;
      this.courseCriteriaMoldel.R = parseFloat((this.filterdata.R.length > 0) ? this.filterdata.R : '0');
      this.courseCriteriaMoldel.W = parseFloat((this.filterdata.W.length > 0) ? this.filterdata.W : '0');
      this.courseCriteriaMoldel.L = parseFloat((this.filterdata.L.length > 0) ? this.filterdata.L : '0');
      this.courseCriteriaMoldel.S = parseFloat((this.filterdata.S.length > 0) ? this.filterdata.S : '0');
      this.courseCriteriaMoldel.O = parseFloat((this.filterdata.O.length > 0) ? this.filterdata.O : '0');
    }


    // this.ManageAdvanceFilter.isgapallow = this.filterdata.isgapallow;
    // this.ManageAdvanceFilter.isimmigrationrefusalallow = this.filterdata.isimmigrationrefusalallow;
    // this.ManageAdvanceFilter.isimmigrationrefusalallowcases = this.filterdata.isimmigrationrefusalallowcases;
    // this.ManageAdvanceFilter.excludeimgrationrefusalcountry = excluseCountryList;
    // this.ManageAdvanceFilter.gapduration = this.filterdata.gapduration;
    // this.ManageAdvanceFilter.isworkexperienceapplicable = this.filterdata.isworkexperienceapplicable;
    // this.ManageAdvanceFilter.workexperience = this.filterdata.workexperience;
    this.cd.markForCheck();
  }
  showResults() {
    this.cd.markForCheck();
    this.fillAdvFilterModel();
    this.advancedFilterModel.emit(this.courseCriteriaMoldel);
  }
  getDropDownValues() {
    this.courseService.getDropDownValues().pipe(takeUntil(this.componentDestroyed$)).subscribe(dropDownValues => {
      if (dropDownValues.flag) {
        this.coursedetails.universitylist = JSON.parse(dropDownValues.outdatalist[3]);
        this.universityidlistoriginal = JSON.parse(dropDownValues.outdatalist[3]);
        this.coursedetails.intakelist = (dropDownValues.outdatalist[4] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[4]) : [];
        this.coursedetails.countrylist = JSON.parse(dropDownValues.outdatalist[0]);
        this.coursedetails.statelist = [];
        this.coursedetails.citylist = [];
        this.coursedetails.originalstatelist = JSON.parse(dropDownValues.outdatalist[1]);
        this.coursedetails.originalcitylist = JSON.parse(dropDownValues.outdatalist[2]);
        this.coursedetails.educationleveldata = JSON.parse(dropDownValues.outdatalist[5]);
        this.coursedetails.institutetypelist = JSON.parse(dropDownValues.outdatalist[6]);
        this.coursedetails.disciplinelist = JSON.parse(dropDownValues.outdatalist[7]);
        this.coursedetails.examtype = JSON.parse(dropDownValues.outdatalist[8]);
        this.coursedetails.criteriacountry = JSON.parse(dropDownValues.outdatalist[9]);
        this.coursedetails.criteriaboardlist = JSON.parse(dropDownValues.outdatalist[10]);
        this.cd.markForCheck();
        this.filterstateonload();
        this.filtercityonload();
        if (this.userid) {
          this.getFilterData();
        }

      }
    });
  }
  filterstateonload() {
    if (this.courseFilterModel.dcountryid > 0) {
      this.coursedetails.statelist = this.coursedetails.originalstatelist.filter(data => data.countryid === this.courseFilterModel.dcountryid);
    }
    this.cd.markForCheck();
  }
  filtercityonload() {
    if (this.courseFilterModel.stateid > 0) {
      this.coursedetails.citylist = this.coursedetails.originalcitylist.filter(data => data.stateid === this.courseFilterModel.stateid);
    }
    this.cd.markForCheck();
  }

  getCourseByFilterFees() {
    if (this.courseFilterModel.maxfees === 0) {
      this.courseFilterModel.minfees = 0;
    } else if (this.courseFilterModel.maxfees === 20000) {
      this.courseFilterModel.minfees = 0;
    } else if (this.courseFilterModel.maxfees === 50000) {
      this.courseFilterModel.minfees = 20000;
    } else if (this.courseFilterModel.maxfees === 100000) {
      this.courseFilterModel.minfees = 50000;
    } else if (this.courseFilterModel.maxfees === 100001) {
      this.courseFilterModel.minfees = 100001;
    }
    this.cd.markForCheck();
    // this.getCourseByFilter();
  }

  getCriteriaBoardType() {
    this.criteriaBoardListMain = this.coursedetails.criteriaboardlist.filter(val => {
      return val.countryid === this.filterdata.scountry;
    });
    this.criteriaBoardType = this.criteriaBoardListMain.filter(
      (thing, i, arr) => arr.findIndex(t => t.type === thing.type) === i
    );
  }
  clearCriteriaBoard() {
    this.filterdata.criteria = [];
    this.addCriteriaTab();
    this.filterdata.isworkexperienceapplicable = false;
    this.filterdata.isgapallow = false;
    this.filterdata.gapduration = 0;
    this.filterdata.workexperience = 0;
    this.filterdata.isimmigrationrefusalallow = false;
    this.filterdata.isimmigrationrefusalallowcases = false;
    this.filterdata.excludeimgrationrefusalcountry = [];
  }
  getCriteriaBoardList(criteria) {
    this.criteriaBoardList = this.criteriaBoardType.filter(val => {
      return val.type === this.filterdata.criteria[0].boardtype;
    });
    criteria.boardname = '';
    criteria.marksobtained = '';
    criteria.attemptsmade = '';
    this.getCourseCount();
  }
  AcceptNumericOnly(event, allowPeriod) {
    const keyCode = event.which ? event.which : event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57) ||         //lets allow only numerics 
      ((allowPeriod == true) && (keyCode == 46))  //allow period conditionally based on the control's choice
    ) {
      return true;
    }

    return false;
  }
  clearIeltsInput() {
    this.filterdata.etype = '';
    this.filterdata.R = '';
    this.filterdata.W = '';
    this.filterdata.L = '';
    this.filterdata.S = '';
    this.filterdata.O = '';
    $('#txtR_0').css('background-color', '');
    $('#txtW_0').css('background-color', '');
    $('#txtL_0').css('background-color', '');
    $('#txtS_0').css('background-color', '');
    $('#txtO_0').css('background-color', '');
    this.getCourseCount();
  }
  validateIeltsInput($event, value, etype) {
    let targetid = $event.target.id;
    switch (etype) {
      case 'ielts':
        this.checkRange(value, targetid, 0, 9, etype);
        break;
      case 'pte':
        this.checkRange(value, targetid, 0, 90, etype);
        break;
      case 'ibt':
        this.checkRange(value, targetid, 0, 120, etype);
        break;
      case 'pbt':
        this.checkRange(value, targetid, 310, 677, etype);
        break;
      case 'cae':
        this.checkRange(value, targetid, 80, 230, etype);
        break;
      case 'cpe':
        this.checkRange(value, targetid, 80, 230, etype);
        break;
      default:
        break;
    }
  }
  checkRange(value, targetid, min, max, etype) {
    if (!(value > min && value <= max)) {
      if (isPlatformBrowser(this._platformId)) {
        $('#' + targetid).val('');
        $('#' + targetid).focus();
      }
      // this.mservice.generateMessage('INFO', 'Please provide valid input for ' + etype.toUpperCase(), '');
      $('#' + targetid).css('background-color', '#EE4F4F');
    } else {
      $('#' + targetid).css('background-color', '');
    }

  }
}
