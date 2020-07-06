import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Component({
  selector: 'app-course-compare',
  templateUrl: './course-compare.component.html',
  styleUrls: ['./course-compare.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCompareComponent implements OnInit, OnDestroy {
  courseCompareData: any;
  compareid: any;
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService
  ) { }
  agnetDetails: any = {};
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      // this.cid = params.cid.toString();
      this.compareid = params.compareid.toString();
      this.agnetDetails.agentLogoURL = (params.al) ? JSON.parse(this.encdec.decryptSensitiveV1(params.al)) : '';
      this.agnetDetails.agentOrganization = (params.ao) ? JSON.parse(this.encdec.decryptSensitiveV1(params.ao)) : '';
      this.agnetDetails.agentWebURL = (params.aw) ? JSON.parse(this.encdec.decryptSensitiveV1(params.aw)) : '';
    });

    this.courseService.getCompareData(this.compareid).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
      if (comparedata.flag) {
        this.courseCompareData = [];
        for (let cdata of comparedata.outdatalist[0]) {
          if (cdata.coursedata) {
            cdata.coursedata = JSON.parse(cdata.coursedata);
            cdata.coursedata.cid = cdata.courseid;
            cdata.coursedata.uid = cdata.univid;
            cdata.coursedata.univ_name = cdata.univname;
            this.courseCompareData.push(cdata.coursedata);
          }
        }
        this.cd.markForCheck();
      }
    });
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
