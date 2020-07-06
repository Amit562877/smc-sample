import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

declare const $: any;
@Component({
  selector: 'app-rolewisepermission',
  templateUrl: './rolewisepermission.component.html',
  styleUrls: ['./rolewisepermission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolewisepermissionComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  roleid = 0;
  role = 0;
  permissionlist: any = [];
  menupermissionlist: any = [];
  rolepermissionlist: any = [];
  constructor(
    private rservice: RoleService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.roleid = this.encdec.convertText('dec', params.roleid.toString());
    });
    this.getAllRoleByFilter();
    this.cd.markForCheck();
  }
  getAllRoleByFilter() {
    this.loadService.loadme = true;
    this.rservice.getRolePermission(this.roleid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.menupermissionlist = (data.outdatalist[0][0].menupermission != null) ? JSON.parse(data.outdatalist[0][0].menupermission) : [];
        this.rolepermissionlist = (data.outdatalist[1][0].rolepermission != null) ? JSON.parse(data.outdatalist[1][0].rolepermission) : [];
        this.permissionlist = data.outdatalist[2];
        this.role = data.outdatalist[3][0].name;
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  selectAll() {
    if (isPlatformBrowser(this._platformId)) {
      $('[name="crs"]').not(':disabled').prop('checked', true);
    }
  }
  deselectAll() {
    if (isPlatformBrowser(this._platformId)) {
      $('[name="crs"]').prop('checked', false);
    }
  }
  saveChanges() {
    const dataobj: any = [];
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = $('[name="crs"]').not(':disabled');
      for (const box of checkboxes) {
        const id = box.id.split('_');
        const pid = id[1];
        const mid = id[0];
        if (box.checked === true) {
          dataobj.push({ roleid: this.roleid, menuid: mid, permissionid: pid, isdeleted: false });
        } else {
          dataobj.push({ roleid: this.roleid, menuid: mid, permissionid: pid, isdeleted: true });
        }
      }
    }

    this.loadService.loadme = true;
    this.rservice.addRolePermission(dataobj).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
