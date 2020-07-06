import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Searchhints } from 'src/app/models/course.model';
import { UniversityDetailService } from 'src/app/services/university-detail.service';
import { CourseService } from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
declare const performjsAction: any;
declare const $: any;
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { CourseFiltersService } from 'src/app/services/course-filters.service';
import { CookieService } from 'ngx-cookie-service';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-university-detail',
  templateUrl: './university-detail.component.html',
  styleUrls: ['./university-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityDetailComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private univService: UniversityDetailService,
    private encdec: EncDecService,
    private location: Location,
    public loadService: LoaderService,
    private courseService: CourseService, private mservice: ToastService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
    public courseFilterModel: CourseFiltersService,
    private aservice: SMCAuthService,
    private cookieService: CookieService,
    private cd: ChangeDetectorRef
  ) { }
  environment = environment;
  searchhints = new Searchhints();
  courseid: string;
  universityid: string;
  univdata: any;
  universitydata: any;
  universityrankingdata: any;
  sviewurl: string;
  searchstring: any;
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
  servicedocuments: boolean = false;
  lodgement: boolean = false;
  docemailSubmitted = false;
  check: boolean = true;
  favorite: boolean = true;
  showfavcnt: any;
  favcnt: any;
  username = '';
  password = '';
  staysignin = false;
  autologin = true;
  submitted = false;
  //----------- start param document send email ----------//
  txtname: any;
  txtemail: any;
  txtphone: any;
  //----------- end param document send email ----------//

  divFocusFlag = false;
  inputFocusFlag = false;
  // for scrollypy
  currentSection = 'about-university-tab';
  universitycampus: string;
  uid: number;
  count = 0;
  userid: number;
  productid: number;
  usertypeid: number;
  nextBtnFlag = true;
  prevBtnFlag = false;
  contactdetails: any;
  userdata: any;
  disciplinelist: any = [];
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
  ngOnInit() {
    this.loadService.ispanel = true;
    this.loadService.loadme = true;
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData())[0] : '';
    this.userid = this.userdata.uid;
    this.usertypeid = this.userdata.typeofaccount;
    if (this.usertypeid == 1) {
      this.productid = 0
    } else if (this.usertypeid == 2) {
      this.productid = 1 //1 for kondesk
    }
    this.cd.markForCheck()
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.universityid = params.universityid.toString();
      // 
    });
    this.courseService.getinitialData().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.disciplinelist = JSON.parse(data.outdatalist[1]);
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck()
    });

    this.univService.getUnivDetailsById(this.universityid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

      this.univdata = JSON.parse(data.outdatalist[0][0].universitydata);
      this.uid = data.outdatalist[0][0].universityid;
      this.showfavcnt = (data.outdatalist[1] !== 'No Data Found') ? data.outdatalist[1] : [];
      this.favcnt = data.outdatalist[2][0].cnt
      if (this.showfavcnt.length > 0) {
        if (this.showfavcnt[0].favorite == true) {
          this.favorite = false
        }
        else {
          this.favorite = true
        }
      }
      else {
        this.favorite = true
      }

      this.contactdetails = this.univdata.contactInformation;
      console.log('this.contactdetails-->', this.contactdetails);
      this.loadService.loadme = false;
      if (isPlatformBrowser(this._platformId)) {
        performjsAction();
      }
      this.cd.markForCheck()
    });
    if (isPlatformBrowser(this._platformId)) {
      $(document).click(() => {
        if (this.inputFocusFlag == true && this.divFocusFlag == true) {
          $('#hint').hide();
        }
      });
    }
  }
  navigatetoCourse(did) {
    this.courseFilterModel.disciplineid = did;
    this.courseFilterModel.universityid = this.uid;
    this.router.navigate(['/program/course-list']);
    this.cd.markForCheck()
  }
  backtoSearch() {
    this.location.back();
  }
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
  scrollTo(section) {
    if (isPlatformBrowser(this._platformId)) {

      document.querySelector('#' + section)
        .scrollIntoView();
    }
  }
  globalhints(e) {
    this.divFocusFlag = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#hint').show();
    }
    this.isbuttonclicke = false;
    if (e.which === 27) {
      this.isbuttonclicke = true;
    } else {
      if (this.searchstring && (this.searchstring.length > 2 || this.searchstring.length === 0)) {
        if (e.which === 13 || this.searchstring.length === 0) {
          // this.getCourseByFilter();
        } else {
          this.courseService.globlahints(this.searchstring, this.searchhints.pageindex,
            this.searchhints.pagesize, this.uid, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
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
              this.cd.markForCheck()
            });
        }
      } else {
        this.searchhints = new Searchhints();
      }
    }
  }
  getNextHint() {
    this.isbuttonclicke = false;
    this.divFocusFlag = false;
    this.searchhints.pageindex = this.searchhints.pageindex + 1;
    this.courseService.globlahints(this.searchstring, this.searchhints.pageindex,
      this.searchhints.pagesize, this.uid, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
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
        this.cd.markForCheck()
      });
  }

  getNextContactInfo() {
    this.count++;
    if (this.count > 0) {
      this.prevBtnFlag = true;
    }
    if (this.count >= (this.contactdetails.length - 1)) {
      this.nextBtnFlag = false;
    }
    this.cd.markForCheck()
  }
  getPrevContactInfo() {
    this.count--;

    if (this.count == 0) {
      this.prevBtnFlag = false;
      this.nextBtnFlag = true;
    }
    this.cd.markForCheck()
  }
  AddtoFavourite(unid) {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (JSON.parse(this.adataservice.getUserData())[0]) : '';
    if (this.userdata) {


      const payload = {
        userid: this.userid,
        usertypeid: this.usertypeid,
        tablename: 'tbluniversity',
        tableid: unid,
        favorite: this.favorite,
        productid: this.productid
      }
      this.univService.addtofavourite(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        this.cd.markForCheck()
      })
      this.favorite = (this.favorite) ? false : true;

      this.favcnt = (this.favorite == false) ? this.favcnt + 1 : this.favcnt - 1
    } else {
      //this.router.navigate(['/login']);
      if (isPlatformBrowser(this._platformId)) {
        $('#myModalfavorite').modal('show');
      }
    }
    this.cd.markForCheck()

  }
  setCount(index) {
    this.count = index;
  }
  makeMeLogin(mainform) {

    if (mainform.valid) {

      this.submitted = true;
      this.aservice.Login(this.username, this.password, 'system').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        localStorage.setItem('token', data.access_token);
        this.cookieService.set('rememberme', this.staysignin.toString());
        this.cookieService.set('username', this.username.toString());
        this.cookieService.set('password', this.password.toString());
        this.aservice.getProfile(this.username).pipe(takeUntil(this.componentDestroyed$)).subscribe(userdata => {
          this.adataservice.setUserData(JSON.stringify(userdata.outdata));

          if (userdata.outdata) {
            this.submitted = false;
            document.getElementById('close-modal').click();
            this.cd.markForCheck()
          } else {
            if (isPlatformBrowser(this._platformId)) {
              $('#myModalfavorite').modal('show');
            }
          }
          this.cd.markForCheck()
        },
          err => {
            if (err.status === 401) {
              this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
            } else if (err.status === 400) {
              this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
            } else {
              this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
            }
            this.submitted = false;

          });

      },
        err => {
          if (err.status === 401) {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          } else if (err.status === 400) {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          } else {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          }
          this.submitted = false;
        });
    }
  }

  submitLeadInquiry(mainform) {
    if (mainform.valid) {
      $('#ThirdPartyForm').modal('toggle');
      const payload = {
        name: this.leadInquiryPayload.name,
        coursename: this.univdata.univ_name,
        courseid: this.uid,
        comment: this.leadInquiryPayload.comments,
        phoneno: this.leadInquiryPayload.phoneno,
        userid: this.userid ? this.encdec.encryptSensitive(this.userid.toString()) : '',
        projectid: this.productid ? this.encdec.encryptSensitive(this.productid.toString()) : '',
        email: this.leadInquiryPayload.email,
        ftablename: 'tbluniversity'
      };
      this.courseService.getLeadInquiryTemplate(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.leadInquiryPayload.name = '';
          this.leadInquiryPayload.email = '';
          this.leadInquiryPayload.comments = '';
          this.leadInquiryPayload.phoneno = '';
          this.cd.markForCheck();
        }
      });
    }

  }
  sendFeedback(mainform) {
    if (mainform.valid) {
      $('#feedbackForm').modal('toggle');
      const payload = {
        name: this.feedbackPayload.name,
        feedback: this.feedbackPayload.feedback,
        phoneno: this.feedbackPayload.phoneno,
        userid: this.userid ? this.encdec.encryptSensitive(this.userid.toString()) : '',
        projectid: this.productid ? this.encdec.encryptSensitive(this.productid.toString()) : '',
        email: this.feedbackPayload.email
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
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.loadService.ispanel = false;
  }


}
