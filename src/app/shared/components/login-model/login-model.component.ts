import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { ToastService } from '../../services/message/toast.service';
import { Router } from '@angular/router';

declare const $: any;
@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModelComponent implements OnInit {
  @Output() success = new EventEmitter();
  componentDestroyed$: Subject<boolean> = new Subject();
  username = '';
  password = '';
  staysignin = false;
  submitted = false;
  constructor(
    private aservice: SMCAuthService,
    private cookieService: CookieService,
    private adataservice: AuthdataService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  makeMeLogin(loginForm) {
    if (loginForm.valid) {
      this.submitted = true;
      this.aservice.Loginpopup(this.username, this.password).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag && data.outdata) {
          this.cookieService.set('rememberme', this.staysignin.toString());
          this.cookieService.set('username', this.username.toString());
          this.cookieService.set('password', this.password.toString());
          this.adataservice.setToken(data.outdata);
          if (this.adataservice.isAuthenticated()) {
            this.aservice.getProfile(this.adataservice.getUserId()).pipe(takeUntil(this.componentDestroyed$)).subscribe(userdata => {
              this.adataservice.setUserData(userdata.outdatalist[0]);
              this.submitted = false;
              this.adataservice.setMenu(userdata.outdatalist[2]);
              this.adataservice.setPermission(userdata.outdatalist[1]);
              this.success.emit();
              // $('#modeldocumentuploadlist').modal('hide');
              // $('.modal-backdrop').remove();
              // this.cd.markForCheck();
              // this.router.navigate([sessionStorage.getItem('surl')]);
            },
              err => {
                if (err.status === 401) {
                  this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
                } else if (err.status === 400) {
                  this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
                } else {
                  this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
                }
                this.submitted = false;
                this.cd.markForCheck();
              });
          }
          this.submitted = false;
          this.cd.markForCheck();
        } else {
          this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          this.submitted = false;
          this.cd.markForCheck();
        }
      },
        err => {
          if (err.status === 401) {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          } else if (err.status === 400) {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          } else {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          }
          this.submitted = false;
          this.cd.markForCheck();
        });
    }
  }
  redirect(type) {
    $('#modeldocumentuploadlist').modal('hide');
    $('.modal-backdrop').remove();
    switch (type) {
      case 'signup': {
        this.router.navigate(['/auth/signup']);
        break;
      }
      case 'reset': {
        this.router.navigate(['/auth/password/reset']);
        break;
      }
    }

  }
  forward(option) {
    if (option === 'G') {
      $('#loginoptions').modal('hide');
      $('.modal-backdrop').remove();
      // this.authGoogle();
    } else {
      $('#loginoptions').modal('hide');
      $('.modal-backdrop').remove();
      this.router.navigate(['/auth/login']);
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
