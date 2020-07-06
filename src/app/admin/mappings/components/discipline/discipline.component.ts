import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MDiscipline } from 'src/app/admin/models/currency';
import { DisciplineService } from '../../services/discipline.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { ManageDisciplineService } from 'src/app/admin/manage/services/discipline.service';
declare const $: any;
@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisciplineComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private disciplineService: DisciplineService,
    private mdservice: ManageDisciplineService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
  ) { }

  disciplineList: any = [];
  disciplineListOriginal: any = [];
  masterDisciplineList: any = [];
  mdn: any = '';
  mdid: any = '';
  showme = 1;
  records = 10;
  mdiscipline = new MDiscipline();
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Discipline');
    this.getAllDiscipline();
  }
  getAllDiscipline() {
    this.loadService.loadme = true;
    this.disciplineService.getDiscipline(this.records, this.showme).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.disciplineList = [];
        this.disciplineListOriginal = data.outdatalist[0];
        this.disciplineListOriginal.forEach(element => {
          let elmdata = element;
          if (elmdata.masterdisciplineid === 0) {
            elmdata.masterdisciplineid = '';
          }
          this.disciplineList.push(elmdata);
        });
        this.masterDisciplineList = data.outdatalist[1];
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
      this.cd.markForCheck();
    });
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
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }
            this.masterDisciplineList.push({ id: data.outdata, name: this.mdiscipline.name });
            this.mdiscipline = new MDiscipline();
            this.loadService.loadme = false;
          } else {
            this.mservice.generateMessage('ERROR', this.mdiscipline.name + ' is already in use.', '');
            this.loadService.loadme = false;
          }
        } else {
          this.mservice.generateMessage('ERROR', data.message, '');
          this.loadService.loadme = false;
        }
        this.cd.markForCheck();
      });
    }
  }
  cancelProcess() {
    this.mdiscipline = new MDiscipline();
    this.cd.markForCheck();
  }
  // deleteMasterDiscipline(id) {
  //   this.loadService.loadme = true;
  //   this.disciplineService.deletemasterdisciplinemapping(id).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //     if (data.flag) {
  //       this.masterDisciplineMappingList = this.masterDisciplineMappingList.filter(el => el.id !== id);
  //       this.loadService.loadme = false;
  //     } else {
  //       this.loadService.loadme = false;
  //       this.mservice.generateMessage('ERROR', 'FAILED', data.message);
  //     }
  //   });
  // }
  saveMasterDisciplineMapping() {
    this.loadService.loadme = true;
    const dummyarray = [];
    this.disciplineList.forEach(element => {
      if (element.masterdisciplineid > 0) {
        dummyarray.push(element);
      }
    });
    this.disciplineService.addmasterdisciplinemapping(dummyarray).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
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
