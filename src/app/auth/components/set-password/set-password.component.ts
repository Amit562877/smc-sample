import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  newpassword = '';
  confirmpassword = '';
  submitted = false;
  userid = '';
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private aservice: SMCAuthService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private router: Router,
    private encdec: EncDecService,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.userid = params.userid.toString();

    });
    this.cd.markForCheck();
  }
  setpassword(mainform) {
    if (mainform.valid) {

      if (this.newpassword == this.confirmpassword) {
        this.aservice.setnewpassword(this.encdec.encryptSensitive(this.newpassword.toString()), this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.mservice.generateMessage('SUCCESS', data.message, '');
            this.cd.markForCheck();
            this.loadService.loadme = false;
            this.router.navigate(['/auth/login']);
          } else {
            this.mservice.generateMessage('ERROR', data.message, '')
          }

        })

      } else {
        this.mservice.generateMessage('ERROR', 'your password not matched,please match the password', '')
      }
    }

  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
