import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthdataService } from '../authdata.service';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private _authService: AuthdataService, private _router: Router, private encdec: EncDecService) {
  }
  menudata: any;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated() && !this._authService.isTokeExpired()) {
      this.menudata = this._authService.getMenu();
      return (this.menudata.filter(el => el.path === state.url).length > 0) ? true : false;
    } else {
      this._router.navigateByUrl('/auth/login?returnURL=' + this.encdec.convertText('enc', String(state.url), true));
    }
    this._router.navigateByUrl('/auth/login?returnURL=' + this.encdec.convertText('enc', String(state.url), true));
    return false;
  }

}