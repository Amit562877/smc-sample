import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class ReviewFormService {

  prefix = environment.API_URL + 'api/ReviewForm/v1/';
  suffix: string;
  constructor(private httpClient: HttpClient) { }
  public getreviewFormData(aid, uid) {
    return this.httpClient.post<any>(`${this.prefix}GetReviewFormData?aid=${aid}&uid=${uid}`, {
      headers
    });
  }
  public getUniversityDetails(univIds): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}getReviewFormUnivDetails?universityid=${univIds}`, {
      headers
    });
  }

  public getUniversitystudylevelDetails(aid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}getReviewFormUnivDetailsStudylevel?aid=${aid}`, {
      headers
    });
  }
}
