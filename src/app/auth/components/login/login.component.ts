import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { AssignPermissionService } from 'src/app/shared/services/assign-permission.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  username = '';
  password = '';
  staysignin = false;
  submitted = false;
  autologin = false;
  roleType: any; //'Student';
  showPassFlag = true;
  passwordType = 'password';
  constructor(
    public loadService: LoaderService,
    private mservice: ToastService,
    private aservice: SMCAuthService,
    public adataservice: AuthdataService,
    private router: Router,
    private cookieService: CookieService,
    public assignPermission: AssignPermissionService,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) { }
  returnURL = null;
  ngOnInit() {
    this.loadService.ispanel = false;
    this.loadService.loadme = false;
    this.route.queryParamMap.subscribe(queryParams => {
      this.returnURL = (queryParams.get('returnURL')) ? this.encdec.convertText('dec', queryParams.get('returnURL').toString(), true) : null;
    });

    if (this.adataservice.isAuthenticated() && !this.adataservice.isTokeExpired()) {
      const token: any = this.adataservice.getDecodedToken();
      if ('https://searchmycourse.com' === token.aud) {
        if (this.returnURL) {
          this.router.navigateByUrl(this.returnURL);
        } else {
          this.router.navigate(['/user/workspace']);
        }

      }
    }
    if (isPlatformBrowser(this._platformId)) {
      $(document).ready(function () {
        var owl = $('.owl-carousel');
        owl.owlCarousel({
          loop: true,
          nav: false,
          dots: true,
          navRewind: false,
          autoplay: true,
          items: 1
        })
      })
    }
  }
  makeMeLogin(loginForm) {
    if (loginForm.valid) {
      if (this.adataservice.isAuthenticated() && !this.adataservice.isTokeExpired()) {
        const token: any = this.adataservice.getDecodedToken();
        if ('http://searchmycourse.com' !== token.actort) {
          this.mservice.generateMessage("ERROR", "It seems like you are already logged into SMC please make sure to logout", "Conflict")
        }
      } else {

        this.submitted = true;
        this.aservice.Login(this.username, this.password, 'system').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          this.submitted = false;
          this.cookieService.set('rememberme', this.staysignin.toString());
          this.cookieService.set('username', this.username.toString());
          this.cookieService.set('password', this.password.toString());
          if (data.flag && data.outdata) {
            this.adataservice.setToken(data.outdata);
            if (this.adataservice.isAuthenticated()) {
              this.aservice.getProfile(this.adataservice.getUserId()).pipe(takeUntil(this.componentDestroyed$)).subscribe(userdata => {
                this.adataservice.setUserData(userdata.outdatalist[0]);
                // this.roleType = userdata.outdatalist[0][0].typeofaccount;
                this.submitted = false;

                let agentInfo = {
                  agentLogoURL: environment.agentLogoURL,
                  agentAddress: environment.agentAddress,
                  agentContact: environment.agentContact,
                  agentWebURL: environment.agentWebURL,
                  agentOrganization: environment.agentOrganization,
                  companyemail: environment.cemail,
                  emailpassword: this.encdec.convertTextThirdParty('enc', environment.cp),
                }
                this.adataservice.setAgentInfo(agentInfo);
                this.adataservice.setMenu(userdata.outdatalist[2]);
                this.adataservice.setPermission(userdata.outdatalist[1]);
                this.cd.markForCheck();
                if (this.returnURL) {
                  this.router.navigateByUrl(this.returnURL);
                } else {
                  this.router.navigate(['/user/workspace']);
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
                });
            }
          } else {
            this.mservice.generateMessage('ERROR', 'Invalid username or password.', 'Login failed');
          }
          this.cd.markForCheck();
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
  }
  enterLogin(form, event) {
    if (event.keyCode === 13) {
      this.makeMeLogin(form);
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
