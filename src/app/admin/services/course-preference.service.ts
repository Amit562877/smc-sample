import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class CoursePreferenceService {
  prefix = environment.API_URL + 'api/Assessmentform/v1/'
  constructor(private httpClient: HttpClient) { }
  public getMappingCourses(projectmapId): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}getPreferenceCourses?projectmapId=${projectmapId}`, {
      headers
    });
  }

  public updateCoursePrefSequence(coursesDetails): Observable<any> {
    let payload = {
      mappingDetails: coursesDetails
    };
    return this.httpClient.post<any>(`${this.prefix}updateCoursePrefSequence`, payload, {
      headers
    });
  }

  public deleteCourcePref(course): Observable<any> {

    return this.httpClient.post<any>(`${this.prefix}deleteCourcePref`, course, {
      headers
    });
  }
  public updatePrefDropdowns(id, selectedvalue, type): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}updateCoursePrefIntake?id=${id}&selectedvalue=${selectedvalue}&type=${type}`, {
      headers
    });
  }
}
