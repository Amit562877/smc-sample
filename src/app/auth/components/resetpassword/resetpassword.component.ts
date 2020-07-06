import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetpasswordComponent implements OnInit, OnDestroy {
  username = '';
  submitted = false;
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private authService: SMCAuthService,
    private mservice: ToastService,
    private router: Router,
    public loadService: LoaderService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadService.ispanel = false;
  }
  resetPassword(mainform) {
    if (mainform.valid) {
      this.submitted = true;
      this.loadService.loadme = true;
      this.authService.checkUsernameValidity(this.username,window.location.origin).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', 'Please check your email and click on reset password button.', 'Mail sent successfully.');
          this.loadService.loadme = false;
          this.router.navigate(['/auth/login']);
        } else {
          this.submitted = false;
          this.loadService.loadme = false;
          this.mservice.generateMessage('INFO', 'Please enter registered email address', 'Invalid email address');
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
