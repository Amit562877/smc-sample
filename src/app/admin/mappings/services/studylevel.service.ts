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

  public getStudyLevel(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courses/studylevel/v1/getStudyLevel`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getSubLevel(pageSize, showme): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courses/studylevel/v1/getSubLevel?pageSize=${pageSize}&showme=${showme}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addStudyLevel(name: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/studylevel/v1/addStudyLevel?name=${name}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addStudyLevelMapping(studylevelmappings): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/studylevel/v1/addStudyLevelMapping`, studylevelmappings, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
