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

export class UsercommentService {
  prefix = environment.API_URL;
  constructor(private httpclient: HttpClient) { }
  public submitComment(jsonPayload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/saveComment`, jsonPayload, {
      headers
    });
  }
}
