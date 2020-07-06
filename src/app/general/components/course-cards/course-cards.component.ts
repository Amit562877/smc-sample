import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseService } from 'src/app/services/course.service';

declare const $: any;
@Component({
  selector: 'app-course-cards',
  templateUrl: './course-cards.component.html',
  styleUrls: ['./course-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  @Input() coursedetail = new Course();
  @Input() courseIndex: any;
  @Input() comparedata: any;
  @Input() switchFlag: any;
  @Output() courseCompare = new EventEmitter<string>();
  userdata: any
  username = '';
  password = '';
  staysignin = false;
  autologin = true;
  submitted = false;
  viewtype = 'original';
  //currentcoursedetails = new Course() ;

  constructor(
    private adataservice: AuthdataService,
    private mservice: ToastService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private courseService: CourseService,
  ) { }
  environment = environment;
  engData: any = [];
  intakeData: any = [];
  ngOnChanges(changes: any) {
    if (changes.comparedata && changes.comparedata.currentValue) {
      this.comparedata = changes.comparedata.currentValue;
      this.isCheckedFunction();
    }
  }
  ngOnInit() {
    //this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (JSON.parse(this.adataservice.getUserData())[0]) : '';
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    //console.log("This.USerdata-->",this.userdata)

    if (this.switchFlag === 'C') {
      this.viewtype = 'councellor'
    }
    if (this.coursedetail) {
      this.coursedetail.newId = 'chk_' + this.coursedetail.id + '_' + this.coursedetail.campusid;
    }
    this.isCheckedFunction();
    // this.userdata = JSON.parse(this.adataservice.getUserData())[0];
    // console.log("USerDAta-->",this.userdata)
  }

  getEnglisgReq(courseid) {
    this.courseService.getEnglishData(courseid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0]) {
        this.engData = data.outdatalist[0];
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  getIntakeData(courseid,campus) {
    this.courseService.getIntakeData(courseid,campus).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0]) {
        this.intakeData = data.outdatalist[0];
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  isCheckedFunction() {
    if (this.comparedata && this.comparedata.length > 0) {
      this.cd.markForCheck();
      let isIncluded = this.comparedata.filter(val => {
        if (val != undefined) {
          return val.newId === this.coursedetail.newId;
        }
      })
      if (isIncluded && isIncluded.length > 0) {
        this.coursedetail.ischecked = true;
      } else {
        this.coursedetail.ischecked = false;
      }
    }
    this.cd.markForCheck();
  }
  onCourseCompare(coursedetail) {

    //this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (JSON.parse(this.adataservice.getUserData())[0]) : '';
    //if (this.userdata) {
    let compareJson;
    compareJson = {
      coursedetail: coursedetail,
      courseIndex: this.courseIndex
    };
    this.cd.markForCheck();
    this.courseCompare.emit(compareJson);
    //} 
    //else {
    //   if (isPlatformBrowser(this._platformId)) {
    //     $("#myModalcoursecompare").modal('show');
    //   }
    //   coursedetail.ischecked = false;
    //   this.currentcoursedetails = coursedetail;
    //   console.log("Course_Compare-->", this.currentcoursedetails)
    // }
  }

  // makeMeLogin(mainform) {
  //   if (mainform.valid) {
  //     console.log(this.currentcoursedetails);
  //     this.submitted = true;
  //     this.aservice.Login(this.username, this.password).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //       localStorage.setItem('token', data.access_token);
  //       this.cookieService.set('rememberme', this.staysignin.toString());
  //       this.cookieService.set('username', this.username.toString());
  //       this.cookieService.set('password', this.password.toString());
  //       this.aservice.getProfile(this.username).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(userdata => {
  //         this.adataservice.setUserData(JSON.stringify(userdata.outdata));
  //         this.submitted = false;
  //         if (isPlatformBrowser(this._platformId)) {
  //           if (userdata.outdata) {
  //             let compareJson;
  //             compareJson = {
  //               coursedetail: this.currentcoursedetails,
  //               courseIndex: this.courseIndex
  //             };
  //             //console.log("CourseCompare-->",this.courseCompare)
  //             this.courseCompare.emit(compareJson);
  //             console.log("CourseCompare-->", this.courseCompare)
  //             document.getElementById('close-modal').click();
  //             // this.onCourseCompare(coursedetail)

  //           } else {

  //             $("#myModalcoursecompare").modal('show');
  //           }

  //         }
  //       },
  //         err => {
  //           if (err.status === 401) {
  //             this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
  //           } else if (err.status === 400) {
  //             this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
  //           } else {
  //             this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
  //           }
  //           this.submitted = false;

  //         });
  //     },
  //       err => {
  //         if (err.status === 401) {
  //           this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
  //         } else if (err.status === 400) {
  //           this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
  //         } else {
  //           this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
  //         }
  //         this.submitted = false;
  //       });
  //   }
  // }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
