import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { StudentService } from '../../services/student.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Component({
  selector: 'app-mhistory',
  templateUrl: './mhistory.component.html',
  styleUrls: ['./mhistory.component.scss']
})
export class MhistoryComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private adataservice: AuthdataService,
    private studentService: StudentService,
    private courseService: CourseService,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
    private mservice: ToastService,
  ) { }
  userid: string;
  projectid: number;
  accounttype: number;
  userdata: any;
  favouritesData: any;
  compareData: any;
  activeFlag = 'f';
  permissions: any = {};
  ngOnInit() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    this.permissions = this.adataservice.getPermission('Student dashboard');
    if (this.userdata !== '') {
      this.userid = this.userdata.uid;
      this.accounttype = this.userdata.typeofaccount;
      this.projectid = this.userdata.projectid;
      // this.accounttype == 4 --> Super Admin
      // if (this.accounttype == 1 || this.accounttype == 4) {
      //   this.projectid = 0;
      // } else {
      //   this.projectid = 1;
      // }
      this.getStudentHistory();
      this.cd.markForCheck();
    }

  }
  getStudentHistory() {
    this.studentService.getStudentHistory1(this.encdec.encryptSensitive(this.userid.toString()), this.encdec.encryptSensitive(this.projectid.toString()), this.encdec.encryptSensitive(this.accounttype.toString())).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.compareData = (data.outdatalist[0]) ? data.outdatalist[0] : [];
        this.favouritesData = (data.outdatalist[1] && data.outdatalist[1] != undefined) ? data.outdatalist[1] : [];
      }
      this.cd.markForCheck();
    })
  }
  removeCourse(list) {
    if (this.activeFlag === 'f') {
      const payload = {
        userid: this.userid,
        usertypeid: this.accounttype,
        tablename: 'tblcourse',
        tableid: list.cid,
        favorite: 0,
        productid: this.projectid
      }
      this.courseService.addtofavourite(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', 'Favourite removed !!', 'SUCCESS');
          this.getStudentHistory();
        }

      });
    } else {
      this.courseService.deleteCourseCompare(list.compareid, list.cid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', 'Course removed !!', 'SUCCESS');
          this.getStudentHistory();
        }

      });
    }
  }
  changeTab(tab) {
    this.activeFlag = tab;
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
