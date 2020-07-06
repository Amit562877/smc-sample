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

export class UniversityDetailService {
  prefix = environment.API_URL;
  constructor(private httpclient: HttpClient) { }
  public getUnivDetailsById(universityid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/australia/university/v1/getUniversityById?uid=${universityid}`, {
      headers
    });
  }
  public getUniversity(universitymodel): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}university/au/v1/getuniversity`, universitymodel, {
      headers
    });
  }
  public addtofavourite(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/favourites/v1/saveforfavorite`, payload, {
      headers
    });
  }
}
