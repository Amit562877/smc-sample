import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdvancedfilterService {

  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public saveAdvanceFilter(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/saveAdvanceFilter`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getFilterData(userid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getAdvanceFilter?userid=${userid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getCourseCount(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/getAdvancedFilterCourseCount`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
