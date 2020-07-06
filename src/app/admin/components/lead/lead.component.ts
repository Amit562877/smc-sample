import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LeadService } from '../../services/lead.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { CourseService } from 'src/app/services/course.service';


declare const $: any;
@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  leadlist: any;
  projectid: number;
  userdata: any;
  userid: any;

  constructor(private LeadService: LeadService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private adataservice: AuthdataService,
    private mservice: ToastService,
    private router: Router,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private encdec: EncDecService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    if (this.userdata != '') {
      this.userid = this.userdata.uid;
      this.projectid = this.userdata.projectid;
      this.GetLeadList();
    }
  }

  GetLeadList() {
    const projectid = this.projectid;
    this.LeadService.getleadList(projectid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.outdatalist[0] != "No Data Found") {
        if (data.outdatalist[0].length > 0) {
          this.leadlist = JSON.parse(data.outdatalist[0]);
          this.cd.markForCheck();
        } else {
          this.cd.markForCheck();
          this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
        }
      }
      else {
        this.leadlist = '';
      }
    });
  }

  viewOnform(obj) {

    let courseid = obj.courseid;
    let campusid = obj.coursecampuse;
    let universityid = obj.universityid;
    let projectmapid = "";
    let applicantId = obj.id;

    this.courseService.insertProjectMappingDetails(obj.projectid, obj.id, this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(getdata => {
      projectmapid = getdata.outdata;
      this.saveCourseDetails(obj.courseid, campusid, universityid, projectmapid, applicantId);

      //this.router.navigate([]).then(result => {  window.open('/program/course-search/leadinfo/' + obj.projectid + '/' + obj.id, '_blank'); });

      //this.router.navigate([]).then(result => {  window.open('/user/assessment/' + universityid + '/' + projectmapid, '_blank'); });

      this.router.navigate(['/user/assessment/', this.encdec.encryptSensitiveV1(universityid), this.encdec.encryptSensitiveV1(projectmapid)]);

    });
  }

  saveCourseDetails(courseid, campusid, universityid, projectmapid, applicantId) {
    let payloadArr;
    payloadArr = {
      courseid: courseid,
      campusid: campusid,
      universityid: universityid,
      projectmapid: projectmapid,
      createdby: applicantId,
      sequence: 0,
      isactive: 1,
      isdelete: 0
    };
    let courseMappingDetail = {
      mappingDetails: [payloadArr],
      projectmapid: projectmapid
    }
    this.courseService.saveCourseMappingDetails(courseMappingDetail).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.loadService.loadme = false;
    });
  }

  getCourseDetails(courseid) {
    this.LeadService.getCourseDetails(courseid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.outdatalist[0] != "No Data Found") {
        if (data.outdatalist[0].length > 0) {
          var courseinfo = JSON.parse(data.outdatalist[0]);

          this.cd.markForCheck();
        } else {
          this.cd.markForCheck();
          this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
        }
      }
    });
  }



  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
