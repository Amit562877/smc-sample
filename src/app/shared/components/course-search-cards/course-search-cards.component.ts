import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { takeUntil } from 'rxjs/operators';
import { ToastService } from '../../services/message/toast.service';
@Component({
  selector: 'app-course-search-cards',
  templateUrl: './course-search-cards.component.html',
  styleUrls: ['./course-search-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSearchCardsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  @Input() selectedIds: any;
  @Input() coursedetail = new Course();
  @Input() courseIndex: any;
  @Input() switchFlag: any;
  @Output() passUnivId = new EventEmitter<string>();
  univId: any;
  ischecked: boolean;
  environment = environment;
  viewtype = 'original';
  constructor(
    private cd: ChangeDetectorRef,
    private courseService: CourseService,
    private mservice: ToastService,
  ) { }
  engData: any = [];
  intakeData: any = [];
  ngOnChanges(changes: any) {
    if (changes.selectedIds) {
      this.selectedIds = changes.selectedIds;
      this.isCheckedFunction();
      this.cd.markForCheck()
    }
  }
  ngOnInit() {
    this.univId = [];
    this.isCheckedFunction();
    this.cd.markForCheck()
    
    if (this.switchFlag === 'C') {
      this.viewtype = 'councellor'
    }
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
    if (this.selectedIds.currentValue) {

      let isIncluded = this.selectedIds.currentValue.filter(val => {

        return val.courseid === this.coursedetail.id && val.campusid === this.coursedetail.campusid;

      });
      if (isIncluded && isIncluded.length > 0) {
        this.coursedetail.ischecked = true;
        this.cd.markForCheck()
      } else {
        this.coursedetail.ischecked = false;
      }

    }
  }
  onpassUnivId(coursedetail) {
    this.cd.markForCheck()
    let payload;
    payload = {
      coursedetail: coursedetail
    }

    // let payload = uid + ":" + check + ":" + cid;
    this.passUnivId.emit(payload);

  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
