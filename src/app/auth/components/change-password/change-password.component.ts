import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  newpassword = '';
  confirmpassword = '';
  submitted = false;
  userid = '';
  linkExpiredFlag = false;
  constructor(
    private route: ActivatedRoute,
    private authService: SMCAuthService,
    private mservice: ToastService,
    private router: Router,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.loadService.ispanel = false;
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.userid = params.userid.toString();
    });
    this.checkResetLinkValidity();
    this.cd.markForCheck();
  }
  checkResetLinkValidity() {
    this.authService.checkResetLinkValidity(this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdata > 0) {
          this.linkExpiredFlag = false;
          this.cd.markForCheck();
        } else {
          this.linkExpiredFlag = true;
          this.mservice.generateMessage('INFO', 'Please follow the reset password process again.', 'Reset password link expired')
          this.router.navigate(['/auth/password/reset']);
        }
      }
    });
  }
  changePassword() {

    if (this.newpassword === this.confirmpassword) {
      this.loadService.loadme = true;
     this.authService.changePassword(this.encdec.encryptSensitive(this.newpassword.toString()), this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', data.message, '');
          this.cd.markForCheck();
          this.loadService.loadme = false;
          this.router.navigate(['/auth/login']);
        } else {
          this.mservice.generateMessage('ERROR', data.message, '')
        }
      });
    } else {
      this.mservice.generateMessage('INFO', 'Password and confirm password should match', '')
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
