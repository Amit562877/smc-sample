import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';
import { Permission } from '../../models/role';

declare const $: any;
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  searchtext = '';
  permissionlist = [];
  permissioncount: any;
  permission = new Permission();
  constructor(
    private rservice: RoleService,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllPermissionByFilter();
  }
  addNewPermission(headform) {
    if (headform.valid) {
      this.rservice.managePermission(this.permission).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.getAllPermissionByFilter();
            this.permission = new Permission();
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }

          } else {
            this.mservice.generateMessage('ERROR', this.permission.name + ' is already in use.', '');
            this.loadService.loadme = false;
          }
          this.cd.markForCheck();
        } else {
          this.mservice.generateMessage('ERROR', data.message, '');
          this.loadService.loadme = false;
        }
      });
    }
  }
  getAllPermissionByFilter() {
    this.loadService.loadme = true;
    this.rservice.getPermission(this.pageIndex, this.pageSize, this.searchtext).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.permissionlist = data.outdatalist[0];
        this.permissioncount = data.outdatalist[1][0].permissioncount;
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  cancelProcess() {
    this.permission = new Permission();
    this.cd.markForCheck();
  }
  editPermission(permission) {
    this.permission = permission;
    this.cd.markForCheck();
  }
  deletePermission(permission) {
    permission.isdeleted = true;
    this.rservice.managePermission(permission).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdata !== -1) {
          this.getAllPermissionByFilter();
          this.permission = new Permission();
          this.cd.markForCheck();
        } else {
          this.mservice.generateMessage('ERROR', this.permission.name + ' is already in use.', '');
          this.loadService.loadme = false;
        }
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.cd.markForCheck();
    this.getAllPermissionByFilter();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
