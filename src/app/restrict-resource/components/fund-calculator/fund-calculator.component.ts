import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Component({
  selector: 'app-fund-calculator',
  templateUrl: './fund-calculator.component.html',
  styleUrls: ['./fund-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundCalculatorComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) {

  }
  data: any = {};
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.data = JSON.parse(this.encdec.convertText('dec', params.data, true));
    });


    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
