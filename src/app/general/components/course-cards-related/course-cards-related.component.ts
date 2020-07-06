import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { environment } from 'src/environments/environment';
import { CourseService } from 'src/app/services/course.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/shared/services/message/toast.service';
@Component({
  selector: 'app-course-cards-related',
  templateUrl: './course-cards-related.component.html',
  styleUrls: ['./course-cards-related.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardsRelatedComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  @Output() getRelated = new EventEmitter();
  @Input() coursedetail = new Course();
  @Input() setDefaultCurrency = '';
  @Input() switchFlag: any;
  viewtype = 'original';
  newFees: any;
  newCurrency: any;
  courseid = '';
  universityid = '';
  environment = environment;
  constructor(
    private cd: ChangeDetectorRef,
    private courseService: CourseService,
    private mservice: ToastService
  ) { }
  engData: any = [];
  intakeData: any = [];
  ngOnChanges(changes: any) {
    if (changes.setDefaultCurrency) {
      this.setDefaultCurrency = changes.setDefaultCurrency.currentValue;
    }
    this.changeCurrency();
    if (this.switchFlag === 'C') {
      this.viewtype = 'councellor'
    }

  }
  ngOnInit() {
    this.changeCurrency();
  }
  getRelatedCourse(universityid, courseid) {
    this.courseid = courseid;
    this.universityid = universityid;
    this.getRelated.emit({ courseid: this.courseid, universityid: this.universityid });
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
  changeCurrency() {
    let splitCurr = this.setDefaultCurrency.split(':');
    let ExchangeRate = splitCurr[0];
    let newFees = (this.coursedetail.feeamount !== 0) ? (parseFloat(this.coursedetail.feeamount) * parseFloat(ExchangeRate)).toFixed(2) : 0;
    this.newFees = newFees;
    this.newCurrency = splitCurr[1];
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
