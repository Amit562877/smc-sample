import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UnivOneFormService } from '../../services/univ-one-form.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-univ-one-form',
  templateUrl: './univ-one-form.component.html',
  styleUrls: ['./univ-one-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnivOneFormComponent implements OnInit, OnDestroy {

  constructor(private univOneFormService: UnivOneFormService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService
  ) { }
  componentDestroyed$: Subject<boolean> = new Subject();
  allproduct: any;
  productid = 0;
  productname = '';
  displayboxes: any;
  universitylist: any;
  studylevellist: any;
  studylevelid = '';
  isactive = true;
  productdesc = '';
  model = {};
  pageIndex = 1;
  pageSize = 10;
  totalrecords = 0;
  submitted = false;
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('University Form');
    if (isPlatformBrowser(this._platformId)) {
      $('#AddUniversityId').hide();
      $('#displayUniversityRecords').show();
    }


    this.predifine();
    this.GetAllProduct();

  }

  predifine() {
    this.univOneFormService.getalluniversity().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0]) {
        if (data.outdatalist[0].length > 0) {
          this.universitylist = data.outdatalist[0];
        }
        else {
          this.universitylist = []
        }

        if (data.outdatalist[1].length > 0) {
          this.studylevellist = data.outdatalist[1];
        }
        else {
          this.studylevellist = [];
        }
        this.cd.markForCheck();
      }
    });

  }

  AddNewProduct() {
    this.productid = 0;
    this.productname = '';
    this.studylevelid = '';
    this.productdesc = '';
    this.isactive = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#displayUniversityRecords').hide();
      $('#AddUniversityId').show();
    }
    this.cd.markForCheck();
  }
  EditProduct(product) {
    this.productid = product.productid;
    this.productname = product.productname;
    if (product.studylevelid == 0) {
      this.studylevelid = '';
    }
    else {
      this.studylevelid = product.studylevelid;
    }
    this.productdesc = product.productdesc;
    this.isactive = product.isactive;
    if (isPlatformBrowser(this._platformId)) {
      $('#AddUniversityId').show();
      $('#displayUniversityRecords').hide();
    }
    this.cd.markForCheck();
  }
  DeleteProduct(product) {
    this.univOneFormService.deleteProduct(product.productid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.GetAllProduct();
      this.cd.markForCheck();
    });
  }
  ClearField() {
    if (isPlatformBrowser(this._platformId)) {
      $('#AddUniversityId').hide();
      $('#displayUniversityRecords').show();
    }

    this.productdesc = '';
    this.productname = '';
    this.isactive = true;
    this.submitted = false;
    this.cd.markForCheck();
  }
  SaveProduct(addProductForm) {
    this.submitted = true;
    if (addProductForm.valid) {
      this.submitted = false;
      const payload = {
        productid: this.productid,
        productname: this.productname,
        productdesc: this.productdesc,
        studylevel: this.studylevelid,
        isactive: this.isactive,
        createdby: 1
      };
      this.univOneFormService.saveProduct(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

        if (data.flag) {

          this.ClearField();
          this.GetAllProduct();
          this.cd.markForCheck();
        }
      });
    }

  }
  GetAllProduct() {
    this.univOneFormService.getAllProduct(this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(getData => {
      if (getData.flag && getData.outdatalist[0]) {
        this.allproduct = getData.outdatalist[0];
        if (this.allproduct.length > 0) {
          this.totalrecords = this.allproduct[0].totalrecord;
        }
        this.cd.markForCheck();
      } else {
        this.allproduct = [];
        alert('Some Error Occured');
      }
    });
  }
  changePageSize() {
    this.pageIndex = 1;
    this.cd.markForCheck();
    this.GetAllProduct();
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.cd.markForCheck();
    this.GetAllProduct()
  }
  ConvertToInt(val) {
    return parseInt(val);
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
