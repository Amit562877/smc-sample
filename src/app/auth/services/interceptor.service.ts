import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthdataService } from './authdata.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/message/toast.service';
import { LoaderService } from '../../shared/services/message/loader.service';
import { SMCAuthService } from './auth.service';
import { switchMap, take, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authDataService: AuthdataService,
    private aservice: SMCAuthService,
    private router: Router,
    private mservice: ToastService,
    public loadService: LoaderService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let notoken = false;
    try {
      notoken = (req.headers.get('notoken')) ? req.headers.get('notoken') : (req.body && req.body.headers) ? req.body.headers.get('notoken') : false;
    } catch (e) {
      notoken = false;
      // console.log(e);
    }
    if (req.url.indexOf('newticket') !== -1 || req.url.indexOf('restrict') !== -1 || notoken || req.url.indexOf(environment.NODE_API_URL) !== -1) {
      return next.handle(req);
    } else if (this.authDataService.isAuthenticated()) {
      let token: any = this.authDataService.getToken();
      if (this.authDataService.isTokeExpired() && !this.authDataService.isRefreshTokeExpired()) {
        if (!this.refreshTokenInProgress) {
          this.refreshTokenInProgress = true;
          this.refreshTokenSubject.next(null);
          return this.aservice.getNewToken(token.refreshtoken).pipe(
            switchMap((authResponse) => {
              this.authDataService.setToken(authResponse.outdata);
              this.refreshTokenInProgress = false;
              token = this.authDataService.getToken();
              this.refreshTokenSubject.next(token.refreshtoken);
              return next.handle(this.injectToken(req));
            }),
          );
        } else {
          return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap((res) => {
              return next.handle(this.injectToken(req));
            })
          );
        }
      } else if (this.authDataService.isTokeExpired() && this.authDataService.isRefreshTokeExpired()) {
        this.authDataService.setToken('');
        this.authDataService.setUserData('');
        this.authDataService.setMenu('');
        this.authDataService.setPermission('');
        this.mservice.generateMessage('ERROR', 'Session expired!', 'Timeout');
        if (!req.headers.get('isnotredirect')) {
          this.router.navigate(['/auth/login']);
        }
      } else {
        return next.handle(this.injectToken(req));
      }
    }
  }
  injectToken(request: HttpRequest<any>) {
    const token: any = this.authDataService.getToken();
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }
}
