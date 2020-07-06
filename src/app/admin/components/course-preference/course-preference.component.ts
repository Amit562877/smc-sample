import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BroadcastService } from 'src/app/shared/services/broadcast.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CoursePreferenceService } from '../../services/course-preference.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { EncDecService } from 'src/app/shared/services/enc-dec.service';
declare const $: any;
@Component({
  selector: 'app-course-preference',
  templateUrl: './course-preference.component.html',
  styleUrls: ['./course-preference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePreferenceComponent implements OnInit, OnDestroy {
  @Output() refreshQuestions = new EventEmitter();
  @Input() applicantidf;
  @Input() setPermissionFlag = '';
  pid: string;
  aid: string;
  coursesDetails: any;
  passCoursePrefIds = [];
  passUnivPrefIds = [];
  iframeUrl = '';
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(private coursePreferenceService: CoursePreferenceService,
    private service: BroadcastService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.service.click.pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.applicantidf = data;
      this.getMappingCourses();
      this.cd.markForCheck();
    });
    this.getMappingCourses();
  }
  isDisabled() {
    if (this.setPermissionFlag === 'View') {
      return true;
    } else {
      return false;
    }
  }
  reloadQuestions() {
    this.refreshQuestions.emit('');
    sessionStorage.setItem('ispopup', 'false');
  }
  getMappingCourses() {
    this.coursePreferenceService.getMappingCourses(this.applicantidf).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.coursesDetails = data.outdatalist[0];
      let univids = [];
      for (let course of this.coursesDetails) {
        if (univids.length > 0) {
          if (!univids.includes(course.universityid)) {
            univids.push(course.universityid);
          }
        } else {
          univids.push(course.universityid)
        }
        course.intakes = (course.intakes && course.intakes.length > 0) ? JSON.parse(course.intakes) : [];
        course.majorminor = (course.majorminor && course.majorminor.length > 0) ? JSON.parse(course.majorminor) : [];
        // course.discipline = (course.discipline && course.discipline.length > 0) ? JSON.parse(course.discipline) : [];
        // course.selecteddiscipline = (course.selecteddiscipline.length === 0) ? '' : course.selecteddiscipline;
        course.selectedintake = (course.selectedintake.length === 0) ? '' : course.selectedintake;
        course.selectedmajor = (course.selectedmajor.length === 0) ? '' : course.selectedmajor;
        course.selectedminor = (course.selectedminor.length === 0) ? '' : course.selectedminor;
      }
      let newunivids = univids.join(',');
      sessionStorage.setItem('univids', newunivids);
      this.passCoursePrefIds = this.coursesDetails;
      if (sessionStorage.getItem('aid')) {
        this.aid = sessionStorage.getItem('aid');
      } else {
        this.aid = sessionStorage.getItem('aid_param');
      }

      this.pid = sessionStorage.getItem('pid');
      if (this.coursesDetails.length > 0) {
        for (let i = 0; i < this.coursesDetails.length; i++) {
          this.coursesDetails[i].sequence = i + 1;

          // let encCid = this.coursesDetails[i].courseid.toString();
          // this.passCoursePrefIds.push(encCid);
          // this.passUnivPrefIds.push(this.coursesDetails[i].universityid);
        }
      }
      this.cd.markForCheck();
    });
  }

  dropCourse(event) {
    if (this.setPermissionFlag !== 'View') {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let cnt = 1;
      for (let i = 0; i < this.coursesDetails.length; i++) {
        this.coursesDetails[i].sequence = cnt;
        cnt++;
      }
      this.coursePreferenceService.updateCoursePrefSequence(this.coursesDetails).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        this.getMappingCourses();
        this.cd.markForCheck();
      });
    }
  }
  DeleteCourcePref(course) {
    if (this.setPermissionFlag === 'View') {
      return false;
    }
    let courseIds = this.passCoursePrefIds;
    let indexOfCourse = courseIds.indexOf(course.courseid.toString());
    if (indexOfCourse !== -1) {
      this.passCoursePrefIds.splice(indexOfCourse, 1);
      this.passUnivPrefIds.splice(indexOfCourse, 1);
    }
    this.coursePreferenceService.deleteCourcePref(course).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.getMappingCourses();
      this.refreshQuestions.emit('');
      this.cd.markForCheck();
    });
  }
  changeDropdowns(list, type) {
    let payload = {
      id: list.id,
      selectedvalue: '',
      type: ''
    };
    if (type === 'intake') {
      payload.selectedvalue = list.selectedintake;
      payload.type = 'intake';
    } else if (type === 'major') {
      payload.selectedvalue = list.selectedmajor;
      payload.type = 'major';
    } else if (type === 'minor') {
      payload.selectedvalue = list.selectedminor;
      payload.type = 'minor';
    } 
    // else if (type === 'discipline') {
    //   payload.selectedvalue = list.selecteddiscipline;
    //   payload.type = 'discipline';
    // }
    this.coursePreferenceService.updatePrefDropdowns(payload.id, payload.selectedvalue, payload.type).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      // this.getMappingCourses();
      this.cd.markForCheck();
    });
  }
  AddPreference() {
    let rno = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    this.iframeUrl = window.origin + '/program/course-search/' + rno + '/' + this.pid + '/' + this.aid + '/true';
    if (isPlatformBrowser(this._platformId)) {
      $('#Fullmodal').modal('show');
    }

  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
