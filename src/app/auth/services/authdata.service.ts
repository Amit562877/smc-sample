import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EncDecService } from '../../shared/services/enc-dec.service';
import { Permissions } from 'src/app/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Router } from '@angular/router';
import { SMCAuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthdataService {
  userdata: any;
  tmpdata: any;
  helper = new JwtHelperService();
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private encdec: EncDecService,
    private aservice: SMCAuthService,
    private mservice: ToastService,
    private router: Router,
  ) { }
  public setMenu(menu) {
    if (menu) {
      // localStorage.setItem('mdatasmc', this.encdec.convertText('enc', JSON.stringify(menu)));
      localStorage.setItem('mdatasmc', menu);
    } else {
      localStorage.removeItem('mdatasmc');
    }
  }
  public getMenu() {
    const menu = (localStorage.getItem('mdatasmc')) ? JSON.parse(this.encdec.convertText('dec', localStorage.getItem('mdatasmc'))) : [];
    return menu.filter(m => m.canbind === true);
  }
  public setPermission(permission) {
    if (permission) {
      localStorage.setItem('pdatasmc', permission);
      // localStorage.setItem('pdatasmc', JSON.stringify(pdata));
    } else {
      localStorage.removeItem('pdatasmc');
    }
  }
  public getPermission(menuname) {
    const permissiondata = new Permissions();
    let permissions = (localStorage.getItem('pdatasmc')) ? JSON.parse(this.encdec.convertText('dec', localStorage.getItem('pdatasmc'))) : null;
    if (permissions) {
      const pdata = permissions.filter(p => p.menu === menuname)
      pdata.forEach(element => {
        switch (element.permission.toLowerCase()) {
          case 'view': {
            permissiondata.canView = true;
            break;
          }
          case 'create': {
            permissiondata.canAdd = true;
            break;
          }
          case 'update': {
            permissiondata.canEdit = true;
            break;
          }
          case 'delete': {
            permissiondata.canDelete = true;
            break;
          }
          case 'map': {
            permissiondata.canMap = true;
            break;
          }
          case 'import': {
            permissiondata.canImport = true;
            break;
          }
          case 'export': {
            permissiondata.canExport = true;
            break;
          }
          case 'approve': {
            permissiondata.canApprove = true;
            break;
          }
          case 'reject': {
            permissiondata.canReject = true;
            break;
          }
          case 'share': {
            permissiondata.canShare = true;
            break;
          }
        }
      });
    }
    return permissiondata;
  }

  public getToken(): string {
    if (isPlatformBrowser(this._platformId)) {
      try {
        if (localStorage.getItem('smctoken') !== null && localStorage.getItem('smctoken') !== '') {

          return JSON.parse(this.encdec.convertText('dec', localStorage.getItem('smctoken')));
        } else {
          return null;
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }

  public setToken(token) {
    if (isPlatformBrowser(this._platformId)) {
      if (token) {
        localStorage.setItem('smctoken', this.encdec.convertText('enc', JSON.stringify(token)));
      } else {
        localStorage.removeItem('smctoken');
      }

    }
  }
  public setAgentInfo(info) {
    if (isPlatformBrowser(this._platformId)) {
      if (info) {
        sessionStorage.setItem('agentinfosmc', this.encdec.convertText('enc', JSON.stringify(info)));
      } else {
        sessionStorage.removeItem('agentinfosmc');
      }

    }
  }
  public getAgentInfo() {
    if (isPlatformBrowser(this._platformId)) {
      if (sessionStorage.getItem('agentinfosmc')) {
        return JSON.parse(this.encdec.convertText('dec', sessionStorage.getItem('agentinfosmc')));
      } else {
        return null;
      }

    }
  }
  public isAuthenticated(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.decodeToken(token.token);
        } catch (Error) {
          return false;
        }
      }
      return false;
    }
  }
  public getDecodedToken(): any {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.decodeToken(token.token);
        } catch (Error) {
          return false;
        }
      }
      return false;
    }
  }
  public isTokeExpired(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.isTokenExpired(token.token);
        } catch (Error) {
          return true;
        }
      }
      return true;
    }
  }
  public isRefreshTokeExpired(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.isTokenExpired(token.refreshtoken);
        } catch (Error) {
          return true;
        }
      }
      return true;
    }
  }
  public getUserId(): any {
    const token: any = this.getToken();
    if (token && token !== null) {
      return this.helper.decodeToken(token.token).nameid;
    }
    return 0;
  }
  public getUserData(): any {
    if (isPlatformBrowser(this._platformId)) {
      const tmpdata = localStorage.getItem('userdata');
      if (tmpdata === '' || tmpdata == null) {
        this.userdata = '';
      } else {
        this.userdata = JSON.parse(this.encdec.convertText('dec', localStorage.getItem('userdata')));
      }
      return this.userdata;
    }
  }
  public setUserData(data): void {
    if (isPlatformBrowser(this._platformId)) {
      if (data) {
        // localStorage.setItem('userdata', this.encdec.convertText('enc', JSON.stringify(data)));
        localStorage.setItem('userdata', data);
      } else {
        localStorage.removeItem('userdata');
      }
    }
  }
  public getNewTicket(rtoken) {
    this.aservice.getNewToken(rtoken).subscribe(data => {
      if (data.flag) {
        this.setToken(data.outdata);
        return this.getToken();
      } else {
        this.setToken('');
        this.setUserData('');
        this.setMenu('');
        this.setPermission('');
        this.mservice.generateMessage('ERROR', 'Session expired!', 'Timeout');
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
