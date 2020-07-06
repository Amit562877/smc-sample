import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileSetupService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getProfileDetails(userid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/users/v1/getProfileDetails?userid=${userid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public setProfileDetails(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/users/v1/updateuserinfo`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public setProfilePhoto(formdata): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/users/v1/setProfilePhoto`, formdata, {});
  }
  public updateProfilePhoto(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/users/v1/updateProfilePhoto`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
