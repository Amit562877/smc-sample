import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private httpClient: HttpClient) { }
  prefix: string = environment.API_URL + 'api/lead/';
  
  public getleadList(projectid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getlead?projectid=${projectid}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }

  public getCourseDetails(courseid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getcoursedetails?courseid=${courseid}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }
}
