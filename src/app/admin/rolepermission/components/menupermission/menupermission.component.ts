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
  selector: 'app-menupermission',
  templateUrl: './menupermission.component.html',
  styleUrls: ['./menupermission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenupermissionComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  permissionlist: any = [];
  menulist: any = [];
  menupermissionlist: any = [];

  constructor(
    private rservice: RoleService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.getAllPermissionByFilter();
  }
  getAllPermissionByFilter() {
    this.loadService.loadme = true;
    this.rservice.getMenupermissionList().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.menupermissionlist = (data.outdatalist[0][0].menupermission != null) ? JSON.parse(data.outdatalist[0][0].menupermission) : [];
        this.permissionlist = data.outdatalist[2];
        this.menulist = data.outdatalist[1];
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  saveChanges() {
    this.cd.markForCheck();
    const dataobj: any = [];
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = document.getElementsByName('crs');
      for (const box of checkboxes) {
        if (box.checked === true && box.disabled === false) {
          const id = box.id.split('_');
          const pid = id[1];
          const mid = id[0];
          dataobj.push({ menuid: mid, permissionid: pid });
        }
      }
    }
    this.cd.markForCheck();
    this.loadService.loadme = true;
    this.rservice.addMenuPermission(dataobj).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
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
