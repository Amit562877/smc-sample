import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewApplicationsService {
  prefix: string = environment.API_URL
  constructor(
    private httpclient: HttpClient
  ) { }
  getViewApplicationsList(projectid, userid, email): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/docs/secure/v1/getViewApplications?projectid=${projectid}&userid=${userid}&emailid=${email}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
