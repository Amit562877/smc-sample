import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { ReportIssueService } from 'src/app/admin/report-issue/services/report-issue.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportIssueComponent implements OnInit,OnDestroy {
  pageIndex = 1;
  pageSize = 10;
  issuelist =[];
  issuecount = 0;
  issuecnt=0;
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private adataservice: AuthdataService,
    private reportissueservice:ReportIssueService,
    private cd: ChangeDetectorRef
  ) { 
    
  }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice .getPermission('report-issue');
    this.getissue();
  }
  getissue(){
    this.reportissueservice.getissue(this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.issuelist=JSON.parse(data.outdatalist[0]);
        this.issuecnt = JSON.parse(data.outdatalist[1]);
        this.issuecount=  this.issuecnt[0].issuecount
        this.cd.markForCheck();
      }
   
    })

  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getissue();
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
