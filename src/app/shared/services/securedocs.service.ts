import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class SecureDocsService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }


  public addSecureLink(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/addSecureLink`, payload, {
      headers
    });
  }

  public manageSecureLinkUsers(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/manageSecureLinkUsers`, payload, {
      headers
    });
  }
  public addSecureLinkUsers(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/addSecureLinkUsers`, payload, {
      headers
    });
  }
  public removeSecureLinkUsers(id, isdeleted, actionby, permission): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/removeSecureLinkUsers?id=${id}&isdeleted=${isdeleted}&actionby=${actionby}&permission=${permission}`, {
      headers
    });
  }
  public checkPermission(olink, emailid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/checkPermission?olink=${olink}&emailid=${emailid}`, {
      headers
    });
  }
  public checkPermissionPasscode(id, passcode, email): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/checkPermissionpasscode?id=${id}&passcode=${passcode}&email=${email}`, {
      headers
    });
  }
  public getRequests(id, owner): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/docs/secure/v1/getRequests?id=${id}&owner=${owner}`, {
      headers
    });
  }
  public setPermission(olink, emailid, actionby): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/setPermission?id=${olink}&emailid=${emailid}&actionby=${actionby}`, {
      headers
    });
  }

  public editSecurelinkaccess(id, canshare, acceptpasscode, codepermission, updatedby, email): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/editSecurelinkaccess?id=${id}&canshare=${canshare}&acceptpasscode=${acceptpasscode}&codepermission=${codepermission}&updatedby=${updatedby}&actionby=${email}`, {
      headers
    });
  }

  public getSecureNotes(id, quesid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/docs/secure/v1/getSecurenotes?id=${id}&quesid=${quesid}`, {
      headers
    });
  }
  public getSecureListHistory(id, emailuser): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/docs/secure/v1/getSecureLinkHistory?id=${id}&email=${emailuser}`, {
      headers
    });
  }
  public removedocowner(id, email, owner): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/docs/secure/v1/removedocowner?id=${id}&email=${email}&owner=${owner}`, {
      headers
    });
  }
  public manageSecureNotes(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/docs/secure/v1/managesecurenotes`, payload, {
      headers
    });
  }
}
