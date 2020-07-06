import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WidgetSettingService {

  constructor(private httpClient: HttpClient) { }
  prefix: string = environment.API_URL + 'api/';

  public savewidgetsettings(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/savewidgetsettings`, obj, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }

  public getwidgetdetails(projectid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getwidgetdetails?projectid=${projectid}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }

  public updatewidgetsettings(projectid,type,value): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/updatewidgetsetting?projectid=${projectid}&type=${type}&value=${value}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }

  public updatewidgetothersettings(projectid,type,value): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/updatewidgetothersetting?projectid=${projectid}&type=${type}&value=${value}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }

  public checkurl(url): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/checkurl?url=${url}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }

  public savewhitelabelsettings(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/savewhitelabelsettings`, obj, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }
}
