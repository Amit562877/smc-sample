import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';


@Component({
  selector: 'app-advance-permission',
  templateUrl: './advance-permission.component.html',
  styleUrls: ['./advance-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancePermissionComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  userid = 0;
  user = '';
  permissionlist: any = [];
  menupermissionlist: any = [];
  rolepermissionlist: any = [];
  rolelist: any = [];
  advancepermissionlist: any = [];
  constructor(
    private rservice: RoleService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.userid = (params.userid) ? params.userid.toString() : 1;
    });
    if (this.userid > 0) {
      this.getAllPermissionByFilter();
    }
    this.cd.markForCheck();
  }
  getAllPermissionByFilter() {
    this.loadService.loadme = true;
    this.rservice.getAdvancePermission(this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.menupermissionlist = (data.outdatalist[0][0].menupermission != null) ? JSON.parse(data.outdatalist[0][0].menupermission) : [];
        this.rolepermissionlist = (data.outdatalist[1][0].rolepermission != null) ? JSON.parse(data.outdatalist[1][0].rolepermission) : [];
        this.permissionlist = data.outdatalist[2];
        this.rolelist = data.outdatalist[3];
        this.advancepermissionlist = (data.outdatalist[4][0].advancepermission != null) ? JSON.parse(data.outdatalist[4][0].advancepermission) : [];
        this.user = (data.outdatalist[5].length > 0) ? data.outdatalist[5][0].username : '';
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  saveChanges() {
    const dataobj: any = [];
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = document.getElementsByName('crs');
      for (const box of checkboxes) {
        if (box.checked === true && box.disabled === false) {
          const id = box.id.split('_');
          const pid = id[1];
          const mid = id[0];
          dataobj.push({ userid: this.userid, menuid: mid, permissionid: pid });
        }
      }
    }

    this.loadService.loadme = true;
    this.rservice.addAdvancePermission(dataobj).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  public trackByIndex(index: number) {
    return index;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
