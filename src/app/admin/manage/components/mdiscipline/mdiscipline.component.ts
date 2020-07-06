import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { MDiscipline } from 'src/app/admin/models/currency';
import { ManageDisciplineService } from 'src/app/admin/manage/services/discipline.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
declare const $: any;
@Component({
  selector: 'app-mdiscipline',
  templateUrl: './mdiscipline.component.html',
  styleUrls: ['./mdiscipline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdisciplineComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  mdlist = [];
  mdcount: any;
  environment = environment;
  mdiscipline = new MDiscipline();
  constructor(
    private mdservice: ManageDisciplineService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService ,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Master discipline');
    this.getAllMDByFilter();
  }
  addNewMD(headform) {
    if (headform.valid) {
      let formData: FormData = new FormData();
      formData.append('id', (this.mdiscipline.id) ? this.mdiscipline.id.toString() : '0');
      formData.append('name', this.mdiscipline.name);
      formData.append('updatedby', (this.mdiscipline.updatedby) ? this.mdiscipline.updatedby.toString() : '1');
      formData.append('createdby', (this.mdiscipline.createdby) ? this.mdiscipline.createdby.toString() : '1');
      formData.append('isactive', (this.mdiscipline.isactive) ? this.mdiscipline.isactive.toString() : 'true');
      formData.append('isdeleted', (this.mdiscipline.isdeleted) ? this.mdiscipline.isdeleted.toString() : 'false');
      formData.append('UploadedImage', this.mdiscipline.src, this.mdiscipline.src.name);
      this.loadService.loadme = true;
      this.mdservice.addMasterDiscipline(formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.getAllMDByFilter();
            this.mdiscipline = new MDiscipline();
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }
            this.loadService.loadme = false;
          } else {
            this.mservice.generateMessage('ERROR', this.mdiscipline.name + ' is already in use.', '');
            this.loadService.loadme = false;
          }

        } else {
          this.mservice.generateMessage('ERROR', data.message, '');
          this.loadService.loadme = false;
        }
        this.cd.markForCheck()
      });
    }
  }
  getAllMDByFilter() {
    this.loadService.loadme = true;
    this.mdservice.getAllmasterdiscipline(this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mdlist = data.outdatalist[0];
        this.mdcount = data.outdatalist[1][0].mdcount;
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  cancelProcess() {
    this.mdiscipline = new MDiscipline();
    this.cd.markForCheck();
  }
  editMD(mdobj) {
    this.mdiscipline = mdobj;
    this.cd.markForCheck();
  }
  deleteMD(id) {
    this.mdservice.deletemasterdiscipline(id).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.getAllMDByFilter();
        this.mdiscipline = new MDiscipline();
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getAllMDByFilter();
    this.cd.markForCheck();
  }
  fileSlectionChanged(event) {
    if (isPlatformBrowser(this._platformId)) {
      this.mdiscipline.src = event.target.files[0];
      this.cd.markForCheck();
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}