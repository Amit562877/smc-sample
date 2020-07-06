import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getRoles(pageIndex, pageSize, searchText, userid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/role/getrole?pageindex=${pageIndex}&pagesize=${pageSize}&searchtext=${searchText}&userid=${userid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public manageRole(role): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/role/managerole`, role, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getPermission(pageIndex, pageSize, searchText): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/role/getpermissions?pageindex=${pageIndex}&pagesize=${pageSize}&searchtext=${searchText}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public manageMenu(menu): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/role/manageMenu`, menu, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getMenuList(pageIndex, pageSize, searchText): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/role/getmenulist?pageindex=${pageIndex}&pagesize=${pageSize}&searchtext=${searchText}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public managePermission(pemission): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/role/managepermission`, pemission, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getRolePermission(roleid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/role/getrolepermission?roleid=${roleid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addRolePermission(rolepermission): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/role/addrolepermission`, rolepermission, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getAdvancePermission(userid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/role/getadvancepermission?userid=${userid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addAdvancePermission(advancepermission): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/role/addadvancepermission`, advancepermission, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getMenupermissionList(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/role/getmenupermission`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addMenuPermission(menupermission): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/role/addmenupermission`, menupermission, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
