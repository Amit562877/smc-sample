import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthdataService } from '../authdata.service';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Injectable({
  providedIn: 'root'
})
export class CustomAuthGuardService implements CanActivate {


  constructor(private _authService: AuthdataService, private _router: Router, private encdec: EncDecService) {
  }
  menudata: any;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let auth = false;
    if (this._authService.isAuthenticated() && !this._authService.isTokeExpired()) {
      switch (next.routeConfig.path) {
        case 'workspace': {
          auth = (this._authService.isAuthenticated() && !this._authService.isTokeExpired()) ? true : false;
          break;
        }
        case 'course-criteria-manage': {
          const permissions: any = this._authService.getPermission('Criteria');
          auth = permissions.canAdd;
          break;
        }
        case 'course-criteria-manage/:criteriaid': {
          const permissions: any = this._authService.getPermission('Criteria');
          auth = permissions.canEdit;
          break;
        }
        case 'course-issue/edit-course-issue/:courseid': {
          const permissions: any = this._authService.getPermission('Course Issue');
          auth = permissions.canEdit;
          break;
        }
        case 'university-issue/edituniversityissue/:universityid': {
          const permissions: any = this._authService.getPermission('University Issue');
          auth = permissions.canEdit;
          break;
        }
        case 'role-pemission/:roleid': {
          const permissions: any = this._authService.getPermission('Manage Role');
          auth = permissions.canMap;
          break;
        }
      }
      return auth;
    } else {
      this._router.navigateByUrl('/auth/login?returnURL=' + this.encdec.convertText('enc', String(state.url), true));
    }
    this._router.navigateByUrl('/auth/login?returnURL=' + this.encdec.convertText('enc', String(state.url), true));
    return false;
  }
}