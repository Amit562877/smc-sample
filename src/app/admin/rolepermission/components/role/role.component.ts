import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../models/role';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  searchtext = '';
  rolelist = [];
  rolecount: any;
  role = new Role();
  constructor(
    private rservice: RoleService,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Manage Role');
    this.getAllRoleByFilter();
  }
  addNewRole(headform) {
    if (headform.valid) {
      this.role.createdby = this.adataservice.getUserId();
      this.role.updatedby = this.adataservice.getUserId();
      this.rservice.manageRole(this.role).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.getAllRoleByFilter();
            this.role = new Role();
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }
            this.cd.markForCheck();
          } else {
            this.mservice.generateMessage('ERROR', this.role.name + ' is already in use.', '');
            this.loadService.loadme = false;
          }
        } else {
          this.mservice.generateMessage('ERROR', data.message, '');
          this.loadService.loadme = false;
        }
      });
    }
  }
  getAllRoleByFilter() {
    this.loadService.loadme = true;
    this.rservice.getRoles(this.pageIndex, this.pageSize, this.searchtext, this.adataservice.getUserId()).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.rolelist = data.outdatalist[0];
        this.rolecount = data.outdatalist[1][0].rolecount;
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }
  cancelProcess() {
    this.role = new Role();
  }
  editRole(role) {
    this.role = role;
    this.cd.markForCheck();
  }
  deleteRole(role) {
    role.isdeleted = true;
    role.updatedby = this.adataservice.getUserId();
    this.rservice.manageRole(role).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdata !== -1) {
          this.getAllRoleByFilter();
          this.role = new Role();
          this.cd.markForCheck();
        } else {
          this.mservice.generateMessage('ERROR', this.role.name + ' is already in use.', '');
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
    this.getAllRoleByFilter();
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
