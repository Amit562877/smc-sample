import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';

import { McurrencyService } from '../../services/mcurrency.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

@Component({
  selector: 'app-map-currency',
  templateUrl: './map-currency.component.html',
  styleUrls: ['./map-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapCurrencyComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private cservice: McurrencyService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService
  ) { }
  currencylist: any = [];
  countrylist: any = [];
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Country');
    this.getAllCountryCurrency();
  }
  getAllCountryCurrency() {
    this.loadService.loadme = true;
    this.cservice.getCountryCurrency().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.currencylist = data.outdatalist[0];
        this.countrylist = data.outdatalist[1];
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  saveCountry() {
    this.loadService.loadme = true;
    this.cservice.manageCountry(this.countrylist).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
        this.loadService.loadme = false;
      }
      this.cd.markForCheck()
    });
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
