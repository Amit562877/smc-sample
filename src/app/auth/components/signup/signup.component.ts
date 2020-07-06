import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { User } from 'src/app/models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  submitted = false;
  countrylist: any = [];
  usertypelist: any = [];
  user = new User();
  constructor(
    public loadService: LoaderService,
    private mservice: ToastService,
    private aservice: SMCAuthService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.aservice.getCountries().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.countrylist = data.outdatalist[0];
        this.usertypelist = data.outdatalist[1];
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
      }
    });
  }
  makeSignUp(mainForm) {
    if (mainForm.valid) {

      this.submitted = true;
      this.loadService.loadme = true;
      this.user.signuptype = 'web';
      this.user.domainname = window.location.origin;
      this.aservice.signUp(this.user).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.loadService.loadme = false;
          this.cd.markForCheck();
          if (data.outdata === -1) {
            this.mservice.generateMessage('ERROR', 'Email address already taken, please choose another one or make login.', 'Already exists');
          }
          this.submitted = false;
          this.mservice.generateMessage('SUCCESS', data.message, '');
        } else {
          this.loadService.loadme = false;
          this.submitted = false;
          this.mservice.generateMessage('ERROR', data.message, '');
        }
        this.cd.markForCheck();
      });
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
