import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewApplicationsService } from '../../services/view-applications.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.scss']
})
export class ViewApplicationsComponent implements OnInit {

  constructor(
    private vservice: ViewApplicationsService,
    private adataservice: AuthdataService,
    private cd: ChangeDetectorRef,
  ) { }
  componentDestroyed$: Subject<boolean> = new Subject();
  userdata: any;
  createdApplications = [];
  sharedApplications = [];
  activeFlag = 'c';
  ngOnInit() {
    this.getViewApplicationsList();
  }
  getViewApplicationsList() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    // console.log(this.userdata);
    this.vservice.getViewApplicationsList(this.userdata.projectid, this.userdata.uid, this.userdata.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.createdApplications = (data.outdatalist[1] && data.outdatalist[1].length > 0) ? data.outdatalist[1] : [];
        this.sharedApplications = (data.outdatalist[0] && data.outdatalist[0].length > 0) ? data.outdatalist[0] : [];
      }
    });
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
