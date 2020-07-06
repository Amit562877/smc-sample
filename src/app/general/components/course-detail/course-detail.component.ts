import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { CourseService } from 'src/app/services/course.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Searchhints } from 'src/app/models/course.model';
import { VisachecklistService } from 'src/app/services/visachecklist.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { environment } from 'src/environments/environment';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Location } from '@angular/common';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { OrderByPipe } from '../../../shared/pipes/oneform.pipe';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { HttpRequest, HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { element } from 'protractor';
declare const performjsAction: any;
declare const topFunction: any;
declare const $: any;
declare const moment: any;
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  providers: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CourseDetailComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private encdec: EncDecService,
    public loadService: LoaderService,
    public visaService: VisachecklistService,
    private mservice: ToastService,
    private location: Location,
    public pdfService: PdfService,
    private adataservice: AuthdataService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private orderByPipe: OrderByPipe,
    private cd: ChangeDetectorRef,
    private jqservice: JQueryService,
    private httpclient: HttpClient
  ) { }

  // cid: string;
  environment = environment;
  searchhints = new Searchhints();
  courseid: string;
  universityid: string;
  coursedata: any;
  universitydata: any;
  universityrankingdata: any;
  topcourses: any;
  sviewurl: string;
  searchstring: any = '';
  isbuttonclicke = false;
  lodgementdetails: any;
  documentlist: any;
  documentcountrylist: any;
  documentrelationshiplist: any = [];
  documentrelationshiplistfixed: any = [1, 2, 3, 4, 15];
  servicedocumentlist: any;
  documentid: any = '';
  doccountryid: any = '';
  docrelationid: any = '';
  funddata: any = [];
  isotherapplicant: any = false;
  tuitionfees: any = 0;
  travelcoast: any = 0;
  livingcost: any = 0;
  totaltuitionfees: any = 0;
  totaltravelcoast: any = 0;
  totallivingcost: any = 0;
  totalschoolfees: any = 0;
  graceamount: any = 2000;
  nettotal: any = 0;
  servicedocuments = false;
  lodgement = false;
  docemailSubmitted = false;
  // ----------- start param document send email ----------//

  uid = 0;
  username = '';
  password = '';
  staysignin = false;
  autologin = true;
  favcnt: any;
  submitted = false;
  ischeckin = false;
  showmwnu = false;
  showfavcnt: any;
  cid: number;
  userid: number;
  projectid: number;
  usertypeid: number;
  tblname: string;
  check: boolean = true;
  visitcnt: any;
  description: any;
  course: any;
  selectissuetype: any;
  selectusertype: any;
  name: any;
  email: any;
  company: any;
  position: any;
  userdata: any;
  favdata: any;

  txtname: any;
  txtemail: any;
  txtphone: any;

  divFocusFlag = false;
  inputFocusFlag = false;
  currentSection = 'about-university-tab';
  universitycampus: string;
  favoriteHide: boolean;
  currencyList: any;
  tmpcoursedata: any;
  setDefaultCurrency = '1:AUD';
  // ----------- start param send email inquiry----------//
  inquiryName: any;
  inquiryEmail: any;
  inquiryPhone: any;
  datas: any;
  checklistdownloadPDF = false;
  formData = new FormData();
  imagepath: any;
  fileupload: any = null;

  prepare = false;
  download = false;
  downloadpr = 0;
  totalsize = 0;
  downloadedsize = 0;
  speed = '';
  leadInquiryPayload = {
    name: '',
    email: '',
    phoneno: '',
    comments: ''
  };
  feedbackPayload = {
    name: '',
    email: '',
    phoneno: '',
    feedback: ''
  };
  modalFlag = '';
  useremail: any;
  permissions: any = {};
  // councellor view
  editCouncellorFees: any;
  tmpeditCouncellorFees: any;
  editCouncellorIntakes: any;
  tmpeditCouncellorIntakes: any;
  editCouncellorEngreq: any;
  tmpeditCouncellorEngreq: any;
  switchFlag = 'original';
  viewtype = 'original';
  ngOnInit() {
    this.showmwnu = (window.location === window.parent.location);
    this.permissions = this.adataservice.getPermission('Councellor');

    //this.jqservice.loadJS({src:'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',defer: true, async: true})
    //this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (JSON.parse(this.adataservice.getUserData())[0]) : '';

    this.setUserInfo();

    this.loadService.loadme = true;

    if (this.router.url.indexOf('/program/course-detail/search/') > -1) {
      this.favoriteHide = true;
    } else {
      this.favoriteHide = false;
    }
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.courseid = params.courseid.toString();
      this.universityid = params.universityid.toString();
      this.universitycampus = params.universitycampus.toString();
      this.viewtype = params.viewtype.toString();
    });

    this.courseService.getCoursesDetailsByProps(this.courseid, this.universityid, this.uid, this.universitycampus).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      try {
        this.coursedata = JSON.parse(data.outdatalist[0]);
        this.tmpcoursedata = JSON.parse(JSON.parse(data.outdatalist[0])[0].coursedata);
        this.cid = this.coursedata[0].courseid;
        this.showfavcnt = (data.outdatalist[4] !== 'No Data Found') ? JSON.parse(data.outdatalist[4]) : [];
        this.coursedata = JSON.parse(this.coursedata[0].coursedata);
        this.favcnt = (data.outdatalist[5] !== 'No Data Found') ? JSON.parse(data.outdatalist[5]) : [];
        this.visitcnt = (data.outdatalist[6] !== 'No Data Found') ? JSON.parse(data.outdatalist[6]) : [];
        this.favdata = (data.outdatalist[7] !== 'No Data Found') ? JSON.parse(data.outdatalist[7]) : [];
        //add to favorite
        if (this.showfavcnt.length > 0) {
          if (this.showfavcnt[0].favorite === true) {
            this.check = false;
          } else {
            this.check = true;
          }
        } else {
          this.check = true;
        }
        // Councellor details
        if (data.outdatalist[8] != 'No Data Found' && data.outdatalist[8].length > 0) {
          this.tmpeditCouncellorFees = JSON.parse(data.outdatalist[8]);
          this.setCouncellorDetails(JSON.parse(data.outdatalist[8]), 'fees');
        } else {
          this.tmpeditCouncellorFees = this.coursedata.course_tuition_fee;
          this.editCouncellorFees = $.extend(true, {}, this.tmpeditCouncellorFees);
        }
        if (data.outdatalist[9] != 'No Data Found' && data.outdatalist[9].length > 0) {
          this.tmpeditCouncellorIntakes = JSON.parse(data.outdatalist[9]);
          this.setCouncellorDetails(JSON.parse(data.outdatalist[9]), 'intake');
        } else {
          this.tmpeditCouncellorIntakes = this.coursedata.course_intake;
          this.editCouncellorIntakes = $.extend(true, {}, this.tmpeditCouncellorIntakes);
        }
        if (data.outdatalist[10] != 'No Data Found' && data.outdatalist[10].length > 0) {
          this.tmpeditCouncellorEngreq = JSON.parse(data.outdatalist[10]);
          this.setCouncellorDetails(JSON.parse(data.outdatalist[10]), 'engreq');
        } else {
          this.tmpeditCouncellorEngreq = this.coursedata.course_admission_requirement;
          this.editCouncellorEngreq = $.extend(true, {}, this.tmpeditCouncellorEngreq);
        }
        // funds
        this.tuitionfees = (this.coursedata.course_tuition_fee.fees[0].value.international_student.amount) ?
          this.coursedata.course_tuition_fee.fees[0].value.international_student.amount : 0;
        this.getTotalAmount();
        // funds
        this.universitydata = JSON.parse(data.outdatalist[1])[0];
        this.universityrankingdata = (data.outdatalist[3] !== 'No Data Found') ? JSON.parse(data.outdatalist[3]) : [];
        if (isPlatformBrowser(this._platformId)) {
          this.sviewurl = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyCkQ0pVMQyDUzOw0G5OUS71FpqrpbseX6Q
          &location=${this.universitydata.lat},${this.universitydata.long}
          &heading=210
          &pitch=10`;
        }
        if (this.viewtype != 'original') {
          this.switchView('C');
        }
        this.topcourses = (data.outdatalist[2] !== 'No Data Found') ? JSON.parse(data.outdatalist[2]) : [];
        this.loadService.loadme = false;
        if (isPlatformBrowser(this._platformId)) {

          performjsAction();
        }

      } catch (e) {
        console.log('error', e);
      }
      this.cd.markForCheck();
    });
    if (isPlatformBrowser(this._platformId)) {
      this.visaService.GetRelationtoyou((this.doccountryid ? this.doccountryid : 0), moment().format('DD-MM-YYYY')).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        const dummyarray = JSON.parse(data.outdatalist[0]).relationshiplist;
        dummyarray.forEach(element => {
          if (this.documentrelationshiplistfixed.includes(element.id)) {
            this.documentrelationshiplist.push(element);
          }
        });
        this.documentcountrylist = JSON.parse(data.outdatalist[2]).countrylist;
        this.cd.markForCheck();
      });
    }
    if (isPlatformBrowser(this._platformId)) {
      $(document).click(() => {
        if (this.inputFocusFlag == true && this.divFocusFlag == true) {
          $('#hint').hide();
        }
      });
    }
    this.GetCurencyList();
    this.cd.markForCheck();
  }
  GetCurencyList() {
    this.courseService.getCurrencyRates('../../../../assets/CurrencyList.json').pipe(takeUntil(this.componentDestroyed$)).subscribe(cdata => {
      this.currencyList = cdata;
      $.get('https://api.exchangeratesapi.io/latest?base=AUD', (data, status) => {
        let currData = data.rates;
        for (let i = 0; i < this.currencyList.length; i++) {
          this.currencyList[i].exchangerate = currData[this.currencyList[i]['shortname']];
        }
        this.currencyList = this.orderByPipe.transform(this.currencyList, 'shortname');
      });
    });
    this.cd.markForCheck();
  }
  changeCurrency() {
    let splitCurr = this.setDefaultCurrency.split(':');
    let ExchangeRate = splitCurr[0];
    for (let i = 0; i < this.tmpcoursedata.course_tuition_fee.fees.length; i++) {
      let feeData = this.tmpcoursedata.course_tuition_fee.fees[i];
      let fee = feeData.value.international_student;
      let newFees = (fee.amount !== 0) ? (parseFloat(fee.amount) * parseFloat(ExchangeRate)).toFixed(2) : 0;
      this.coursedata.course_tuition_fee.fees[i].value.international_student.amount = newFees;

      this.coursedata.course_tuition_fee.fees[i].value.currency = splitCurr[1];
    }
    // this.tmpcoursedata = this.coursedata;
    this.cd.markForCheck();
  }
  backtoSearch() {
    if (this.router.url.indexOf('/program/course-detail/search/') > -1) {
      let randomNum = this.generateRandomNum();
      let pid = sessionStorage.getItem('pid');
      let aid_param = sessionStorage.getItem('aid_param');
      if (aid_param) {
        this.router.navigate(['/program/course-search/konze' + randomNum + '/' + pid + '/' + aid_param]);
      }
      else {
        this.router.navigate(['/program/course-search/konze' + randomNum + '/' + pid]);
      }
      this.cd.markForCheck();
    } else {
      this.location.back();
    }
  }
  generateRandomNum() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
    this.cd.markForCheck();
  }
  scrollTo(section) {
    if (isPlatformBrowser(this._platformId)) {
      document.querySelector('#' + section)
        .scrollIntoView();
    }
  }
  // for scrollypy
  getRelatedCourseData(data) {
    this.setDefaultCurrency = '1:AUD';
    this.searchstring = '';
    this.courseid = data.courseid;
    this.universityid = data.universityid;
    this.loadService.loadme = true;
    this.courseService.getCoursesDetailsByProps(this.courseid, this.universityid, this.uid, this.universitycampus).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.coursedata = JSON.parse(data.outdatalist[0]);
      this.coursedata = JSON.parse(data.outdatalist[0]);
      //this.cid = this.coursedata[0].courseid;
      this.coursedata = JSON.parse(this.coursedata[0].coursedata);
      // funds
      this.tuitionfees = (this.coursedata.course_tuition_fee.fees[0].value.international_student.amount) ?
        this.coursedata.course_tuition_fee.fees[0].value.international_student.amount : 0;
      this.getTotalAmount();
      // funds
      this.universitydata = JSON.parse(data.outdatalist[1])[0];
      this.universityrankingdata = (data.outdatalist[3] !== 'No Data Found') ? JSON.parse(data.outdatalist[3]) : [];
      if (isPlatformBrowser(this._platformId)) {
        this.sviewurl = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyCkQ0pVMQyDUzOw0G5OUS71FpqrpbseX6Q
      &location=${this.universitydata.lat},${this.universitydata.long}
      &heading=210
      &pitch=10`;
      }
      this.topcourses = (data.outdatalist[2] !== 'No Data Found') ? JSON.parse(data.outdatalist[2]) : [];
      topFunction();
      performjsAction();
      this.loadService.loadme = false;
      this.cd.markForCheck();
    });
  }

  encyptcourseid(coursemodel) {
    const newcoursemodel = [];
    coursemodel.forEach(element => {
      const processedelement = element;
      processedelement.id = this.encdec.convertText('enc', processedelement.id);
      newcoursemodel.push(processedelement);
    });
    return newcoursemodel;
  }


  globalhints(e) {
    this.searchhints = new Searchhints();
    this.divFocusFlag = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#hint').show();
    }

    this.isbuttonclicke = false;
    if (e.which === 27) {
      this.isbuttonclicke = true;
    } else {
      if (this.searchstring.length > 2 || this.searchstring.length === 0) {
        if (e.which === 13 || this.searchstring.length === 0) {
          // this.getCourseByFilter();
        } else {
          this.courseService.globlahints(this.searchstring, this.searchhints.pageindex,
            this.searchhints.pagesize, this.universitydata.id, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag && data.outdatalist[0] !== 'No Data Found') {
                this.searchhints.coursehint = JSON.parse(data.outdatalist[0]);
                this.searchhints.coursehintcount = JSON.parse(data.outdatalist[2])[0].coursecount;
                if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
                  this.searchhints.ismorepage = true;
                } else {
                  this.searchhints.ismorepage = false;
                }
              } else {
                this.searchhints = new Searchhints();
              }
              this.cd.markForCheck();
            });
        }
      } else {
        this.searchhints = new Searchhints();
        this.cd.markForCheck();
      }
    }
  }
  getNextHint() {
    this.isbuttonclicke = false;
    this.divFocusFlag = false;
    this.searchhints.pageindex = this.searchhints.pageindex + 1;
    this.courseService.globlahints(this.searchstring, this.searchhints.pageindex,
      this.searchhints.pagesize, this.universitydata.id, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag && data.outdatalist[0] !== 'No Data Found') {
          this.searchhints.coursehint = this.searchhints.coursehint.concat(JSON.parse(data.outdatalist[0]));
          this.searchhints.coursehintcount = JSON.parse(data.outdatalist[2])[0].coursecount;
          if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
            this.searchhints.ismorepage = true;
          } else {
            this.searchhints.ismorepage = false;
          }
        } else {
          // this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
        this.cd.markForCheck();
      });
  }

  addFundData() {
    this.funddata.push({ relationid: '', dateofb: '', lcoast: 0, schoolcoast: 0, tracoast: this.lodgementdetails[0].travelcost });
    this.addDatePicker();
    this.changeCoastValues();
    this.cd.markForCheck();
  }
  removeFundData(index) {
    this.funddata.splice(index, 1);
    this.changeCoastValues();
    this.cd.markForCheck();
  }
  public trackByIndex(index: number) {
    return index;
  }
  getTotalAmount() {
    this.totallivingcost = 0;
    this.totaltravelcoast = 0;
    this.totalschoolfees = 0;
    this.totaltuitionfees = parseFloat(this.tuitionfees);
    this.totallivingcost = this.totallivingcost + parseFloat(this.livingcost);
    this.totaltravelcoast = this.totaltravelcoast + parseFloat(this.travelcoast);
    this.funddata.forEach(element => {
      this.totallivingcost = this.totallivingcost + parseFloat(element.lcoast);
      this.totalschoolfees = this.totalschoolfees + parseFloat(element.schoolcoast);
      this.totaltravelcoast = this.totaltravelcoast + parseFloat(element.tracoast);
    });
    this.nettotal = this.totallivingcost + this.totalschoolfees + this.totaltuitionfees + this.totaltravelcoast + parseFloat(this.graceamount);
    this.cd.markForCheck();
  }
  getDataOnCountryChange() {
    if (isPlatformBrowser(this._platformId)) {

      this.visaService.GetRelationtoyou((this.doccountryid ? this.doccountryid : 0), moment().format('DD-MM-YYYY')).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (this.doccountryid > 0) {
          this.lodgementdetails = JSON.parse(data.outdatalist[1]).lodgementDetails;
          this.livingcost = this.lodgementdetails[0].mainapplicantlivingcost;
          this.travelcoast = this.lodgementdetails[0].travelcost;

          this.lodgement = true;
        } else {
          this.lodgementdetails = [];
          this.travelcoast = 0;
          this.livingcost = 0;
          this.lodgement = false;
        }
        this.changeCoastValues();
        this.cd.markForCheck();
      });
    }

  }
  changeCoastValues() {
    const dummydata = [];
    this.funddata.forEach(element => {
      element.tracoast = this.travelcoast;
      dummydata.push(element);
    });
    this.funddata = dummydata;
    this.getTotalAmount();
    this.cd.markForCheck();
  }
  openDOB(index) {
    if (isPlatformBrowser(this._platformId)) {
      $('#dob' + index).focus();
    }
  }
  dobChange(fund, index) {
    if (isPlatformBrowser(this._platformId)) {
      if ((fund.relationid === '1' || fund.relationid === '4') && moment().diff(moment(fund.dateofb), 'years') >= 5) {
        this.funddata[index].schoolcoast = this.lodgementdetails[0].schoolcost;
      } else {
        this.funddata[index].schoolcoast = 0;
      }
      if (fund.relationid === '1' || fund.relationid === '4') {
        this.funddata[index].lcoast = this.lodgementdetails[0].childlivingcost;
      } else if (fund.relationid === '2' || fund.relationid === '3' || fund.relationid === '15') {
        this.funddata[index].lcoast = this.lodgementdetails[0].coapplicantlivingcost;
      } else {
        this.funddata[index].lcoast = 0;
      }
      this.getTotalAmount();
      this.cd.markForCheck();
    }

  }
  addDatePicker() {
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.datepicker').datepicker({
          autoclose: true
        }).change((ev) => {
          $('#' + ev.target.id).val(ev.target.value);
          document.getElementById(ev.target.id).dispatchEvent(new Event('input'));
        });
      }, 500);
    }
    this.cd.markForCheck();
  }
  createDummyData() {
    this.funddata = [];
    this.funddata.push({ relationid: '', dateofb: '', lcoast: 0, schoolcoast: 0, tracoast: this.lodgementdetails[0].travelcost });
    this.addDatePicker();
    this.getTotalAmount();
    this.cd.markForCheck();
  }

  // --------- Start Service Documents -------------------- //
  documentEmail() {
    const docmentid = this.documentid;
    this.txtname = '';
    this.txtemail = '';
    this.txtphone = '';
    if (isPlatformBrowser(this._platformId)) {
      $('#modalServicedocumentEmail').modal('toggle');

    }
    this.cd.markForCheck();
  }
  senddocemail(docemail) {
    this.loadService.loadme = true;
    this.docemailSubmitted = true;
    if (docemail.valid) {
      this.docemailSubmitted = false;

      const toemail = this.txtemail;
      if (isPlatformBrowser(this._platformId)) {
        const body = $('#serviceDocument').html();
        const Servicedocument = {
          toemail,
          body
        };
        this.courseService.senddocumentemail(Servicedocument).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            $('#modalServicedocumentEmail').modal('toggle');
            this.mservice.generateMessage('SUCCESS', '', data.message);
            this.cd.markForCheck();
          } else {
            $('#modalServicedocumentEmail').modal('toggle');
            this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          }
          this.loadService.loadme = false;
        });
      }

    } else {
      this.loadService.loadme = false;
    }

  }
  downloaddocumentpdf(name, id) {
    this.pdfService.generatePDF(name, id);
  }
  // --------- End Service Documents -------------------- //

  // --------- Start fund calculator -------------------- //
  sendfuncdEmail() {
    const docmentid = this.documentid;
    this.cd.markForCheck();
  }
  downloadfundpdf() {
    const docmentid = this.documentid;
    this.cd.markForCheck();
  }
  // --------- End fund calculator -------------------- //
  AddtoFavourite(cid) {
    //this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (JSON.parse(this.adataservice.getUserData())[0]) : '';
    this.setUserInfo();
    if (this.userdata) {
      this.userid = this.userdata.uid;

      const payload = {
        userid: this.encdec.encryptSensitive(this.userid.toString()),
        usertypeid: this.encdec.encryptSensitive(this.usertypeid.toString()),
        tablename: 'tblcourse',
        tableid: cid,
        favorite: this.check,
        productid: this.encdec.encryptSensitive(this.projectid.toString()),
        universitycampus: this.universitycampus
      }
      this.courseService.addtofavourite(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      })

      this.check = (this.check) ? false : true;

      this.favcnt[0].cnt = (this.check == false) ? this.favcnt[0].cnt + 1 : this.favcnt[0].cnt - 1

      this.cd.markForCheck();
    }
    else {
      this.modalFlag = 'favourites'
      $('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });

    }
  }

  setUserInfo() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';;
    if (this.userdata) {
      this.uid = this.userdata.uid;
      this.usertypeid = this.userdata.typeofaccount;
      this.projectid = this.userdata.projectid;
      this.useremail = this.userdata.email;
    }
    else {
      let projectIdFin = sessionStorage.getItem('pid');
      if (projectIdFin != "" && projectIdFin != null) {
        this.projectid = parseInt(projectIdFin);
      }
    }
  }

  gotosignup() {
    document.getElementById('close-modal').click();
    this.router.navigate(['/auth/signup']);
  }
  clearall() {
    this.selectissuetype = null;
    this.description = null;
    this.selectusertype = null;
    this.name = null;
    this.email = null;
    this.position = null;
    this.company = null;
    this.imagepath = null;
    this.fileupload = null;
    this.cd.markForCheck();
  }

  addissue(mainform) {

    if (mainform.valid) {


      this.formData.append('courseid', this.cid.toString());
      this.formData.append('userid', this.encdec.encryptSensitive(this.userdata.uid.toString()))
      this.formData.append('file', this.fileupload);
      this.formData.append('description', this.description);
      this.formData.append('email', this.useremail);
      this.formData.append('courseurl', window.location.href);
      this.formData.append('imagepath', this.imagepath);
      this.formData.append('ftablename', 'tblcourse');
      this.formData.append('ftableid', this.cid.toString());
      this.courseService.addissue(this.formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

        if (data.flag == true) {
          this.clearall();
          $("#myModal").modal('hide');
          this.mservice.generateMessage('SUCCESS', 'Thanks For Your Support! We Will Check And Correct The Error ASAP', '');
          this.cd.markForCheck();
        } else {
          if (data.flag == false && data.outdata != null) {
            this.mservice.generateMessage('ERROR', data.outdata, '');
          } else {
            this.mservice.generateMessage('ERROR', JSON.stringify(data), '');
          }
          this.clearall();
          $("#myModal").modal('hide');
        }
      })
    }
  }
  setPhoto(event) {
    this.fileupload = event.target.files[0];
  }
  sendMailCourseDetail(mainform) {
    if (mainform.valid) {
      const payload = {
        name: this.inquiryName,
        coursename: this.coursedata.course_title,
        courseid: this.cid,
        phoneno: this.inquiryPhone,
        userid: this.encdec.encryptSensitive(this.uid.toString()),
        email: this.inquiryEmail,
        inquirytype: 'coursedetail',
        domainname: window.location.origin
      };

      this.courseService.getInquiryTemplate(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          const mailTemplate = data.outdata;
          const mailSubject = 'Course Detail Inquiry';
          if (isPlatformBrowser(this._platformId)) {
            $('#collapseExample').toggle();
          }
          this.downloadPdf(true, mailTemplate, mailSubject);
        }
      });
    }
  }
  sendMailVisaCheckList(mainform) {
    if (mainform.valid) {
      const payload = {
        name: this.txtname,
        coursename: this.coursedata.course_title,
        courseid: this.cid,
        phoneno: this.txtphone,
        userid: this.encdec.encryptSensitive(this.uid.toString()),
        email: this.txtemail,
        inquirytype: 'visa'
      };

      this.courseService.getInquiryTemplate(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          const mailTemplate = data.outdata;
          const mailSubject = 'Student Visa Document';
          if (isPlatformBrowser(this._platformId)) {
            $('#modalServicedocumentEmail').modal('toggle');
          }
          this.downloadVisaCheckListPdf(true, mailTemplate, mailSubject);
        }
      });
    }
  }


  async downloadPdf(sendmail, mailTemplate, mailSubject) {
    var agentInfo = this.adataservice.getAgentInfo();
    if (agentInfo === null) {
      agentInfo = {
        agentLogoURL: environment.agentLogoURL,
        agentAddress: environment.agentAddress,
        agentContact: environment.agentContact,
        agentWebURL: environment.agentWebURL,
        agentOrganization: environment.agentOrganization,
        companyemail: environment.cemail,
        emailpassword: this.encdec.convertTextThirdParty('enc', environment.cp),
      }
    }
    if (isPlatformBrowser(this._platformId)) {
      if (!sendmail) {
        this.loadService.downloadPDF = true;
      } else {
        this.loadService.sendmail = true;
      }
      this.cd.markForCheck();
      let url = window.location.origin + (this.router.url.replace('/program', '/restrict').replace('/search', '')) + '/' + this.setDefaultCurrency + '/' + this.userdata.uid;

      console.log(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword));
      if (url.indexOf('/original/') > -1) {
        url = url.replace('/original/', '/' + this.switchFlag + '/');
      } else {

        url = url.replace('/councellor/', '/' + this.switchFlag + '/');
      }
      const agentLogoURL = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentLogoURL));
      const agentOrganization = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentOrganization));
      const agentWebURL = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentWebURL));
      const req = new HttpRequest('POST', `${environment.NODE_API_URL}api/getPDFbyURL`, {
        url: url + '/' + agentLogoURL + '/' + agentOrganization + '/' + agentWebURL,
        format: 'A4',
        height: 0,
        emulateMedia: 'print',
        displayHeaderFooter: true,
        issmc: true,
        picon: this.encdec.encryptSensitiveV1(environment.webUrl + '/assets/images/pdfimages/phone-icon.png'),
        licon: this.encdec.encryptSensitiveV1(environment.webUrl + '/assets/images/pdfimages/link-icon.png'),
        ccicon: this.encdec.encryptSensitiveV1(environment.webUrl + '/assets/images/pdfimages/course-compare-header.png'),
        alicon: agentLogoURL,
        agentContact: this.encdec.encryptSensitiveV1(agentInfo.agentContact),
        agentWebURL: this.encdec.encryptSensitiveV1(agentInfo.agentWebURL),
        agentOrganization: this.encdec.encryptSensitiveV1(agentInfo.agentOrganization),
        webUrl: this.encdec.encryptSensitiveV1(environment.webUrl),
        margin: {
          top: '120px',
          bottom: '100px',
          right: 0,
          left: 0
        },
        printBackground: true,
        waitFor: 1000,
        emuid: this.encdec.encryptSensitiveV1(agentInfo.companyemail),
        empid: this.encdec.encryptSensitiveV1(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword)),
        skipFirstPageHeaderFooter: true,
        pageranage: '1',
        pageranageAfterSkipHeaderFooter: '3-',
        sendmail: sendmail,
        mailTo: this.inquiryEmail,
        mailSubject: mailSubject,
        fileName: this.coursedata.course_id.replace(/\s/g, '').replace(/[\/]+/g, '_').toLowerCase() + '.pdf',
        mailTemplate: mailTemplate.replace(/<AGENTLOGO>/g, agentInfo.agentLogoURL).replace(/<AGENTNAME>/g, agentInfo.agentOrganization).replace(/<AGENTORG>/g, agentInfo.agentWebURL),
        mailBody: ''
      }, {
        responseType: 'blob' as 'json',
        reportProgress: true,
      });

      this.httpclient.request(req).subscribe(event => {
        this.cd.markForCheck();
        if (!sendmail) {
          $('#progress').modal({ backdrop: 'static', keyboard: false, show: true });
          this.prepare = true;
          if (event.type === HttpEventType.DownloadProgress) {
            this.download = true;
            this.prepare = false;
            this.totalsize = event.total;
            this.speed = (Math.round((event.loaded - this.downloadedsize) / 1024) < 1024) ? Math.round((event.loaded - this.downloadedsize) / 1024) + '/kbps' : Math.round(((event.loaded - this.downloadedsize) / 1024) / 1024) + '/mbps';
            this.downloadedsize = event.loaded;
            this.totalsize = event.total;
            this.downloadpr = Math.round(100 * event.loaded / event.total);
            this.cd.markForCheck();
          } else if (event instanceof HttpResponse) {
            const a: any = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            const url = window.URL.createObjectURL(event.body);
            a.href = url;
            a.download = this.courseid + '_detail.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            this.loadService.downloadPDF = false;
            this.cd.markForCheck();
            this.download = false;
            this.prepare = false;
            this.downloadpr = 0;
            $('#progress').modal('hide');
            this.cd.markForCheck();
          }
        } else {
          if (event instanceof HttpResponse) {
            this.loadService.sendmail = false;
            this.mservice.generateMessage('SUCCESS', 'Mail Sent Successfully', '');
            this.inquiryEmail = '';
            this.inquiryName = '';
            this.inquiryPhone = '';
            this.cd.markForCheck();
          }
        }
      });
    }
  }
  async downloadVisaCheckListPdf(sendmail, mailTemplate, mailSubject) {
    if (isPlatformBrowser(this._platformId)) {
      const style = `<style>.bg-custom{background-color:#ebf7fe}.bg-secondary-light{background-color:rgba(0,0,0,.1)}.text-custom{color:#2565a7}table{table-layout:fixed}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:'Open Sans';color:#2b2a29;text-decoration:none;font-size:12px}table,td{mso-table-lspace:0;mso-table-rspace:0;vertical-align:top}body{margin:15px 0;padding:0;font-family:'Open Sans';color:#2b2a29}img{max-width:100%;height:auto}td,tr{font-size:12px}ol{font-size:9px;margin-top:0;padding-left:10px}ol.lower-alpha{list-style-type:lower-alpha}.content-block{page-break-inside:avoid}#logo{height:80px;padding-top:20px}.heading{font-size:15px;color:#499340;font-weight:700}.gradient{background:#137fc3;background:-moz-linear-gradient(left,#137fc3 0,#244189 100%);background:-webkit-linear-gradient(left,#137fc3 0,#244189 100%);background:linear-gradient(to right,#137fc3 0,#244189 100%)}@page{size:A4;-webkit-print-color-adjust: exact}@media print{-webkit-print-color-adjust: exact;body{margin:0}.main{background-size:contain;box-shadow:0 0 0 #a4a4a4;width:100%}.heading{font-size:15px;color:#499340;font-weight:700}.gradient{background:#137fc3!important;background:-moz-linear-gradient(left,#137fc3 0,#244189 100%)!important;background:-webkit-linear-gradient(left,#137fc3 0,#244189 100%)!important;background:linear-gradient(to right,#137fc3 0,#244189 100%)!important}}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff!important}#footer,#header{padding:0!important;-webkit-print-color-adjust: exact!important}</style>`;
      const phonemage = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/phone-icon.png').then(res => {
        return res;
      });
      const linkimage = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/link-icon.png').then(data => {
        return data;
      });
      const coursecompareheader = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/course-compare-header.png').then(res => {
        return res;
      });
      const clogo = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/Search my Course Logo Final.png').then(data => {
        return data;
      });
      if (sendmail != true) {
        this.loadService.downloadPDF = true;
      } else {
        this.loadService.sendmail = true;
      }
      this.cd.markForCheck();
      this.pdfService.downloadPDF({
        url: window.location.origin + '/restrict/visachecklist' + '/' + this.documentid,
        format: 'A4',
        height: 0,
        emulateMedia: 'print',
        displayHeaderFooter: true,
        headerTemplate: `` + style + `
        <tr><td><table align="left" width="70%"><tbody><tr><td><img src="` + coursecompareheader + `" alt="Course Compare" style='height:57px;'></td>
        </tr></tbody></table><table align="right" width="26%"><tbody><tr>
        <td style="padding-right: .5rem!important;float:right;"><img src="` + clogo + `" alt="Logo" style='height:57px;'></td></tr></tbody></table></td></tr>`,
        footerTemplate: `<div style="background: linear-gradient(to right, #137fc3 0%, #244189 100%); display: flex; width: 1150px; padding: 10px;">
                <div style="align: left; padding: 5px; width: 28%; text-align: start;">
                <p style="color: white; margin-bottom: 0px; font-size: 9px;font-family: 'Open Sans';">powered by</p>
                <a style="color: white; ;font-size: 8px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com</a></div>
                <div style="margin-top: 10px; width: 28%; text-align: middle;"><a style="color: white; font-size: 12px;font-family: 'Open Sans';" href="tel:+610386573761"><img style="max-width: 100%;height: auto;" src="` + phonemage + `" /> +61 03 8657 3761</a></div>
                <div style="padding-right: 5px; float: right; margin-top: 10px; width: 44%; text-align: end;"><img style="max-width: 100%;height: auto;" src="` + linkimage + `" /> <a style="color: white; font-size:12px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com
                </a></div>
                </div>`,
        margin: {
          top: '120px',
          bottom: '100px',
          right: 0,
          left: 0
        },
        printBackground: true,
        waitFor: 0,
        skipFirstPageHeaderFooter: true,
        pageranage: '1',
        pageranageAfterSkipHeaderFooter: '3-',
        sendmail: sendmail,
        mailTo: this.txtemail,
        mailSubject: mailSubject,
        fileName: this.coursedata.course_id.replace(/\s/g, '').replace(/[\/]+/g, '_').toLowerCase() + '.pdf',
        mailTemplate: mailTemplate,
        mailBody: ''
      }).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (sendmail != true) {
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(data);
          a.href = url;
          a.download = this.documentid + '_detail.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadService.downloadPDF = false;
          this.cd.markForCheck();
        } else {
          this.loadService.sendmail = false;
          this.mservice.generateMessage('SUCCESS', 'Mail Sent Successfully', '');
          this.inquiryEmail = '';
          this.inquiryName = '';
          this.inquiryPhone = '';
          this.cd.markForCheck();
        }
      });
    }
  }
  openInquiryDiv() {
    if (isPlatformBrowser(this._platformId)) {
      $('#collapseExample').slideToggle();
      this.cd.markForCheck();
    }
  }
  async gotofc(sendmail, mailTemplate, mailSubject) {
    const country = this.documentcountrylist.filter(el => el.countryid == this.doccountryid);
    const dummyfund = [];
    this.funddata.forEach(element => {
      const rs = this.documentrelationshiplist.filter(el => el.id == element.relationid);
      element.relationid = rs[0].name;
      element.dateofb = element.dateofb.replace(/[\/]+/g, '-');
      dummyfund.push(element);
    });

    const data: any = {};
    data.country = country[0].countryname;
    data.tf = this.tuitionfees;
    data.lc = this.livingcost;
    data.tc = this.travelcoast;
    data.da = this.funddata;
    data.totaltuitionfees = this.totaltuitionfees;
    data.totalschoolfees = this.totalschoolfees;
    data.totallivingcost = this.totallivingcost;
    data.totaltravelcoast = this.totaltravelcoast;
    data.graceamount = this.graceamount;
    data.nettotal = this.nettotal;
    if (isPlatformBrowser(this._platformId)) {
      const style = `<style>.bg-custom{background-color:#ebf7fe}.bg-secondary-light{background-color:rgba(0,0,0,.1)}.text-custom{color:#2565a7}table{table-layout:fixed}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:'Open Sans';color:#2b2a29;text-decoration:none;font-size:12px}table,td{mso-table-lspace:0;mso-table-rspace:0;vertical-align:top}body{margin:15px 0;padding:0;font-family:'Open Sans';color:#2b2a29}img{max-width:100%;height:auto}td,tr{font-size:12px}ol{font-size:9px;margin-top:0;padding-left:10px}ol.lower-alpha{list-style-type:lower-alpha}.content-block{page-break-inside:avoid}#logo{height:80px;padding-top:20px}.heading{font-size:15px;color:#499340;font-weight:700}.gradient{background:#137fc3;background:-moz-linear-gradient(left,#137fc3 0,#244189 100%);background:-webkit-linear-gradient(left,#137fc3 0,#244189 100%);background:linear-gradient(to right,#137fc3 0,#244189 100%)}@page{size:A4;-webkit-print-color-adjust: exact}@media print{-webkit-print-color-adjust: exact;body{margin:0}.main{background-size:contain;box-shadow:0 0 0 #a4a4a4;width:100%}.heading{font-size:15px;color:#499340;font-weight:700}.gradient{background:#137fc3!important;background:-moz-linear-gradient(left,#137fc3 0,#244189 100%)!important;background:-webkit-linear-gradient(left,#137fc3 0,#244189 100%)!important;background:linear-gradient(to right,#137fc3 0,#244189 100%)!important}}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff!important}#footer,#header{padding:0!important;-webkit-print-color-adjust: exact!important}</style>`;
      const phonemage = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/phone-icon.png').then(res => {
        return res;
      });
      const linkimage = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/link-icon.png').then(data => {
        return data;
      });
      const coursecompareheader = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/course-compare-header.png').then(res => {
        return res;
      });
      const clogo = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/Search my Course Logo Final.png').then(data => {
        return data;
      });
      if (sendmail != true) {
        this.loadService.downloadPDF = true;
      } else {
        this.loadService.sendmail = true;
      }
      this.cd.markForCheck();
      this.pdfService.downloadPDF({
        url: window.location.origin + '/restrict/fundcalculator/' + this.encdec.convertText('enc', JSON.stringify(data), true),
        format: 'A4',
        height: 0,
        emulateMedia: 'print',
        displayHeaderFooter: true,
        headerTemplate: `` + style + `
        <tr><td><table align="left" width="70%"><tbody><tr><td><img src="` + coursecompareheader + `" alt="Course Compare" style='height:57px;'></td>
        </tr></tbody></table><table align="right" width="26%"><tbody><tr>
        <td style="padding-right: .5rem!important;float:right;"><img src="` + clogo + `" alt="Logo" style='height:57px;'></td></tr></tbody></table></td></tr>`,
        footerTemplate: `<div style="background: linear-gradient(to right, #137fc3 0%, #244189 100%); display: flex; width: 1150px; padding: 10px;">
                <div style="align: left; padding: 5px; width: 28%; text-align: start;">
                <p style="color: white; margin-bottom: 0px; font-size: 9px;font-family: 'Open Sans';">powered by</p>
                <a style="color: white; ;font-size: 8px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com</a></div>
                <div style="margin-top: 10px; width: 28%; text-align: middle;"><a style="color: white; font-size: 12px;font-family: 'Open Sans';" href="tel:+610386573761"><img style="max-width: 100%;height: auto;" src="` + phonemage + `" /> +61 03 8657 3761</a></div>
                <div style="padding-right: 5px; float: right; margin-top: 10px; width: 44%; text-align: end;"><img style="max-width: 100%;height: auto;" src="` + linkimage + `" /> <a style="color: white; font-size:12px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com
                </a></div>
                </div>`,
        margin: {
          top: '120px',
          bottom: '100px',
          right: 0,
          left: 0
        },
        printBackground: true,
        waitFor: 0,
        skipFirstPageHeaderFooter: true,
        pageranage: '1',
        pageranageAfterSkipHeaderFooter: '2-',
        sendmail: sendmail,
        mailTo: this.inquiryEmail,
        mailSubject: mailSubject,
        fileName: this.coursedata.course_id.replace(/\s/g, '').replace(/[\/]+/g, '_').toLowerCase() + '.pdf',
        mailTemplate: mailTemplate,
        mailBody: ''
      }).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (sendmail != true) {
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(data);
          a.href = url;
          a.download = country[0].countryname + '_fund.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadService.downloadPDF = false;
          this.cd.markForCheck();
        } else {
          this.loadService.sendmail = false;
          this.mservice.generateMessage('SUCCESS', 'Mail Sent Successfully', '');
          this.inquiryEmail = '';
          this.inquiryName = '';
          this.inquiryPhone = '';
          this.cd.markForCheck();
        }
      });
    }
  }
  submitLeadInquiry(mainform) {
    if (mainform.valid) {
      if (isPlatformBrowser(this._platformId)) {
        $('#ThirdPartyForm').modal('toggle');
      }
      this.loadService.loadme = true;
      const payload = {
        name: this.leadInquiryPayload.name,
        coursename: this.coursedata.course_title,
        courseid: this.cid,
        comment: this.leadInquiryPayload.comments,
        phoneno: this.leadInquiryPayload.phoneno,
        userid: this.uid ? this.encdec.encryptSensitive(this.uid.toString()) : '',
        projectid: this.projectid ? this.encdec.encryptSensitive(this.projectid.toString()) : this.encdec.encryptSensitive(0),
        email: this.leadInquiryPayload.email,
        ftablename: 'tblcourse'
      };

      this.courseService.getLeadInquiryTemplate(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.loadService.loadme = false;
          this.mservice.generateMessage('SUCCESS', 'Mail sent successfully', '');
          this.leadInquiryPayload.name = '';
          this.leadInquiryPayload.email = '';
          this.leadInquiryPayload.comments = '';
          this.leadInquiryPayload.phoneno = '';
          this.cd.markForCheck();
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', 'Something went wrong', '');
        }
      });
    }

  }
  sendFeedback(mainform) {
    this.setUserInfo();
    if (mainform.valid) {
      if (this.uid) {
        if (isPlatformBrowser(this._platformId)) {
          $('#feedbackForm').modal('toggle');
        }
        const payload = {
          name: this.feedbackPayload.name,
          feedback: this.feedbackPayload.feedback,
          phoneno: this.feedbackPayload.phoneno,
          userid: this.encdec.encryptSensitive(this.uid.toString()),
          projectid: this.encdec.encryptSensitive(this.projectid.toString()),
          email: this.feedbackPayload.email,
          domainname: window.location.origin
        };

        this.courseService.sendFeedback(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.feedbackPayload.name = '';
            this.feedbackPayload.email = '';
            this.feedbackPayload.feedback = '';
            this.feedbackPayload.phoneno = '';
            this.cd.markForCheck();
          }
        });
      }

    }
  }
  openFeedbackModal() {
    if (this.userdata) {
      $('#feedbackForm').modal('toggle');
    } else {
      this.modalFlag = 'feedback';
      $('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });
    }
  }
  openReportIssueModal() {
    if (this.userdata) {
      $('#myModal').modal('toggle');
    } else {
      this.modalFlag = 'reportissue';
      $('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });
    }
  }
  successLogin() {
    if (isPlatformBrowser(this._platformId)) {
      $('#loginoptions').modal('hide');
      this.ngOnInit();
      if (this.modalFlag === 'feedback') {
        this.modalFlag = '';
        $('#feedbackForm').modal('toggle');
      } else if (this.modalFlag === 'reportissue') {
        this.modalFlag = '';
        $('#myModal').modal('toggle');
      } else {

        this.modalFlag = '';
        for (let i = 0; i < this.favdata.length; i++) {
          if (this.userdata.uid == this.favdata[i].userid && this.cid == this.favdata[i].tableid && this.favdata[i].favorite == 1 &&
            this.favdata[i].universitycampus == this.universitycampus) {
            this.ischeckin = true;
            break;
          }
        }
        if (this.ischeckin == true) {
          this.mservice.generateMessage('INFO', 'Already added to the favorite', '');
          this.check = false;
        } else {
          this.AddtoFavourite(this.cid)
          this.check = true;
        }
      }
    }
  }
  setCouncellorDetails(data, type) {
    switch (type) {
      case 'fees':
        this.editCouncellorFees = {
          fees: []
        }
        for (let feedata of data) {
          this.editCouncellorFees.fees.push({
            name: feedata.name,
            value: {
              international_student: {
                amount: feedata.amount,
                unit: feedata.unit,
                duration: feedata.duration,
                description: feedata.description
              },
              currency: feedata.currency
            }
          });
        }
        break;
      case 'intake':
        let uniqueCampus = [];
        for (let mcampus of data) {
          if (uniqueCampus.length > 0) {
            if (!uniqueCampus.includes(mcampus.name)) {
              uniqueCampus.push(mcampus.name);
            }
          } else {
            uniqueCampus.push(mcampus.name);
          }

        }
        let newintakes = [];
        for (let uc of uniqueCampus) {
          let ndata = data.filter(val => {
            return (val.name === uc);
          });
          let tmpintake = {
            name: '',
            value: []
          }
          tmpintake.name = ndata[0].name;
          for (let d of ndata) {
            tmpintake.value.push({ actualdate: d.actualdate, month: d.month });
          }
          newintakes.push(tmpintake);
        };
        this.editCouncellorIntakes = {
          intake: []
        }
        this.editCouncellorIntakes.intake = newintakes;
        break;
      case 'engreq':
        this.editCouncellorEngreq = {
          english: []
        }
        for (let d of data) {
          this.editCouncellorEngreq.english.push(d);
        }
        break;

    }

  }
  switchView(type) {

    if (type === 'C') {
      // councellor
      this.switchFlag = 'councellor';
      let splitCurr = this.setDefaultCurrency.split(':');
      let ExchangeRate = splitCurr[0];
      for (let i = 0; i < this.editCouncellorFees.fees.length; i++) {
        let feeData = this.editCouncellorFees.fees[i];
        let fee = feeData.value.international_student;
        let newFees = (fee.amount !== 0) ? (parseFloat(fee.amount) * parseFloat(ExchangeRate)).toFixed(2) : 0;
        this.coursedata.course_tuition_fee.fees[i].value.international_student.amount = newFees;
      }

      this.coursedata.course_intake = this.editCouncellorIntakes;
      this.coursedata.course_admission_requirement.english = this.editCouncellorEngreq.english;
      this.cd.markForCheck();
      // this.coursedata.course_tuition_fee = this.editCouncellorFees;     
    } else {
      // original
      this.switchFlag = 'original';

      let splitCurr = this.setDefaultCurrency.split(':');
      let ExchangeRate = splitCurr[0];
      for (let i = 0; i < this.tmpcoursedata.course_tuition_fee.fees.length; i++) {
        let feeData = this.tmpcoursedata.course_tuition_fee.fees[i];
        let fee = feeData.value.international_student;
        let newFees = (fee.amount !== 0) ? (parseFloat(fee.amount) * parseFloat(ExchangeRate)).toFixed(2) : 0;
        this.coursedata.course_tuition_fee.fees[i].value.international_student.amount = newFees;
      }
      this.coursedata.course_intake = this.tmpcoursedata.course_intake;
      this.coursedata.course_admission_requirement.english = this.tmpcoursedata.course_admission_requirement.english;
      this.cd.markForCheck();
      //this.coursedata.course_tuition_fee = this.tmpcoursedata.course_tuition_fee;
    }
  }
  getCouncellorDetails() {
    this.loadService.loadme = true;
    // this.setCouncellorDetails(this.tmpeditCouncellorIntakes, 'intake');
    // this.setCouncellorDetails(this.tmpeditCouncellorEngreq, 'engreq');
    if (this.tmpeditCouncellorFees instanceof Array) {
      this.setCouncellorDetails(this.tmpeditCouncellorFees, 'fees');
    }
    this.loadService.loadme = false;
  }

  saveCouncellorDetails() {
    this.loadService.loadme = true;
    for (let english of this.editCouncellorEngreq.english) {
      if (english.name.toLowerCase().indexOf('ielts') > -1) {
        english.type = 'ielts';
      } else if (english.name.toLowerCase().indexOf('pte') > -1) {
        english.type = 'pte';
      } else if (english.name.toLowerCase().indexOf('pbt') > -1) {
        english.type = 'pbt';
      } else if (english.name.toLowerCase().indexOf('ibt') > -1) {
        english.type = 'ibt';
      } else if (english.name.toLowerCase().indexOf('cae') > -1) {
        english.type = 'cae';
      } else if (english.name.toLowerCase().indexOf('cpe') > -1) {
        english.type = 'cpe';
      }
    }
    let tmpenglish = this.editCouncellorEngreq.english;
    const payload = {
      userid: this.adataservice.getUserId(),
      courseid: this.cid,
      course_tuition_fee: this.editCouncellorFees,
      course_intake: this.editCouncellorIntakes,
      course_admission_requirement: tmpenglish
    };
    this.courseService.saveCouncellorDetails(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
        this.tmpeditCouncellorFees = this.editCouncellorFees;
        this.tmpeditCouncellorIntakes = this.editCouncellorIntakes;
        this.tmpeditCouncellorEngreq = this.editCouncellorEngreq;
        if (this.switchFlag != 'original') {
          this.switchView('C');
        }
        this.mservice.generateMessage('SUCCESS', 'Course updated successfully.', 'SUCCESS');
        $('#councellorview').modal('hide');
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
    });

  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.loadService.ispanel = false;
  }
}
