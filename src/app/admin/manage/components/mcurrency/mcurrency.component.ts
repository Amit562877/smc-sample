import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { McurrencyService } from 'src/app/admin/manage/services/mcurrency.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Currency } from 'src/app/admin/models/currency';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-mcurrency',
  templateUrl: './mcurrency.component.html',
  styleUrls: ['./mcurrency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class McurrencyComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  pageIndex = 1;
  pageSize = 10;
  currencylist = [];
  currencycount: any;
  currency = new Currency();
  constructor(
    private cservice: McurrencyService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Currency');
    this.getAllCurrencyByFilter();
  }
  addNewCurrency(headform) {
    if (headform.valid) {
      this.cservice.addCurrency(this.currency).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata !== -1) {
            this.getAllCurrencyByFilter();
            this.currency = new Currency();
            if (isPlatformBrowser(this._platformId)) {
              $('#media').modal('hide');
            }
            this.cd.markForCheck()
          } else {
            this.mservice.generateMessage('ERROR', this.currency.name + ' is already in use.', '');
            this.loadService.loadme = false;
          }
        } else {
          this.mservice.generateMessage('ERROR', data.message, '');
          this.loadService.loadme = false;
        }
      });
    }
  }
  getAllCurrencyByFilter() {
    this.loadService.loadme = true;
    this.cservice.getAllcurrency(this.pageIndex, this.pageSize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.currencylist = data.outdatalist[0];
        this.currencycount = data.outdatalist[1][0].currencycount;
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck();
    });
  }
  cancelProcess() {
    this.currency = new Currency();
  }
  editCurrency(currency) {
    this.currency = currency;
  }
  deleteCurrency(currency) {
    currency.isdeleted = true;
    this.cservice.addCurrency(currency).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdata !== -1) {
          this.getAllCurrencyByFilter();
          this.currency = new Currency();
        } else {
          this.mservice.generateMessage('ERROR', this.currency.name + ' is already in use.', '');
          this.loadService.loadme = false;
        }
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  pageChanged(event) {
    this.pageIndex = event;
    this.getAllCurrencyByFilter();
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
