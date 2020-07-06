import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  prefix: string = environment.NODE_API_URL;
  // prefix:string="http://localhost:8080/"
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getAllLogs(ChangeLogFilter): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/getlogs`, ChangeLogFilter);
  }
  public getLogResponse(logid, changetype): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/getlogdata`, { logid, changetype });
  }
  public editLogStatus(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/changeStatus`, payload);
  }
  public requestForChange(logdata, logid, logtype, uid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/scrapeme`,
      { logdata, logtype, universityid: uid, logid, filename: '', isapp: true });
  }
}
