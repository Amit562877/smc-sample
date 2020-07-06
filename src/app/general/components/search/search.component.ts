import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import {
  AuthService,
  GoogleLoginProvider
} from 'angularx-social-login';
import { SecureDocsService } from 'src/app/shared/services/securedocs.service';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { CookieService } from 'ngx-cookie-service';
import { AssessmentFormService } from 'src/app/admin/services/assessment-form.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';

declare const $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  permissionslist: any = [];
  url: any;
  secureurl: any;
  userdata: any = {};
  userdatainfo: any = {};
  linkid: any;
  isrequested = false;
  isexpires = false;
  email: any = '';
  permission = 'View';
  socialtoken: any = '';
  acceptpasscode = false;
  accesscode = '';
  requestforcode = false;
  ihvaepasscode = false;
  submitted = false;
  origin: any;
  username = '';
  password = '';
  staysignin = false;
  private location: Location;
  constructor(
    private encdec: EncDecService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private socialAuthService: AuthService,
    private secureDocsService: SecureDocsService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    private authdataService: AuthdataService,
    private aservice: SMCAuthService,
    private adataservice: AuthdataService,
    private cookieService: CookieService,
    private assessmentFormService: AssessmentFormService,
    public loadService: LoaderService,
  ) { }
  univlist: [];
  sslink = '';
  ngOnInit() {
    this.loadService.loadme = false;
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.url = params.url.toString();
      this.requestforcode = (params.code === 'accesscode') ? true : false;
      this.secureurl = this.url;
      if (this.secureurl === 'url') {
        this.sslink = sessionStorage.getItem('securl')
        this.route.snapshot.fragment.split('&').forEach((el, i) => {
          if (el.indexOf('id_token') !== -1) {
            this.email = jwt_decode(el.split('id_token')[1]).email;
            this.socialtoken = el.split('id_token')[1];
            localStorage.setItem('socialtoken', this.socialtoken);
          }
        });
      } else if (this.secureurl !== 'url' && (!localStorage.getItem('socialtoken') || this.authdataService.isAuthenticated())) {
        this.userdatainfo = (this.authdataService.getUserData() != '' && this.authdataService.getUserData() != null) ? (this.authdataService.getUserData()[0]) : '';
        this.email = this.userdatainfo.email;
      } else if (this.secureurl !== 'url' && localStorage.getItem('socialtoken')) {
        this.email = jwt_decode(localStorage.getItem('socialtoken')).email;
      }
      if (isPlatformBrowser(this._platformId) && this.secureurl !== 'url') {
        sessionStorage.setItem('securl', this.url);
        this.sslink = this.url;
      }
      this.cd.markForCheck();
    });
    this.url = this.encdec.convertText('dec', this.url, true);


    if (isPlatformBrowser(this._platformId) && this.secureurl !== 'url') {
      this.url = this.url.replace(window.location.origin, '');
      sessionStorage.setItem('surl', decodeURIComponent(this.url));
    }
    if (isPlatformBrowser(this._platformId)) {
      this.origin = window.location.origin;
    }
    if (!this.requestforcode && !this.email) {
      if (this.secureurl !== 'url' || this.email.length === 0) {
        $('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });
      } else {
        this.authGoogle();
      }
    } else if (this.email) {
      this.url = sessionStorage.getItem('surl');
      this.checkPermission();
    } else {
      $('#accesscode').modal('show');
    }
  }
  checkPermission() {
    this.secureDocsService.checkPermission((window.location.origin + this.url), this.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.linkid = data.outdatalist[1][0].id;
        let docowner = (data.outdatalist.length > 2) ? data.outdatalist[2][0].emailid : null;
        if (this.linkid > 0) {
          if (docowner !== null && docowner == this.email) {
            const d = this.url.split('/');
            this.assessmentFormService.getuniversitylist(this.encdec.encryptSensitive(this.encdec.decryptSensitiveV1(d[d.length - 1]))).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag) {
                this.univlist = data.outdata.map(e => e.universityidf);
                const pid = d[d.length - 1];
                d.splice(d.length - 1, 1);
                d.push(this.encdec.encryptSensitive(this.univlist.join(',')))
                d.push(pid);
                this.router.navigate([d.join('/')]);
              }
            });
          } else if (data.outdatalist[0].length > 0 && data.outdatalist[0][0].isactive) {
            if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
              if (data.outdatalist[2][0].permission === 'Edit') {
                localStorage.setItem('socialaccess', this.encdec.convertText('enc', data.outdatalist[0][0].permission));
              } else {
                localStorage.setItem('socialaccess', this.encdec.convertText('enc', 'View'));
              }
            }
            const d = this.url.split('/');
            this.assessmentFormService.getuniversitylist(this.encdec.encryptSensitive(this.encdec.decryptSensitiveV1(d[d.length - 1]))).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag) {
                this.univlist = data.outdata.map(e => e.universityidf);
                const pid = d[d.length - 1];
                d.length = d.length - 1;
                d.push(this.encdec.encryptSensitiveV1(this.univlist.join(',')))
                d.push(pid);
                this.router.navigate([d.join('/')]);
              }
            });

          } else if (data.outdatalist[0].length > 0 && !data.outdatalist[0][0].isactive) {
            this.isrequested = true;
          } else {
            if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
              if (data.outdatalist[2][0].permission === 'Edit') {
                this.permissionslist = ['Edit', 'View'];
              } else {
                this.permissionslist = ['View'];
              }
            }
            $('#loginmodelp').modal('show');
          }
        } else {
          this.isexpires = true;
        }
      } else {
        this.mservice.generateMessage('ERROR', 'Can\'t find link', '');
      }
      this.cd.markForCheck();

    });
  }
  authGoogle() {
    if (this.secureurl !== 'url' || this.email.length === 0) {
      let socialPlatformProvider;
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData: any) => {
          if (userData) {
            this.userdata = userData;
            this.secureDocsService.checkPermission((window.location.origin + this.url), userData.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag) {
                this.linkid = data.outdatalist[1][0].id;
                if (this.linkid > 0) {
                  if (data.outdatalist[0].length > 0 && data.outdatalist[0][0].isactive) {
                    if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                      if (data.outdatalist[2][0].permission === 'Edit') {
                        localStorage.setItem('socialaccess', this.encdec.convertText('enc', data.outdatalist[0][0].permission));
                      } else {
                        localStorage.setItem('socialaccess', this.encdec.convertText('enc', 'View'));
                      }
                    }

                    const d = this.url.split('/');
                    this.assessmentFormService.getuniversitylist(this.encdec.encryptSensitive(this.encdec.decryptSensitiveV1(d[d.length - 1]))).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                      if (data.flag) {
                        this.univlist = data.outdata.map(e => e.universityidf);
                        const pid = d[d.length - 1];
                        d.length = d.length - 1;
                        d.push(this.encdec.encryptSensitive(this.univlist.join(',')))
                        d.push(pid);
                        this.router.navigate([d.join('/')]);
                      }
                    });

                  } else if (data.outdatalist[0].length > 0 && !data.outdatalist[0][0].isactive) {
                    this.isrequested = true;
                  } else {
                    if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                      if (data.outdatalist[2][0].permission === 'Edit') {
                        this.permissionslist = ['Edit', 'View'];
                      } else {
                        this.permissionslist = ['View'];
                      }
                    }
                    $('#loginmodelp').modal('show');
                  }
                } else {
                  this.isexpires = true;
                }
              }
              this.cd.markForCheck();

            });
          }
        }).catch(e => {
          console.log(e);
        });
    } else {
      this.url = sessionStorage.getItem('surl');
      this.secureurl = sessionStorage.getItem('securl');
      this.secureDocsService.checkPermission((window.location.origin + this.url), this.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.linkid = data.outdatalist[1][0].id;
          this.acceptpasscode = data.outdatalist[1][0].acceptpasscode;
          if (this.linkid > 0) {
            if (data.outdatalist[0].length > 0 && data.outdatalist[0][0].isactive) {
              const d = this.url.split('/');
              this.assessmentFormService.getuniversitylist(this.encdec.encryptSensitive(this.encdec.decryptSensitiveV1(d[d.length - 1]))).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                if (data.flag) {
                  this.univlist = data.outdata.map(e => e.universityidf);
                  const pid = d[d.length - 1];
                  d.length = d.length - 1;
                  d.push(this.encdec.encryptSensitive(this.univlist.join(',')))
                  d.push(pid);
                  this.router.navigate([d.join('/')]);
                }
              });

            } else if (data.outdatalist[0].length > 0 && !data.outdatalist[0][0].isactive) {
              this.isrequested = true;
            } else {
              if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                if (data.outdatalist[2][0].permission === 'Edit') {
                  this.permissionslist = ['Edit', 'View'];
                } else {
                  this.permissionslist = ['View'];
                }
              }
              $('#loginmodelp').modal('show');
            }
          } else {
            this.isexpires = true;
          }
        }
        this.cd.markForCheck();
      });
    }
  }
  forward(option) {
    if (option === 'G') {
      $('#loginoptions').modal('hide');
      $('.modal-backdrop').remove();
      this.authGoogle();
    } else {
      $('#loginoptions').modal('hide');
      $('.modal-backdrop').remove();
      this.router.navigate(['/auth/login']);
    }
  }
  goForAccesscode() {
    this.router.navigate(['/program/search/accesscode/' + this.encdec.convertText('enc', (window.location.origin + encodeURIComponent(sessionStorage.getItem('surl'))))]);
  }
  addShareLinkUser() {
    const secureuser: any = {};
    secureuser.linkid = this.linkid;
    secureuser.emailid = this.email;
    secureuser.permission = this.permission;
    secureuser.createdby = 0;
    secureuser.isactive = 0;
    secureuser.isdeleted = 0;
    secureuser.requesttype = 'gmail';
    this.secureDocsService.addSecureLinkUsers(secureuser).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        $('#loginmodelp').modal('hide');
        this.isrequested = true;
      }
      this.cd.markForCheck();
    });
  }
  checkPasscode() {
    this.cd.markForCheck();
    this.secureDocsService.checkPermissionPasscode((window.location.origin + sessionStorage.getItem('surl')), this.accesscode, this.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0].length > 0) {
        localStorage.setItem('passcode', this.accesscode);
        $('#accesscode').modal('hide');
        $('.modal-backdrop').remove();
        const d = sessionStorage.getItem('surl').split('/');
        this.assessmentFormService.getuniversitylist(this.encdec.encryptSensitive(this.encdec.decryptSensitiveV1(d[d.length - 1]))).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.univlist = data.outdata.map(e => e.universityidf);
            const pid = d[d.length - 1];
            d.length = d.length - 1;
            d.push(this.encdec.encryptSensitive(this.univlist.join(',')))
            d.push(pid);
            this.router.navigate([d.join('/')]);
          }
        });

      } else {
        this.mservice.generateMessage('ERROR', 'Failed to verify accesscode, this url may not support accesscode or you have incorrect accesscode.', 'Verification fail.');
      }
      this.cd.markForCheck();
    });
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
              $('#loginmodelp').modal('hide');
              $('.modal-backdrop').remove();
              this.cd.markForCheck();
              const d = sessionStorage.getItem('surl').split('/');
              this.assessmentFormService.getuniversitylist(this.encdec.encryptSensitive(this.encdec.decryptSensitiveV1(d[d.length - 1]))).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                if (data.flag) {
                  this.univlist = data.outdata.map(e => e.universityidf);
                  const pid = d[d.length - 1];
                  d.length = d.length - 1;
                  d.push(this.encdec.encryptSensitive(this.univlist.join(',')))
                  d.push(pid);
                  this.router.navigate([d.join('/')]);
                }
              });
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
    $('#loginmodelp').modal('hide');
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
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
