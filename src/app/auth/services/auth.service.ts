import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class SMCAuthService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public Login(username, password, requesttype): Observable<any> {

    const body = {
      grant_type: 'password',
      username,
      password,
      requesttype
    };
    // const body = new HttpParams()
    //   .set('grant_type', 'password')
    //   .set('username', username)
    //   .set('password', password)
    //   .set('requesttype', requesttype);
    return this.httpclient.post<any>(`${this.prefix}api/aouth2/signin`, body, {
      headers
    });
  }
  public LoginThirdparty(username, apikey, userid, referrerurl): Observable<any> {

    const body = {
      grant_type: 'api_key',
      username,
      userid,
      apikey,
      referrerurl
    };
    return this.httpclient.post<any>(`${this.prefix}api/aouth2/kondesksignin`, body, {
      headers
    });
  }
  public LoginDocument(username, doclink, requesttype): Observable<any> {

    const body = {
      grant_type: 'password',
      username,
      doclink,
      requesttype
    };

    // const body = new HttpParams()
    //   .set('grant_type', 'password')
    //   .set('username', username)
    //   .set('doclink', doclink)
    //   .set('requesttype', requesttype);
    return this.httpclient.post<any>(`${this.prefix}api/aouth2/signin`, body, {
      headers
    });
  }
  public Loginpopup(username, password): Observable<any> {

    const body = {
      grant_type: 'password',
      username,
      password,
      requesttype: 'system'
    };

    // const body = new HttpParams()
    //   .set('grant_type', 'password')
    //   .set('username', username)
    //   .set('password', password)
    //   .set('requesttype', 'system');
    return this.httpclient.post<any>(`${this.prefix}api/aouth2/signin`, body, {
      headers
    });
  }
  public getNewToken(refreshToken): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/aouth2/newticket?refreshtoken=${refreshToken}`, {
      headers
    });
  }

  public getProfile(userid): Observable<any> {
    let headers1 = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpclient.get<any>(`${this.prefix}api/users/v1/getProfile?userid=${userid}`, {
      headers: headers1
    });
  }

  public getCountries(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/users/v1/getcountry`, {
      headers
    });
  }
  public signUp(user): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/users/v1/signup`, user, {
      headers
    });
  }
  public checkUsernameValidity(username,domainname): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/users/v1/checkUsernameValidity?username=${username}&domainname=${domainname}`, {
      headers
    });
  }
  public sendResetPasswordMail(resetpasswordJson): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/users/v1/sendResetPasswordMail`, resetpasswordJson, {
      headers
    });
  }
  public changePassword(newpassword, userid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/users/v1/changePassword?newpassword=${newpassword}&userid=${userid}`, {
      headers
    });
  }
  public setnewpassword(newpassword, userid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/users/v1/setnewpassword?newpassword=${newpassword}&userid=${userid}`, {
      headers
    });
  }
  // checkResetLinkValidity
  public checkResetLinkValidity(userid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/users/v1/checkResetLinkValidity?userid=${userid}`, {
      headers
    });
  }
}
