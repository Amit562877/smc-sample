import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class StudylevelService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getAllStudyLevel(pageindex, pagesize): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courses/studylevel/v1/getStudyLevel?pageindex=${pageindex}&pagesize=${pagesize}`);
  }
  public addStudyLevel(studylevel): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/studylevel/v1/manageStudyLevel`, studylevel, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
