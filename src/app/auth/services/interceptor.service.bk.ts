import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthdataService } from './authdata.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../shared/services/message/toast.service';
import { LoaderService } from '../../shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SMCAuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authDataService: AuthdataService,
    private aservice: SMCAuthService,
    private router: Router,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authDataService.isAuthenticated()) {
      let token: any = this.authDataService.getToken();
      // if (this.authDataService.isTokeExpired()) {
      //   this.aservice.getNewToken(token.refreshtoken).subscribe(data => {
      //     if (data.flag) {
      //       this.authDataService.setToken(data.outdata);
      //       token = this.authDataService.getToken();
      //     } else {
      //       this.mservice.generateMessage('ERROR', 'Session expired!', 'Timeoute')
      //       this.router.navigate(['/auth/login']);
      //     }
      //   });
      // }
      req = req.clone({
        setHeaders: {
          Authorization: `${token.type} ${token.token}`
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (window) {
          window.console.log = function () { };
        }
        if (err.status === 401) {
          this.loadService.loadme = false;
          if (isPlatformBrowser(this._platformId)) {
            this.authDataService.setToken('');
            this.authDataService.setUserData('');
            this.authDataService.setMenu('');
            this.authDataService.setPermission('');
          }
          if (!req.headers.get('isnotredirect')) {
            this.router.navigate(['/auth/login']);
          }
          return throwError(err);
        }
      })
    );
  }
}
