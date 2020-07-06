import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CourseIssueService } from '../../services/course-issue.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Component({
  selector: 'app-course-issue-edit',
  templateUrl: './course-issue-edit.component.html',
  styleUrls: ['./course-issue-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseIssueEditComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  courseid: any;
  coursedata: any;
  constructor(
    private adataservice: AuthdataService,
    private cservice: CourseIssueService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.courseid = this.encdec.convertText('dec', params.courseid.toString());
      this.cd.markForCheck();
    });
    this.loadService.loadme = true;
    this.cservice.getCoursebyId(this.courseid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.coursedata = JSON.parse(data.outdatalist[0][0].coursedata);
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  public trackByIndex(index: number) {
    return index;
  }

  // internal tasks to add or remove elements
  addDiscipline() {
    this.coursedata.course_discipline.push('');
    this.cd.markForCheck();
  }
  removeDiscipline(index) {
    this.coursedata.course_discipline.splice(index, 1);
    this.cd.markForCheck();
  }
  addOutcome() {
    this.coursedata.course_career_outcome.push('');
    this.cd.markForCheck();
  }
  removeOutcome(index) {
    this.coursedata.course_career_outcome.splice(index, 1);
    this.cd.markForCheck();
  }

  addAcademic() {
    this.coursedata.course_admission_requirement.academic.push('');
    this.cd.markForCheck();
  }
  removeAcademic(index) {
    this.coursedata.course_admission_requirement.academic.splice(index, 1);
    this.cd.markForCheck();
  }

  addDuration() {
    const duration: any = {};
    duration.unit = '';
    duration.duration = '';
    duration.filterduration = '';
    duration.display = '';
    this.coursedata.course_duration_display.push(duration);
    this.cd.markForCheck();
  }
  removeDuration(index) {
    this.coursedata.course_duration_display.splice(index, 1);
    this.cd.markForCheck();
  }
  addCampus() {
    const campus: any = {};
    campus.name = '';
    campus.code = '';
    // campus.state = '';
    // campus.country = '';
    // campus.iscurrent = false;
    this.coursedata.course_campus_location.push(campus);
    this.cd.markForCheck();
  }
  removeCampus(index) {
    this.coursedata.course_campus_location.splice(index, 1);
    this.cd.markForCheck();
  }
  addCricos() {
    const cricos: any = {};
    cricos.location = '';
    cricos.code = '';
    cricos.iscurrent = false;
    this.coursedata.course_cricos_code.push(cricos);
    this.cd.markForCheck();
  }
  removeCricos(index) {
    this.coursedata.course_cricos_code.splice(index, 1);
    this.cd.markForCheck();
  }
  addEnglish() {
    const english: any = {};
    english.name = '';
    english.description = '';
    english.min = 0;
    english.max = 0;
    english.require = 0;
    english.O = 0;
    english.R = 0;
    english.W = 0;
    english.S = 0;
    english.L = 0;

    this.coursedata.course_admission_requirement.english.push(english);
    this.cd.markForCheck();
  }
  removeEnglish(index) {
    this.coursedata.course_admission_requirement.english.splice(index, 1);
    this.cd.markForCheck();
  }
  addFees() {
    const fee: any = {};
    fee.name = '';
    fee.value = {};
    const subfee: any = {};
    subfee.amount = '';
    subfee.duration = '';
    subfee.unit = '';
    // subfee.isfulltime = '';
    subfee.description = '';
    // subfee.type = '';
    fee.value.international_student = subfee;
    fee.value.fee_duration_years = [];
    fee.value.currency = [];
    // fee.value.international_student_all_fees = [];
    // fee.iscurrent = false;
    this.coursedata.course_tuition_fee.fees.push(fee);
    this.cd.markForCheck();
  }
  removeFees(index) {
    this.coursedata.course_tuition_fee.fees.splice(index, 1);
    this.cd.markForCheck();
  }
  addSubFees(index) {
    const subfee: any = {};
    subfee.amount = '';
    subfee.duration = '';
    subfee.unit = '';
    // subfee.isfulltime = '';
    subfee.description = '';
    // subfee.type = '';
    this.coursedata.course_tuition_fee.fees[index].value.international_student = subfee;
    this.cd.markForCheck();
  }
  removeSubFees(index, subindex) {
    this.coursedata.course_tuition_fee.fees[index].value.international_student = {};
    this.cd.markForCheck();
  }


  addIntake() {
    const inatake: any = {};
    inatake.name = '';
    inatake.iscurrent = false;
    const subinatake: any = {};
    subinatake.actualdate = '';
    subinatake.month = '';
    // subinatake.intake = '';
    // subinatake.filterdate = '';
    inatake.value = [subinatake];
    this.coursedata.course_intake.intake.push(inatake);
    this.cd.markForCheck();
  }
  removeIntake(index) {
    this.coursedata.course_intake.intake.splice(index, 1);
    this.cd.markForCheck();
  }
  addSubIntake(index) {
    const subinatake: any = {};
    subinatake.actualdate = '';
    subinatake.month = '';
    //  subinatake.intake = '';
    //  subinatake.filterdate = '';
    this.coursedata.course_intake.intake[index].value.push(subinatake);
    this.cd.markForCheck();
  }
  removeSubIntake(index, subindex) {
    this.coursedata.course_intake.intake[index].value.splice(subindex, 1);
    this.cd.markForCheck();
  }
  addExtraFee(index) {
    this.coursedata.course_tuition_fee.fees[index].value.international_student_all_fees.push('');
    this.cd.markForCheck();
  }
  removeExtraFee(index, subindex) {
    this.coursedata.course_tuition_fee.fees[index].value.international_student_all_fees.splice(subindex, 1);
    this.cd.markForCheck();
  }

  addMajors() {
    this.coursedata.course_outline.majors.push('');
    this.cd.markForCheck();
  }
  removeMajors(index) {
    this.coursedata.course_outline.majors.splice(index, 1);
    this.cd.markForCheck();
  }
  addMinors() {
    this.coursedata.course_outline.minors.push('');
    this.cd.markForCheck();
  }
  removeMinors(index) {
    this.coursedata.course_outline.minors.splice(index, 1);
    this.cd.markForCheck();
  }
  saveCourse() {
    this.loadService.loadme = true;
    this.cservice.saveCourse([this.coursedata], this.adataservice.getUserId()).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
        this.mservice.generateMessage('SUCCESS', 'Course updated successfully.', 'SUCCESS');
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
  }
}
