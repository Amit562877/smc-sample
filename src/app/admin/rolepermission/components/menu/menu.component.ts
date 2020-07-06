import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

declare const $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  searchtext = '';
  menulist = [];
  parentmenulist = [];
  menucount: any;
  menu = new Menu();
  constructor(
    private rservice: RoleService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getMenuListByFilter();
  }
  getMenuListByFilter() {
    this.loadService.loadme = true;
    this.rservice.getMenuList(this.pageIndex, this.pageSize, this.searchtext).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.menulist = data.outdatalist[0];
        this.menucount = data.outdatalist[1][0].menucount;
        this.parentmenulist = data.outdatalist[2];
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
    });
  }

  manageMenu(headform, action) {
    if (headform.valid || action === 'delete') {
      this.loadService.loadme = true;
      this.rservice.manageMenu(this.menu).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag && data.outdata > 0) {
          this.getMenuListByFilter();
          $('#media').modal('hide');
          this.menu = new Menu();
          this.cd.markForCheck();
          this.mservice.generateMessage('SUCCESS', 'Menu saved successfully!', 'SUCCESS');
        } else if (data.flag && data.outdata === -1) {
          this.mservice.generateMessage('ERROR', 'Menu ' + this.menu.name + ' is already exists', 'ALREADY EXISTS');
          this.cd.markForCheck();
          this.loadService.loadme = false;
        } else {
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
          this.loadService.loadme = false;
        }
      });
    }
  }
  cancelProcess() {
    this.menu = new Menu();
  }
  editMenu(menu) {
    this.menu = menu;
    this.cd.markForCheck();
  }
  deleteMenu(menu) {
    this.menu = menu;
    this.menu.isdeleted = true;
    this.manageMenu('', 'delete');
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.cd.markForCheck();
    this.getMenuListByFilter();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
