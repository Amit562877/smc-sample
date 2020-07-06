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

export class ManageCoursePreferenceService {

  prefix: string = environment.API_URL + 'api/UniversityOneform/v1/';
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getalluniversity(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getalluniversity`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // getAllUniversityCoursePref
  public getAllUniversityCoursePref(pageIndex, pageSize): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getAllUniversityCoursePrefLimit?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      headers
    });
  }

  public saveUnivCoursePref(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}addUniversityCoursePrefLimit`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public deleteUniversityCoursePref(id): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}deleteUniversityCoursePrefLimit?id=` + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
