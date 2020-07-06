import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EncDecService } from './enc-dec.service';
import { isNgTemplate } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AssignPermissionService {
  routePermission: []
  constructor(public router: Router,
    private encdec: EncDecService, ) { }
  
  setRoutePermission(permission) {
    this.routePermission = permission;
  }
  setMenu(setmenuitem) {
    localStorage.setItem('menudata', this.encdec.convertText('enc', JSON.stringify(setmenuitem)));
  }
  getMenu() {
    return JSON.parse(this.encdec.convertText('dec', localStorage.getItem('menudata')));
  }
  getRoutePermission() {
    return this.routePermission;
  }
  checkForRoutePermission() {
    return true;
  }
  canActivate(
      route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    console.log(state.url); // HERE YOU CAN GET REQUESTED ROUTE

    if (this.checkForRoutePermission()) {
      return true;
    } else {
      return false;
    }
  }

}
