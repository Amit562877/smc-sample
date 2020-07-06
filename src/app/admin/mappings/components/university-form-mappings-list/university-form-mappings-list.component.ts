import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UniversityFormMappingsService } from '../../services/university-form-mappings.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PDFModel } from 'src/app/admin/models/PDFmodel';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
declare const performjsAction: any;
declare const $: any;
@Component({
  selector: 'app-university-form-mappings-list',
  templateUrl: './university-form-mappings-list.component.html',
  styleUrls: ['./university-form-mappings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityFormMappingsListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  pdflist: any = [];
  pdfcount: any = 0;
  universitytypelist: any = [];
  universityidlistoriginal: any = [];
  universityidlist: any = [];
  universityidlistmodal: any = [];
  studylevellist: any = [];
  universitytypeid: any = '';
  universityid: any = 0;
  studylevelid: any = 0;
  pageindex: any = 1;
  pagesize: any = 10;
  isupdate = false;
  objectModel = new PDFModel();
  constructor(
    private mappingsService: UniversityFormMappingsService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
    private encdec: EncDecService,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('University forms');
    this.getAllPdf();
  }

  getAllPdf() {
    this.loadService.loadme = true;
    this.pageindex = 1;
    this.mappingsService.getAllMasterPDF(this.pagesize, this.pageindex, this.encdec.encryptSensitive(this.universityid)).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.pdflist = data.outdatalist[0];
        this.pdfcount = data.outdatalist[1][0].pdfcount;
        this.universityidlist = data.outdatalist[2];
        this.universityidlistmodal = data.outdatalist[2];
        this.universityidlistoriginal = data.outdatalist[2];
        this.studylevellist = data.outdatalist[3];
        this.universitytypelist = data.outdatalist[4];
        this.loadService.loadme = false;
        if (isPlatformBrowser(this._platformId)) {
          performjsAction();
          setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
          }, 100);
        }
        this.cd.markForCheck()
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  pageChanged(event) {
    this.pageindex = event;
    this.getPDFbyFilter();
    this.cd.markForCheck();
  }
  getPDFbyFilter() {
    this.loadService.loadme = true;
    this.mappingsService.getAllMasterPDF(this.pagesize, this.pageindex, this.encdec.encryptSensitive(this.universityid)).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.pdflist = data.outdatalist[0];
        this.pdfcount = data.outdatalist[1][0].pdfcount;
        this.loadService.loadme = false;
        if (isPlatformBrowser(this._platformId)) {
          setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
          }, 100);
          performjsAction();
        }
        this.cd.markForCheck()
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }

  getUniversityListByType() {
    if (this.universitytypeid > 0) {
      this.universityidlist = this.universityidlistoriginal.filter(u => u.universitytypeid === this.universitytypeid);
    } else {
      this.universityidlist = this.universityidlistoriginal;
    }
    this.cd.markForCheck();
  }

  getUniversityListByTypeForModal() {
    if (this.objectModel.universitytypeid > 0) {
      this.universityidlistmodal = this.universityidlistoriginal.filter(u => u.universitytypeid === this.objectModel.universitytypeid);
    } else {
      this.universityidlistmodal = this.universityidlistoriginal;
    }
    this.cd.markForCheck();
  }

  uploadFileData(form) {
    if (form.valid) {
      let formData: FormData = new FormData();
      formData.append('id', this.encdec.encryptSensitive((this.objectModel.id) ? this.objectModel.id : 0));
      formData.append('universityid', this.encdec.encryptSensitive(this.objectModel.universityid));
      formData.append('studylevelid', this.encdec.encryptSensitive(this.objectModel.studylevelid));
      formData.append('updatedby', this.encdec.encryptSensitive((this.objectModel.updatedby) ? this.objectModel.updatedby : 1));
      formData.append('createdby', this.encdec.encryptSensitive((this.objectModel.createdby) ? this.objectModel.createdby : 1));
      if (this.objectModel.src) {
        formData.append('UploadedImage', this.objectModel.src, this.objectModel.src.name);
      }
      formData.append('isfile', this.encdec.encryptSensitive((this.objectModel.src) ? 'true' : 'false'));
      this.loadService.loadme = true;
      this.mappingsService.uploadPDF(formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.getAllPdf();
          if (isPlatformBrowser(this._platformId)) {
            $('#media').modal('hide');
          }
          this.mservice.generateMessage('SUCCESS', 'File ' + ((this.objectModel.id) ? 'modified' : 'uploaded') + ' successfuly.', 'SUCCESS');
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
        }
        this.cd.markForCheck()
      });
      if (isPlatformBrowser(this._platformId)) {

        performjsAction();
      }
    }
  }
  editPDF(pdf) {
    this.objectModel = new PDFModel();
    this.objectModel.id = pdf.id;
    this.objectModel.universityid = pdf.universityid;
    this.objectModel.studylevelid = pdf.studylevelid;
    // const stddata = (pdf.studylevelid) ? pdf.studylevelid.split(',') : [];
    // stddata.forEach(element => {
    //   this.objectModel.studylevelid.push(parseInt(element));
    // });
    const tempobj = this.universityidlistoriginal.filter(u => u.id === this.objectModel.universityid);
    this.objectModel.universitytypeid = tempobj[0].universitytypeid;
    this.isupdate = true;
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
    }
    this.cd.markForCheck();
  }
  removeMatserPDF(pdf) {
    this.mappingsService.removePDF(this.encdec.encryptSensitive(pdf.id), pdf.isactive, true, pdf.ispublished).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.getAllPdf();
        this.mservice.generateMessage('SUCCESS', 'File deleted successfuly.', 'SUCCESS');
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck()
    });
  }
  newPDF() {
    this.objectModel = new PDFModel();
    this.isupdate = false;
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
    }
    this.cd.markForCheck();
  }
  fileSlectionChanged(event) {
    if (isPlatformBrowser(this._platformId)) {
      this.objectModel.src = event.target.files[0];
      this.cd.markForCheck();
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
